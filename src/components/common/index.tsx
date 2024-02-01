import React, { useEffect } from "react"
import {
  FlickingEvent,
  SelectEvent,
  ChangeEvent,
  NeedPanelEvent,
  MOVE_TYPE,
} from "@egjs/flicking"
import Flicking from "@egjs/react-flicking"

export interface PropsSectionHeading {
  title: string
  subtitle?: string
}

export interface PropsLanguage {
  name: string
  hasNoBackground?: boolean
  src?: string
  extension?: string
}

export const myLanguages: Array<PropsLanguage> = [
  { name: "HTML", hasNoBackground: true },
  { name: "CSS", hasNoBackground: true },
  { name: "BOOTSTRAP", hasNoBackground: true },

  { name: "JAVASCRIPT", hasNoBackground: true },
  { name: "TYPESCRIPT" },
  { name: "ANGULAR", hasNoBackground: true },
  { name: "NODE.JS" },
  { name: "REACT" },
  { name: "REACT-NATIVE" },
  { name: "NEXTJS", extension: "svg" },

  { name: "PHP" },
  { name: "SILEX" },
  { name: "WORDPRESS", hasNoBackground: true },
  { name: "MAGENTO" },

  { name: "JAVA" },
  { name: "ASP.NET" },
  { name: "PYTHON" },
  { name: "GO" },
  { name: "ELIXIR" },

  { name: "SQL", hasNoBackground: true },
  { name: "MYSQL", hasNoBackground: true },
  { name: "POSTGRESQL", hasNoBackground: true },
]

export const CarouselLanguageItem: React.FC<PropsLanguage> = ({
  name,
  hasNoBackground,
  src,
}) => {
  return (
    <div className="carousel-item-container">
      <h3>{name}</h3>

      <div className="carousel-item">
        {src && (
          <img
            loading="lazy"
            className={`${hasNoBackground ? "" : "round-img"}`}
            src={src}
            alt={name}
          />
        )}
      </div>
    </div>
  )
}

const FLICK_DURATION = 2000
const FLICK_TIMER_ON_MOVE = 2000

type AdjustStyleType =
  | "adjustStyle1by1"
  | "adjustSyleAllAtOnce"
  | "adjustSyleEachSelf"
const SELECTED_ADJUST_STYLE = "adjustSyleAllAtOnce"
let adjustStyleCascadeTimer: NodeJS.Timeout | null = null
let adjustStyleCooldownTimer: NodeJS.Timeout | null = null

export const throttleFnByCount = 
( limit = 10 ) => 
{
    let count = 0

    return ( fn = () => {} ) => {

      if(count>limit){
        count=0
        fn()
      } 
      else{count++}
  }
}

const adjustStyle = (type: AdjustStyleType, e: FlickingEvent) => {
  switch (type) {
    case "adjustStyle1by1":
      adjustStyle1by1(e)
      break

    case "adjustSyleEachSelf":
      adjustSyleEachSelf(e)
      break

    default:
      adjustSyleAllAtOnce(e)
      break
  }
}

// Needs cascade to be optimal
// BUG - does not activate index 0
const adjustStyle1by1 = (e: FlickingEvent) => {
  const flicking = e.currentTarget

  const currentPanel = flicking.getCurrentPanel()

  if (currentPanel) {
    const panelsCount = flicking.getAllPanels(false).length
    const activeIndex = (currentPanel.getIndex() + 1) % panelsCount
    const deactiveIndex = currentPanel.getIndex()
    // console.log({ panelsCount, activeIndex, deactiveIndex })

    const activePanel = flicking.getPanel(activeIndex)
    const deactivePanel = flicking.getPanel(deactiveIndex)

    if (activePanel) {
      activePanel
        .getElement()
        .getElementsByClassName("carousel-item")[0]
        .setAttribute("class", "carousel-item shadow-light")
    }

    if (deactivePanel)
      deactivePanel
        .getElement()
        .getElementsByClassName("carousel-item")[0]
        .setAttribute("class", "carousel-item shadow-dark")
  }
}

// Needs cascade to be optimal
const adjustSyleAllAtOnce = (e: FlickingEvent) => {
  const flicking = e.currentTarget
  const arrayCountWithoutDuplicates = flicking.getAllPanels().length

  // array traversal with duplicates
  flicking.getAllPanels(true).forEach((panel) => {
    const progress = parseInt(`${panel.getProgress()}`)
    const positionMiddleIfApproachFromBack = 1 - arrayCountWithoutDuplicates // Eg. -17; if array length = 18
    const positionMiddleIfApproachFromFront = 1 // Eg. 1
    const inMiddle =
      progress === positionMiddleIfApproachFromBack ||
      progress === positionMiddleIfApproachFromFront

    if (inMiddle) {
      // console.log({
      //   name: panel.getElement().getElementsByTagName("h3")[0].innerText,
      // })

      panel
        .getElement()
        .getElementsByClassName("carousel-item")[0]
        .setAttribute("class", "carousel-item shadow-light")
    } else
      panel
        .getElement()
        .getElementsByClassName("carousel-item")[0]
        .setAttribute("class", "carousel-item shadow-dark")
  })
}

// Should not use cascade
// BUG - does not always deactivate item and does not activate index 0 properly
const adjustSyleEachSelf = (e: FlickingEvent) => {
  const flicking = e.currentTarget
  let panel = flicking.getCurrentPanel()
  if (!panel) return
  const inMiddle = parseInt(`${panel.getProgress()}`) === 0
  const activeIndex = (panel.getIndex() + 1) % flicking.getAllPanels().length
  const activePanel = flicking.getPanel(activeIndex)

  if (inMiddle && activePanel)
    activePanel
      .getElement()
      .getElementsByClassName("carousel-item")[0]
      .setAttribute("class", "carousel-item shadow-light")
  else
    panel
      .getElement()
      .getElementsByClassName("carousel-item")[0]
      .setAttribute("class", "carousel-item shadow-dark")
}

export const clearCascadeTimer = () => {
  if (adjustStyleCascadeTimer !== null) clearTimeout(adjustStyleCascadeTimer)
  adjustStyleCascadeTimer = null
}

export const clearCooldownTimer = () => {
  if (adjustStyleCooldownTimer !== null) clearTimeout(adjustStyleCooldownTimer)
  adjustStyleCooldownTimer = null
}

// TESTED
export const runCascadeFunction = (
  functionToDo = () => {},
  duration = 600,
  runWithCascade = true
) => {
  if (!runWithCascade) return functionToDo()
  clearCascadeTimer()

  const cascade = () => {
    functionToDo()
    clearCascadeTimer()
  }

  adjustStyleCascadeTimer = setTimeout(cascade, duration)
}

// TESTED
export const runCooldownFunction = (
  functionToDo = () => {},
  duration = 600,
  runWithCooldown = true
) => {
  if (!runWithCooldown) return functionToDo()

  if (adjustStyleCooldownTimer) return
  clearCooldownTimer()

  const cooldown = () => {
    functionToDo()
    clearCooldownTimer()
  }

  adjustStyleCooldownTimer = setTimeout(cooldown, duration)
}

export const onMoveAdjustStyles =
  (progressBar: React.RefObject<HTMLDivElement>) => (e: FlickingEvent) => {
    runCascadeFunction(() => {
      progressBar.current?.setAttribute("style", `width: ${e.progress * 100}%`)
      adjustStyle(SELECTED_ADJUST_STYLE, e)
    }, FLICK_TIMER_ON_MOVE)
  }

export const Carousel: React.FC<{
  children: React.ReactNode
  onMove: (e: FlickingEvent) => void
  plugins: any[]
}> = ({ children, onMove, plugins }) => {
  useEffect(() => {
    return () => {
      clearCascadeTimer() // kill onMove function when unmounted
    }
  }, [])

  return (
    <Flicking
      plugins={plugins}
      tag="div"
      viewportTag="div"
      cameraTag="div"
      onNeedPanel={(e: NeedPanelEvent) => {}}
      onMoveStart={(e: FlickingEvent) => {}}
      onMove={onMove}
      onMoveEnd={(e: FlickingEvent) => {}}
      onHoldStart={(e: FlickingEvent) => {}}
      onHoldEnd={(e: FlickingEvent) => {}}
      onRestore={(e: FlickingEvent) => {}}
      onSelect={(e: SelectEvent) => {}}
      onChange={(e: ChangeEvent) => {}}
      classPrefix="flick-carousel"
      deceleration={0.0075}
      horizontal={true}
      circular={true}
      infinite={false}
      infiniteThreshold={0}
      lastIndex={Infinity}
      threshold={40}
      duration={FLICK_DURATION}
      panelEffect={(x) => 1 - Math.pow(1 - x, 3)}
      defaultIndex={0}
      inputType={["touch", "mouse"]}
      thresholdAngle={45}
      bounce={10}
      autoResize={false}
      adaptive={false}
      zIndex={2000}
      bound={false}
      overflow={false}
      hanger={"50%"}
      anchor={"50%"}
      gap={50}
      moveType={MOVE_TYPE.SNAP}
      collectStatistics={true}
      children={children}
    />
  )
}

export const SectionHeading: React.FC<PropsSectionHeading> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="">
      <div className="bg-primary shape-leaf section-heading-container wow fadeInDown">
        <h2 className="section-heading">{title}</h2>
      </div>
      {subtitle && (
        <div className="bg-accent-top shape-leaf-inv section-heading-container section-heading-container-subtitle shadow-light">
          <h3 className="section-heading">{subtitle}</h3>
        </div>
      )}
    </div>
  )
}

export default {}
