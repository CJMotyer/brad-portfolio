'use client';

import { useEffect, useRef, useState } from 'react';
import { regionalCredits, educationalCredits, photographs, imageUrl, headshot, portrait } from './data/portfolio';

type Credit = (typeof regionalCredits)[number];
function CreditTable({ credits, label }: { credits: Credit[]; label: string }) {
  return <div className="table-scroll" role="region" aria-label={label} tabIndex={0}><table><caption className="sr-only">{label}</caption><thead><tr><th scope="col">Production</th><th scope="col">Role</th><th scope="col">Theatre / Company</th><th scope="col">Director</th></tr></thead><tbody>{credits.map((item) => <tr key={item.production}><th scope="row">{item.production}</th><td>{item.role}</td><td>{item.company}</td><td>{item.director}</td></tr>)}</tbody></table></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  function openPhoto(index: number) {
    setSelectedPhoto(index);
    dialog.current?.showModal();
  }

  const photo = photographs[selectedPhoto];
  return (
    <main>
      <a className="skip-link" href="#about">Skip to content</a>
      <header className="nav-shell">
        <a className="wordmark" href="#top" aria-label="Brad Motyer home">BRAD <span>MOTYER</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? 'Close ×' : 'Menu +'}</button>
        <nav id="navigation" aria-label="Main navigation" className={menuOpen ? 'nav-links open' : 'nav-links'} onClick={() => setMenuOpen(false)}>
          <a href="#about">About me</a><a href="#gallery">Gallery</a><a href="#resume">Résumé</a><a href="#contact">Contact <span>↗</span></a>
        </nav>
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Actor · Singer</p>
          <h1 id="hero-title">Brad Motyer</h1>
          <p className="hero-location">BFA Musical Theatre<br />Kent State University · Class of 2028</p>
          <div className="hero-actions"><a className="button" href="#about">About me</a><a className="button button-outline" href="#resume">My résumé</a></div>
        </div>
        <figure className="hero-portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero-image" src={headshot} width={1333} height={2000} alt="Brad Motyer, headshot by Tara Motyer" fetchPriority="high" />
          <figcaption className="hero-credit">Photo: Tara Motyer</figcaption>
        </figure>
      </section>

      <section id="about" className="about section-pad" aria-labelledby="about-title">
        <figure className="about-portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portrait} width={1440} height={1440} alt="Portrait of Brad Motyer, photographed by Tara Motyer" loading="lazy" />
          <figcaption>Portrait · Photo: Tara Motyer</figcaption>
        </figure>
        <div className="about-copy"><p className="kicker">Biography</p><h2 id="about-title" className="statement">About me</h2>
          <p className="body-copy">Hi, I’m Brad! I’m an actor and singer working toward my BFA in Musical Theatre at Kent State University, where I expect to graduate in 2028.</p>
          <p className="body-copy">I’ve performed with Porthouse Theatre, Starlight Mountain Theatre, and Players Guild Theatre. My roles include Motel in <em>Fiddler on the Roof</em>, Troy Bolton in <em>High School Musical</em>, and Dennis in <em>The Play That Goes Wrong</em>. At Kent State, I’ve played Mr Darcy in <em>Pride and Prejudice</em> and Bob Martindale in <em>Perfect Arrangement</em>.</p>
          <p className="body-copy">My musical background also includes Chamber Singers Choir at The College of Idaho. I’m a baritenor, speak fluent Spanish, and read music. I also do vocal percussion.</p>
          <div className="facts"><div><span>Voice</span><b>Baritenor · A2–C4</b></div><div><span>Height</span><b>6′ 0″</b></div><div><span>Training</span><b>Kent State · ’28</b></div></div><a className="text-link" href="#resume">View my résumé <span>↘</span></a>
        </div>
      </section>

      <section id="gallery" className="work section-pad" aria-labelledby="gallery-title">
        <div className="section-heading"><div><p className="kicker">Gallery</p></div><h2 id="gallery-title">Production photos</h2></div>
        <p className="gallery-instruction">Select a photograph to view it in full.</p>
        <div className="role-grid">{photographs.map((item, index) => (
          <figure className="role-card" key={item.file}>
            <button className="photo-button" onClick={() => openPhoto(index)} aria-label={`Enlarge photo: ${item.title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl(item.file)} width={item.width} height={item.height} alt={item.alt} loading="lazy" /><span className="photo-expand" aria-hidden="true">↗</span>
            </button>
            <figcaption><div className="role-meta"><h3>{item.title}</h3></div><p className="role-detail">{item.role} · {item.company}</p><p className="photo-credit">Photo: {item.photographer}</p></figcaption>
          </figure>
        ))}</div>
      </section>

      <section id="resume" className="resume section-pad" aria-labelledby="resume-title"><div className="section-heading"><div><p className="kicker">Credits & training</p></div><h2 id="resume-title">Résumé</h2></div>
        <div className="resume-top"><div><h3>Brad Motyer</h3><p>Actor & singer<br />Height: 6′ 0″ · Baritenor (A2–C4)</p></div><a className="download-button" href="./brad-motyer-resume.pdf" download>Download my résumé <span>↓ PDF</span></a></div>
        <h3 className="resume-label">Regional theatre</h3><p className="table-hint">Swipe the credits to see companies and directors →</p><CreditTable credits={regionalCredits} label="Brad Motyer regional theatre credits" />
        <h3 className="resume-label">Educational theatre</h3><CreditTable credits={educationalCredits} label="Brad Motyer educational theatre credits" />
        <div className="training-grid"><div><h3 className="resume-label">Education & training</h3><p><strong>Kent State University</strong><br />BFA, Musical Theatre · Expected 2028</p><p><strong>The College of Idaho · 2017–2019</strong><br />Chamber Singers Choir<br />Dr Brent Wells, Director</p></div><div><h3 className="resume-label">Special skills</h3><ul className="skills-list"><li>Baritenor · A2–C4</li><li>Music reading & vocal percussion</li><li>Fluent Spanish</li><li>Whistling on pitch & belching on command</li><li>Rollerblading & competitive swimming</li></ul></div></div>
      </section>

      <footer id="contact" className="footer section-pad"><p className="kicker">Say hello</p><h2>Contact me.</h2><p className="contact-copy">For auditions and production enquiries, you can reach me here.</p><a className="email" href="mailto:Bmotyer25@gmail.com">Bmotyer25@gmail.com <span aria-hidden="true">↗</span></a><a className="contact-phone" href="tel:+12087896731">(208) 789-6731</a><div className="footer-row"><p>© {new Date().getFullYear()} Brad Motyer</p><p>Photography: Tara Motyer · Rami Daud · Michael Carrier · Bob Christy</p><a href="#top">Back to top ↑</a></div></footer>

      <dialog ref={dialog} className="photo-dialog" aria-labelledby="photo-title" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <button className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Close enlarged photo" autoFocus>Close ×</button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl(photo.file)} width={photo.width} height={photo.height} alt={photo.alt} />
        <div><h2 id="photo-title">{photo.title}</h2><p>{photo.role} · {photo.company}</p><p>Photo: {photo.photographer}</p></div>
      </dialog>
    </main>
  );
}
