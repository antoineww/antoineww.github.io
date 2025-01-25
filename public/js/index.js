const selectorSvgPath = ".header-content path"
const selectorSvg = ".header-content svg"

const setupForToAnimateWriting = () => {
  $(selectorSvgPath).each((i, element) => {
    const length = element.getTotalLength()
    $(element).css({ "stroke-dashoffset": length, "stroke-dasharray": length })
  })
}

const animateWriting = () => {
  const letters = $(selectorSvgPath)
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
  $(selectorSvg).css({ fill: "white", transition: "5s" })
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

const onReady = () => {
  try{ setupForToAnimateWriting()       }catch(err){}
  try{ animateWriting()                 }catch(err){}
  try{ initScrollingAnimationOnIcons()  }catch(err){}
  try{ updateSectionHeading()           }catch(err){}
}

const onReadyDelayed = () => {
  let timerReady = setTimeout(()=>{
    onReady()

    clearTimeout(timerReady)
    timer = null
  },500)
}


$(document).ready(function() {
  onReadyDelayed()
});

