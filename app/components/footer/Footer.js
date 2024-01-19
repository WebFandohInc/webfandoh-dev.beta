// components/Footer.js
import React from 'react';
import Image from 'next/image';
import styles from './footer.module.css';+

import frame from '../../../public/Frame 4.png';
import facebookLogo from '../../../public/facebooklogo.png';
import instagramLogo from '../../../public/facebooklogo.png';
import twitterLogo from '../../../public/twitterlogo.ong.png';
import tiktokLogo from '../../../public/tik-tok.png';

import styles from './Footer.module.css';

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <div id="footer_content" className={styles.footerContent}>
        <div id="logo_section" className={styles.logoSection}>
          <Image src={frame4.src} alt="Logo Footer" className={styles.logo} />
        </div>
        <div id="footer_contacts" className={styles.footerContacts}>
          <p className={styles.footerHeading}>Junte-se a nós</p>
          <div id="footer_social_media" className={styles.footerSocialMedia}>
            <a href="https://www.facebook.com/webfandoh.oficial/" className={styles.footerLink} id={styles.facebook}>
              <Image src={facebookLogo.src} alt="Ícone Facebook" width={40} height={40} />
            </a>
            <a href="https://www.instagram.com/webfandoh/" className={styles.footerLink} id={styles.instagram}>
              <Image src={instagramLogo.src} alt="Ícone Instagram" width={35} height={35} />
            </a>
            <a href="#" className={styles.footerLink} id={styles.twitter}>
              <Image src={twitterLogo.src} alt="Ícone Twitter X" width={40} height={40} />
            </a>
            <a href="#" className={styles.footerLink} id={styles.tiktok}>
              <Image src={tiktokLogo.src} alt="Ícone TikTok" width={40} height={40} />
            </a>
          </div>
        </div>

        
        <ul className={styles.footerList}>
          <li>
            <h3>Plataforma</h3>
          </li>
          <li>
            <a href="mailto:contato@webfandoh.com" className={styles.footerLink}>Contato</a>
          </li>
          <li>
            <a href="mailto:contato@webfandoh.com" className={styles.footerLink}>Suporte</a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>Termos de uso</a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>Política de Privacidade</a>
          </li>
        </ul>

        <ul className={styles.footerList}>
          <li>
            <h3>Publicidade/Marketing</h3>
          </li>
          <li>
            <a href="mailto:contato@webfandoh.com" className={styles.footerLink}>Contato</a>
          </li>
        </ul>
      </div>
      <div id="footer_copyright" className={styles.footerCopyright}>
        &#169; Copyright © 2024 WebFandoh.
      </div>
      <div id="footer_copyright" className={styles.footerCopyright}>
        &#169; Copyright © 2024 WebFandoh.
      </div>

    </footer>
  );
};
