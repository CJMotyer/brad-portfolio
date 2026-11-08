'use client';

import { useEffect, useState } from 'react';

const roles = [
  { title: 'After Midnight', type: 'Feature Film · Lead', year: '2026', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1400&q=85' },
  { title: 'The Long Way Home', type: 'Limited Series · Recurring', year: '2025', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1400&q=85' },
  { title: 'No Fixed Address', type: 'Short Film · Lead', year: '2025', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reelOpen, setReelOpen] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.14 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = reelOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [reelOpen]);

  return (
    <main>
      <header className="nav-shell">
        <a className="wordmark" href="#top" aria-label="Avery Stone home">AVERY <span>STONE</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} onClick={() => setMenuOpen(false)}>
          <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
          <button onClick={() => setReelOpen(true)}>Play reel <span>↗</span></button>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-image" aria-hidden="true" /><div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow"><i /> Los Angeles · New York</p>
          <h1><span>Avery</span><span className="outline">Stone</span></h1>
          <div className="hero-bottom"><p>Actor / Storyteller<br />SAG-AFTRA</p><button className="play" onClick={() => setReelOpen(true)}><b>▶</b><span>Watch<br />showreel</span></button></div>
        </div>
        <a className="scroll-cue" href="#work">Scroll to explore <i /></a>
      </section>

      <section id="work" className="work section-pad">
        <div className="section-heading" data-reveal><p className="kicker">01 / Selected work</p><h2>Stories worth<br /><em>remembering.</em></h2></div>
        <div className="role-grid">
          {roles.map((role, index) => (
            <article className="role-card" key={role.title} data-reveal style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}>
              <div className="role-image" style={{ backgroundImage: `url(${role.image})` }}><span>0{index + 1}</span></div>
              <div className="role-meta"><div><h3>{role.title}</h3><p>{role.type}</p></div><span>{role.year}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about section-pad">
        <div className="about-image" data-reveal><span>Portrait / 2026</span></div>
        <div className="about-copy" data-reveal><p className="kicker">02 / About</p><p className="statement">I look for the quiet truth inside bold characters.</p><p className="body-copy">Avery Stone is a Los Angeles–based actor known for grounded, emotionally precise performances across film and television. Their work lives in the space between restraint and revelation.</p><div className="facts"><div><span>Height</span><b>5′ 9″</b></div><div><span>Location</span><b>LA / NYC</b></div><div><span>Representation</span><b>North Artists</b></div></div><a className="text-link" href="./resume.pdf">Download résumé <span>↓</span></a></div>
      </section>

      <section className="quote section-pad" data-reveal><p>“A rare combination of stillness<br />and <em>electricity.</em>”</p><span>— The Screen Journal</span></section>
      <footer id="contact" className="footer section-pad"><p className="kicker">03 / Let’s connect</p><a className="email" href="mailto:hello@averystone.com">hello@averystone.com <span>↗</span></a><div className="footer-row"><p>© 2026 Avery Stone</p><div><a href="#">Instagram</a><a href="#">IMDb</a><a href="#">Vimeo</a></div><a href="#top">Back to top ↑</a></div></footer>

      {reelOpen && <div className="reel-modal" role="dialog" aria-modal="true" aria-label="Showreel"><button onClick={() => setReelOpen(false)} aria-label="Close showreel">Close ×</button><div className="reel-frame"><div><span>SHOWREEL</span><b>Replace this panel with your Vimeo or YouTube embed.</b></div></div></div>}
    </main>
  );
}
