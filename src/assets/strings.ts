interface StringsFormat {
  [key: string]: string
}

export const STRINGS = {
  product_name: "AW Station",
  occupation: "Software Engineer",
  find_out_more: "Find Out More",
  email: "antwilworks@gmail.com",
  linkedin_url: "https://jm.linkedin.com/in/antoine-wiles-75308190",

  // headings

  about_title: "What I Have",
  about_subtitle: "Experience",
  skills_title: "What I Do",
  skills_subtitle: "At Your Service",
  services_title: "What I Know",
  services_subtitle: "Languages & Frameworks",
  contact_title: "Contact Me",
  contact_subtitle: "Let's Get In Touch!",

  // about
  years_experience:
    "I've got the engineering skills & knowledge you need, with 3+ years of Experience",
  focus_motto:
    "Central focus on Good Design and Effective Implementation are my keys for quality software creation.",
  check_me_out: "Check me out!",

  // services
  database_title: "Database Creation & Management",
  database_description:
    "Versed in multiple database languages & schemas, while using efficient normalized schemes, ORMs & procedures.",
  implementation_title: "Functional Implementation",
  implementation_description:
    "Proficient in multiple languages using best practices, creation of robust code structure with quality patterns/techniques as well as improvements to increase effectiveness.",

  design_title: "UI & UX Design",
  design_description:
    "Use of bootstrap, flexbox, material design and other good designs, themes and frameworks for multiple languages. Additionally with a keen eye for customized design.",

  build_title: "Ready to Build",
  build_description:
    "Polish apps to be production-ready, making your websites, scripts, programs and mobile apps good-to-go!",

  // skills
  previous: "Previous",
  next: "Next",
  build: "Build",
  maintain: "Maintain",
  debug: "Debug",
  fix: "Fix",
  refactor: "Refactor",
  deploy: "Deploy",

  // contact
  contact_message: "Ready to start your next project with me? That's great!",
  contact_instructions: "Send a message to my email or my LinkedIn.",
  linkedin: "LinkedIn",
}

// const strings: Function = (desiredText: string) => {
//   try {
//     const text: string = STRINGS[desiredText]
//     return text
//   } catch (_) {
//     return desiredText.toUpperCase()
//   }
// }

export default STRINGS
