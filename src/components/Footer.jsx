function Footer() {
  return (
    <footer style={{ marginTop: "20px" }}>
      <div className="photo-credit">
        Thanks to the HeroSection image by
        <a
          target="blank"
          href="https://unsplash.com/photos/AtPWnYNDJnM?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
        >
          {" "}
          Krists Luhaers on unsplash
        </a>
      </div>
      <p>
        Developed by{" "}
        <a href="https://ajaykc.netlify.app/" target="_blank">
          Ajay KC
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;
