import React, { useRef } from "react"
import { Fade, AutoPlay } from "@egjs/flicking-plugins"
import {useInView} from "react-cool-inview"
import {
  Carousel,
  CarouselLanguageItem,
  onMoveAdjustStyles,
  PropsLanguage,
} from "./index"

const FLICKING_PLUGINS = [new Fade(), new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false })]

export const LanguageCarousel: React.FC<{
  languages: Array<PropsLanguage>
  [key: string]: any
}> = ({ languages, ...restOfProps }) => {
  const progressBar = useRef<HTMLDivElement>(null)
  const { observe: carouselRef, unobserve, inView, scrollDirection, entry } = useInView({
    threshold: 0.25, // Default is 0
    onChange: ({ inView, scrollDirection, entry, observe, unobserve }) => {
      // Triggered whenever the target meets a threshold, e.g. [0.25, 0.5, ...]

      unobserve(); // To stop observing the current target element
      observe(); // To re-start observing the current target element
    },
    onEnter: ({ scrollDirection, entry, observe, unobserve }) => {
      // Triggered when the target enters the viewport
    },
    onLeave: ({ scrollDirection, entry, observe, unobserve }) => {
      // Triggered when the target leaves the viewport
    },
    // More useful options...
  })

  return (
    <div
      {...restOfProps}
      // @ts-ignore
      ref={carouselRef}
    >
      <Carousel
        onMove={onMoveAdjustStyles(progressBar)}
        // OPTIMIZATION: Disable animation when not inView
        plugins={inView ? FLICKING_PLUGINS : []}
      >
        {languages.map((language) => (
          <CarouselLanguageItem
            {...language}
            key={`carousel-item-${language.name}`}
          />
        ))}
      </Carousel>
      <div className="progress">
        <div className="bar" ref={progressBar} />
      </div>
    </div>
  )
}

export default LanguageCarousel
