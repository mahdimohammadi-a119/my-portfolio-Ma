import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import RevealOnScroll from "./components/RevealOnScroll";
import { useContent } from "./hooks/useContent";
import "./App.css";

function App() {
  const { content, error } = useContent();

  if (error) {
    return <p className="status-screen">The site could not be loaded. Please refresh the page.</p>;
  }

  if (!content) {
    return <p className="status-screen">Loading…</p>;
  }

  return (
    <>
      <RevealOnScroll>
        <Navbar brand={content.site.brand} />
      </RevealOnScroll>

      <RevealOnScroll>
        <Hero content={content.hero} />
      </RevealOnScroll>

      <RevealOnScroll>
        <About content={content.about} />
      </RevealOnScroll>

      <RevealOnScroll>
        <Skills content={content.skills} />
      </RevealOnScroll>

      <RevealOnScroll>
        <Projects content={content.projects} />
      </RevealOnScroll>

      <RevealOnScroll>
        <Contact content={content.contact} />
      </RevealOnScroll>

      <RevealOnScroll>
        <Footer site={content.site} />
      </RevealOnScroll>
    </>
  );
}

export default App;
