import React from "react"
import { Parallax } from "react-parallax"

interface PropsEffectsWrapperParallax {
  image: string
  [key: string]: any
}
export const EffectsWrapperParallax: React.FC<PropsEffectsWrapperParallax> = ({
  children,
  image,
  ...props
}) => (
  <Parallax bgImage={image} strength={400} {...props}>
    {children}
  </Parallax>
)
