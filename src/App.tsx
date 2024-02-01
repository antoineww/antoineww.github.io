import React, { useEffect, useRef, useState } from "react"
// @ts-ignore
import useScrollSpy from "react-use-scrollspy"

import "./css/main.css"
import skillsBG from "./assets/img/header.jpg"
import { STRINGS } from "./assets/strings"
import { name as NameLogo } from "./components/svg/name"
import {
  SectionHeading,
  myLanguages,
  runCooldownFunction,
  clearCooldownTimer,
} from "./components/common"

import { EffectsWrapperRipple } from "./components/coolEffects/RippleDiv"
import { EffectsWrapperParallax } from "./components/coolEffects/ParallaxDiv"
import useWindowDimensions from "./hooks/common"

// const LanguageCarousel = React.lazy(
//   () => import("./components/common/languageCarousel")
// )

import LanguageCarousel from "./components/common/languageCarousel"

interface PropsMenu {
  disabled?: boolean
  activeSection: number
  sectionRefs: SectionRefs
  [key: string]: any
}
interface PropsAppSection {
  forwaredRef: React.RefObject<HTMLElement>
  sectionRefs?: SectionRefs
  [key: string]: any
}

const sectionNames = ["Header", "About", "Skills", "Services", "Contact"]

const Menu: React.FC<PropsMenu> = ({
  disabled,
  activeSection,
  sectionRefs,
  windowDimensions,
}) => {
  if (disabled) return null

  const { isSmallScreenWidth } = windowDimensions

  const menuElements = sectionNames.map((name, index) => {
    if (index === 0) return null

    const bgColor =
      activeSection === index ? "bg-color-accent" : "bg-color-main-light"
    const classname = `btn ${isSmallScreenWidth ? "" : "shape-leaf"} ${bgColor}`

    return (
      <li key={`menuItem-${name}`} style={{ zIndex: 1 + index }}>
        <a
          className={classname}
          href={`#${name.toLowerCase()}`}
          onClick={(e) => {
            e.preventDefault()
            let sectionRef = sectionRefs[name].current
            if (sectionRef) sectionRef.scrollIntoView({ behavior: "smooth" })
          }}
        >
          {name}
        </a>
      </li>
    )
  })

  return (
    <nav
      id="mainNav"
      className={`navbar navbar-default navbar-fixed-top ${
        isSmallScreenWidth ? "shadow-dark" : ""
      }`}
    >
      <div className="navbar-header">
        <img
          loading="lazy"
          className="brand"
          src={require(`./assets/img/aw.png`)}
          alt={"brand"}
          onClick={(e) => {
            e.preventDefault()
            let sectionRef = sectionRefs[sectionNames[0]].current
            if (sectionRef) sectionRef.scrollIntoView({ behavior: "smooth" })
          }}
        />
      </div>

      <div className="navbar-menu">
        <ul className="nav navbar-nav navbar-right">{menuElements}</ul>
      </div>
    </nav>
  )
}

const Header: React.FC<PropsAppSection> = (props) => {
  const { forwaredRef, sectionRefs } = props
  const [renderLanguagesSection, setRenderLanguagesSection] = useState(false)
  useEffect(() => {
    runCooldownFunction(() => setRenderLanguagesSection(true), 4000, true)
    return () => {
      clearCooldownTimer()
    }
  }, [])

  const languagesSection = (
    <>
      <a
        href="#about"
        className="btn bg-color-main-light shape-leaf page-scroll"
        onClick={(e) => {
          e.preventDefault()
          if (!sectionRefs) return
          const sectionRef = sectionRefs["About"]
          if (sectionRef.current)
            sectionRef.current.scrollIntoView({ behavior: "smooth" })
        }}
      >
        {STRINGS.find_out_more}
      </a>
      <LanguageCarousel
        id="myLanguages"
        className="carousel wow fadeIn"
        languages={myLanguages.map((lang) => ({
          ...lang,
          src: require(`./assets/img/langs/${lang.name.toLowerCase()}.${
            lang.extension || "png"
          }`),
        }))}
      />
    </>
  )

  return (
    <header ref={forwaredRef}>
      <div className="header-content">
        <div className="header-content-inner shape-leaf bg-color-main-light">
          <NameLogo />
          <h1>{STRINGS.occupation}</h1>
        </div>
      </div>

      {renderLanguagesSection && languagesSection}
    </header>
  )
}

const About: React.FC<PropsAppSection> = (props) => {
  const { forwaredRef, sectionRefs, ...restOfProps } = props

  const propsDefault = {
    title: STRINGS.about_title,
    subtitle: STRINGS.about_subtitle,
    ...restOfProps,
  }
  return (
    <section id="about" className="bg-accent-top" ref={forwaredRef}>
      <SectionHeading {...propsDefault} />

      <div className="container">
        <div className="description">
          <h2 className="" id="yearsExperience">
            {STRINGS.years_experience}
          </h2>
          <hr className="light" />
          <p className="text-faded">{STRINGS.focus_motto}</p>
        </div>
        <a
          href="/"
          className="btn bg-color-main-light shape-leaf page-scroll"
          onClick={(e) => {
            e.preventDefault()
            if (!sectionRefs) return
            const sectionRef = sectionRefs["Skills"]
            if (sectionRef.current)
              sectionRef.current.scrollIntoView({ behavior: "smooth" })
          }}
        >
          {STRINGS.check_me_out}
        </a>
      </div>
    </section>
  )
}

const Skills: React.FC<PropsAppSection> = (props) => {
  const { forwaredRef, windowDimensions, ...restOfProps } = props
  const { width } = windowDimensions
  const propsDefault = {
    title: STRINGS.skills_title,
    subtitle: STRINGS.skills_subtitle,
    ...restOfProps,
  }

  const content = (
    <section id="skills" className="bg-secondary-topN" ref={forwaredRef}>
      <SectionHeading {...propsDefault} />

      <div className="container">
        <div className="description">
          <div className="skill-pair wow fadeInUp" data-wow-delay="1s">
            <div className="bg-color-secondary shape-leaf-inv feature-skill-container offset-left ">
              <h3 className="feature-skill">{STRINGS.build}</h3>
            </div>
            <div className="bg-color-accent shape-leaf feature-skill-container offset-right">
              <h3 className="feature-skill">{STRINGS.maintain}</h3>
            </div>
          </div>

          <div className="skill-pair wow fadeInUp" data-wow-delay="2s">
            <div className="bg-color-teritary shape-leaf-inv feature-skill-container offset-left ">
              <h3 className="feature-skill">{STRINGS.debug}</h3>
            </div>
            <div className="bg-color-main shape-leaf feature-skill-container offset-right">
              <h3 className="feature-skill">{STRINGS.fix}</h3>
            </div>
          </div>

          <div className="skill-pair wow fadeInUp" data-wow-delay="3s">
            <div className="bg-color-accent shape-leaf-inv feature-skill-container offset-left ">
              <h3 className="feature-skill">{STRINGS.refactor}</h3>
            </div>
            <div className="bg-color-secondary shape-leaf feature-skill-container offset-right">
              <h3 className="feature-skill">{STRINGS.deploy}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  let skillsComponent = content

  if (width < 1000) {
    skillsComponent = (
      <EffectsWrapperParallax image={skillsBG} className="parallax-skills">
        {content}
      </EffectsWrapperParallax>
    )
  } else {
    skillsComponent = (
      <EffectsWrapperParallax image={skillsBG} className="parallax-skills">
        <EffectsWrapperRipple>{content}</EffectsWrapperRipple>
      </EffectsWrapperParallax>
    )
  }

  return skillsComponent
}

const Services: React.FC<PropsAppSection> = (props) => {
  const { forwaredRef, ...restOfProps } = props
  const propsDefault = {
    title: STRINGS.services_title,
    subtitle: STRINGS.services_subtitle,
    ...restOfProps,
  }

  return (
    <section id="services" className="bg-teritary" ref={forwaredRef}>
      <SectionHeading {...propsDefault} />
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 text-center">
            <div className="service-box">
              <i className="fa fa-4x fa-database wow bounceIn text-primary"></i>
              <h3>{STRINGS.database_title}</h3>
              <p className="text-muted">{STRINGS.database_description}</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 text-center">
            <div className="service-box">
              <i
                className="fa fa-4x fa-cogs wow bounceIn text-primary"
                data-wow-delay=".2s"
              ></i>
              <h3>{STRINGS.implementation_title}</h3>
              <p className="text-muted">{STRINGS.implementation_description}</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 text-center">
            <div className="service-box">
              <i
                className="fa fa-4x fa-css3 wow bounceIn text-primary"
                data-wow-delay=".4s"
              ></i>
              <h3>{STRINGS.design_title}</h3>
              <p className="text-muted">{STRINGS.design_description}</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 text-center">
            <div className="service-box">
              <i
                className="fa fa-4x fa-paper-plane wow bounceIn text-primary"
                data-wow-delay=".6s"
              ></i>
              <h3>{STRINGS.build_title}</h3>
              <p className="text-muted">{STRINGS.build_description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Contact: React.FC<PropsAppSection> = (props) => {
  const { forwaredRef, ...restOfProps } = props
  const propsDefault = {
    title: STRINGS.contact_title,
    subtitle: STRINGS.contact_subtitle,
    ...restOfProps,
  }
  return (
    <section id="contact" className="bg-secondary-top" ref={forwaredRef}>
      <SectionHeading {...propsDefault} />
      <div className="container">
        <div className="col-lg-8 col-lg-offset-2 text-center">
          <h3 className="contact-message">{STRINGS.contact_message}</h3>
          <h3 className="contact-message">{STRINGS.contact_instructions}</h3>
        </div>
        <hr className="primary" />
        <div className="row">
          <div className="col-lg-4 col-lg col-lg-offset-2 text-center contact-link">
            <a
              className="btn bg-color-main-dark shape-leaf-inv "
              href={`mailto:${STRINGS.email}`}
            >
              <i
                className="fa fa-envelope-o fa-3x wow bounceIn"
                data-wow-delay=".6s"
              ></i>
              {STRINGS.email}
            </a>
          </div>
          <div className="col-lg-4 col-lg text-center contact-link">
            <a
              href={STRINGS.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-color-main-light shape-leaf "
            >
              <i
                className="fa fa-linkedin-square fa-3x wow bounceIn"
                data-wow-delay="1s"
              ></i>
              {STRINGS.linkedin}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

interface SectionRefs {
  [key: string]: React.RefObject<HTMLElement>
}
const App = () => {
  const { isSmallScreenWidth } = useWindowDimensions()
  const windowDimensions = { isSmallScreenWidth }
  const sectionRefs: SectionRefs = {}

  // eslint-disable-next-line react-hooks/rules-of-hooks
  sectionNames.forEach((name) => (sectionRefs[name] = useRef(null)))

  const activeSection = useScrollSpy({
    sectionElementRefs: Object.values(sectionRefs),
    offsetPx: -200,
  }) || 0

  return (
    <div id="page">
      <Menu
        disabled={false}
        activeSection={activeSection}
        sectionRefs={sectionRefs}
        windowDimensions={windowDimensions}
      />
      <Header forwaredRef={sectionRefs["Header"]} sectionRefs={sectionRefs} />
      <About forwaredRef={sectionRefs["About"]} sectionRefs={sectionRefs} />
      <Skills
        forwaredRef={sectionRefs["Skills"]}
        windowDimensions={windowDimensions}
      />
      <Services forwaredRef={sectionRefs["Services"]} />
      <Contact forwaredRef={sectionRefs["Contact"]} />
    </div>
  )
}

export default App
