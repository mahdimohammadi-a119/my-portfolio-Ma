function Hero({ content }) {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h3>{content.greeting}</h3>

        <h1>{content.title}</h1>

        <p>{content.description}</p>

        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">
            {content.primaryButtonText}
          </a>

          <a href="#contact" className="btn-secondary">
            {content.secondaryButtonText}
          </a>
        </div>
      </div>

      <div className="hero-image">
        <img src={content.image} alt="Developer illustration" />
      </div>
    </section>
  );
}

export default Hero;
