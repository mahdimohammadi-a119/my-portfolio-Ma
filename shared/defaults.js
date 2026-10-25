// Content shown until the admin changes it. Also the fallback when storage is empty.

export const DEFAULT_CONTENT = {
  site: {
    brand: "Time To Program",
    footerText: "Made with ❤️ by Mahdi",
    copyright: "© 2026 All Rights Reserved",
  },
  hero: {
    greeting: "Hi, I'm Mahdi",
    title: "Front-End Developer",
    description:
      "I'm a Junior Front-End Developer passionate about building clean, responsive, and user-friendly websites. I work with HTML, CSS, JavaScript, and React to create modern web interfaces. I'm always learning new skills, improving my code, and building projects to grow as a developer.",
    primaryButtonText: "View My Work",
    secondaryButtonText: "Contact Me",
    image: "/hero.jpg",
  },
  about: {
    heading: "About Me",
    paragraphs: [
      "I'm a motivated Junior Front-End Developer who enjoys turning ideas into websites. I focus on writing clean code, creating responsive designs, and learning modern web technologies. I'm looking for opportunities to improve my skills and gain real-world experience.",
      "My journey in web development is just beginning. Every project helps me improve my skills, learn new things, and become a better developer.",
    ],
    buttonText: "Explore My Projects",
    image: "/hero.jpg",
  },
  skills: {
    heading: "My Skills",
    subheading: "Technologies I'm learning and using to build modern websites.",
    items: [
      { name: "HTML", description: "Page structure", image: "/HTML.png" },
      { name: "CSS", description: "Design and layout", image: "/CSS.png" },
      { name: "JavaScript", description: "Interactive websites", image: "/JavaScript.png" },
      { name: "React", description: "Reusable components", image: "/React.png" },
    ],
  },
  projects: {
    heading: "My Projects",
    subheading: "Some of the projects I've built while learning frontend development.",
    items: [
      { title: "Study Planner", description: "A modern website for study planning.", image: "/project1.jpg", alt: "Study Planner website" },
      { title: "Tech Store", description: "A modern digital product catalog.", image: "/project2.jpg", alt: "Tech Store website" },
      { title: "Dynamic Input Fields", description: "An interactive form builder.", image: "/project3.jpg", alt: "Dynamic Input Fields" },
      { title: "Simple Form Validation", description: "A responsive form with email and password validation.", image: "/project4.jpg", alt: "Simple Form Validation" },
      { title: "My To-Do List", description: "Organize daily tasks and stay on schedule.", image: "/project5.jpg", alt: "To-Do List website" },
      { title: "Dice Roller", description: "Generate a random number from 1 to 6.", image: "/project6.jpg", alt: "Dice Roller" },
    ],
  },
  contact: {
    heading: "Contact Me",
    subheading: "Have a project in mind? Let's create something amazing together.",
    email: "MahdiMohammadi119m@gmail.com",
    location: "Herat, Afghanistan",
    role: "Frontend Developer",
  },
};
