const Footer = () => {
  return (
    <footer className="bg-black/30 backdrop-blur-lg border-t border-white/20 shadow-inner py-6 text-sm text-center text-white">
      <p>
        © {new Date().getFullYear()} <span className="font-semibold text-white">BookEase</span>. All rights reserved.
      </p>
      <div className="mt-2 flex justify-center gap-4 text-white/70 text-xs">
        <a
          href="https://github.com/priyanshu-1006"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/priyanshu-chaurasia-326979335/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          LinkedIn
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
