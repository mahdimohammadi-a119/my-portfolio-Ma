function About({ content }) {
  return (
    <section className="about" id="about">
      <div className="about-image">
        <img src={content.image} alt="About me" />
      </div>

      <div className="about-content">
        <h2>{content.heading}</h2>

        {content.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <a href="#projects" className="about-button">
          {content.buttonText}
        </a>
      </div>
    </section>
  );
}

export default About;
