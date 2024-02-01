// @ts-nocheck
import React, { useState } from "react"
import { TransitionMotion, spring } from "react-motion"
import { throttleFnByCount } from "./../common/index"
const leavingSpringConfig = { stiffness: 30, damping: 10 }
const RIPPLE_OFFSET = 0
const throttleRipple = throttleFnByCount(45)

export const RippleDiv: React.FC = (props = {}) => {
  const [state, setState] = useState({ mouse: [], now: "t" + 0 })

  const setMouseMove = (e) => {
    // Make sure the state is queued and not batched.
    const { target, clientX, clientY } = e
    if (!target) return
    var { left, top } = target.getBoundingClientRect()
    var x = clientX - left //x position within the element.
    var y = clientY - top //y position within the element.

    setState({
      mouse: [x - RIPPLE_OFFSET, y - RIPPLE_OFFSET],
      now: "t" + Date.now(),
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    const { target, clientX, clientY } = e
    throttleRipple(()=>setMouseMove({ target, clientX, clientY }))
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    handleMouseMove(e.touches[0])
  }

  const willLeave = (styleCell) => {
    return {
      ...styleCell.style,
      opacity: spring(0, leavingSpringConfig),
      scale: spring(3, leavingSpringConfig),
    }
  }

  const {
    mouse: [mouseX, mouseY],
    now,
  } = state
  const styles =
    mouseX == null
      ? []
      : [
          {
            key: now,
            style: {
              opacity: spring(1),
              scale: spring(0.001),
              x: spring(mouseX),
              y: spring(mouseY),
            },
          },
        ]

  return (
    <TransitionMotion willLeave={willLeave} styles={styles}>
      {(circles) => (
        <div
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="ripple-div"
        >
          {props.children}
          {circles.map(({ key, style: { opacity, scale, x, y } }) => {
            // console.log({ x, y, opacity, scale, key })
            return (
              <div
                key={key}
                className="ripple-div-ball"
                style={{
                  opacity: opacity,
                  scale: scale,
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                  WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                }}
              />
            )
          })}
        </div>
      )}
    </TransitionMotion>
  )
}
interface PropsEffectsWrapperRipple {
  [key: string]: any
}
export const EffectsWrapperRipple: React.FC<PropsEffectsWrapperRipple> = (props = {}) => (
  <div className="relative">
    <RippleDiv>{props.children}</RippleDiv>
  </div>
)
