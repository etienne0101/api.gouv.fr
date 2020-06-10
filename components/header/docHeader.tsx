import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { throttle } from 'lodash';

import { apiDocLogo, republiqueFrLogo, githubLogo } from './logos';

const Header = ({ headerKey = 'home', useMenu = true }) => {
  const header = useRef(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!header || !header.current) {
        return;
      }
      //@ts-ignore
      const headerClasses = header.current.classList;
      const hasScrolledClass = headerClasses.contains('scrolled');
      if (
        (window.scrollY !== 0 && !hasScrolledClass) ||
        (window.scrollY === 0 && hasScrolledClass)
      ) {
        headerClasses.toggle('scrolled');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header role="navigation" ref={header}>
      <nav className="nav">
        <input
          className="menu-btn"
          type="checkbox"
          id="menu-btn"
          aria-label="ouverture-menu"
        />

        <div className="nav__container">
          <Link href="/">
            <a
              className="nav__logo-wrapper"
              title="Retourner à l’accueil de la documentation des APIs du service public"
            >
              <span className="nav__logo">{republiqueFrLogo}</span>
              <span className="nav__logo">{apiDocLogo}</span>
            </a>
          </Link>
        </div>
        <a
          href="https://github.com/betagouv/api.gouv.fr/"
          className="github-corner dont-apply-link-style"
          aria-label="Code source sur GitHub"
          target="_blank"
          rel="noreferrer noopener"
        >
          {githubLogo}
        </a>
      </nav>
    </header>
  );
};

export default Header;
