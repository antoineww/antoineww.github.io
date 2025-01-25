$(document).ready(function() {
  setupForToAnimateWriting()
  animateWriting()
  initScrollingAnimationOnIcons()
  updateSectionHeading()
});


const setupForToAnimateWriting = () => {
  $("path").each((i, element) => {
    const length = element.getTotalLength()
    $(element).css({ "stroke-dashoffset": length, "stroke-dasharray": length })
  })
}

const animateWriting = () => {
  const letters = $("path")
  letters.each((i, element) => {
    $(element).animate(
      {
        "stroke-dashoffset": 0,
        // "stroke-dasharray": 0
      },
      {
        duration: 300 * (i + 1),
        easing: "swing",
        complete: () => {
          clearStrokeDasharray(element)
          if (i > letters.length - 2) animateFadeIn()
        },
      }
    )
  })
}
const clearStrokeDasharray = (element) =>
  $(element).css({ "stroke-dasharray": 0 })

const animateFadeIn = () => {
  $("svg").css({ fill: "white", transition: "5s" })
}

const initScrollingAnimationOnIcons = (params) => {
  // Initialize WOW.js Scrolling Animations
  
  const wow = new WOW(
    {
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       100,          // default
    mobile:       true,       // default
    live:         true        // default
  }
  )
  wow.init()
}

const updateSectionHeading = () => {
  const startYear = 2013
  const currentYear = new Date().getFullYear()
  const numberOfYears = currentYear - startYear
  const sectionHeading = `I've got the engineering skills & knowledge you need with ${numberOfYears}+ years of Experience`
  $("#yearsExperience").text(sectionHeading)
}
