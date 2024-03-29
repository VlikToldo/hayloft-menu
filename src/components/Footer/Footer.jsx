import style from './footer.module.scss';

import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        <div className="footer-address">
          <NavLink to={"/"} className={style.footerLogoMobile}>
            Hay<span className={style.spanWight}>Loft</span>
          </NavLink>
          <address className={style.footerAddressContainer}>
            <ul className={style.footerAddressList}>
              <li className={style.footerAddressItem}>
                <NavLink
                to={"/"}
                  // href="https://goo.gl/maps/L3SfGArejfsZdyfL7"
                  //   target="_blank"
                  // rel="noopener noreferrer"
                  className={style.footerAddressMapsLink}
                >
                  м.Київ, пр-т Академіка Глушкова, 1
                </NavLink>
              </li>
              <li className={style.footerAddressItem}>
                <NavLink
                to={"/"}
                //   href="tell:+380991111111"
                  className={style.footerAddressLink}
                >
                  +38 099 111 11 11
                </NavLink>
              </li>
            </ul>
          </address>
        </div>
        {/* <div class="footer-social">
          <h3 class="footer-social__title">Присоединяйтесь</h3>
          <ul class="footer-social-list">
            <li class="footer-social__item">
              <a href="" class="footer-social__link link">
                <svg class="footer-social__icon" width="20" height="20">
                  <use href="./images/symbol-defs.svg#icon-instagram"></use>
                </svg>
              </a>
            </li>
            <li class="footer-social__item">
              <a href="" class="footer-social__link link">
                <svg class="footer-social__icon" width="20" height="20">
                  <use href="./images/symbol-defs.svg#icon-twitter"></use>
                </svg>
              </a>
            </li>
            <li class="footer-social__item">
              <a href="" class="footer-social__link link">
                <svg class="footer-social__icon" width="20" height="20">
                  <use href="./images/symbol-defs.svg#icon-facebook"></use>
                </svg>
              </a>
            </li>
            <li class="footer-social__item">
              <a href="" class="footer-social__link link">
                <svg class="footer-social__icon" width="20" height="20">
                  <use href="./images/symbol-defs.svg#icon-linkedin"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
