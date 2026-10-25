function Footer({ site }) {
  return (
    <footer className="footer">
      <p>{site.footerText}</p>

      <a href="#home">Back to Top ↑</a>

      <span>{site.copyright}</span>
    </footer>
  );
}

export default Footer;
