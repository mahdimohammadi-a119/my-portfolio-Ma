function Skills({ content }) {
  return (
    <section className="skills" id="skills">
      <div className="section-heading">
        <h2>{content.heading}</h2>
        <p>{content.subheading}</p>
      </div>

      <div className="skills-container">
        {content.items.map((skill, index) => (
          <div className="skill-card" key={`${skill.name}-${index}`}>
            <img src={skill.image} alt={`${skill.name} logo`} />
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
