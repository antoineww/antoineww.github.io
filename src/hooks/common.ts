import { useState, useEffect } from "react"

const SMALL_SCREEN_WIDTH = 1000
const SMALL_SCREEN_HEIGHT = 1000
const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
    isSmallScreenWidth: width < SMALL_SCREEN_WIDTH,
    isSmallScreenHeight: height < SMALL_SCREEN_HEIGHT,
    isPortrait: width < height,
    isLandscape: width > height,
  }
}

const useWindowDimensions = (enable = true) => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowDimensions
}

export default useWindowDimensions
