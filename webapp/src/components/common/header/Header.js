import React, { useState } from "react";
import style from "./Header.module.scss";
import { navLinks } from "../../../constants";
import DesktopLogo from "../../../assets/img/fwdlogo/logo.png";
import MobileLogo from "../../../assets/img/mobile_logo.png";
import Menu from "../../../assets/img/menu.svg";
import SideBar from "./side-bar/SideBar";
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import Auth from "../../auth";
import { connect } from "react-redux";
import { compose } from "redux";
import userIcon from "../../../assets/img/user_icon.svg";
import { withTranslation } from "react-i18next";
import { logOutUser } from "../../../redux/reducers/auth";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";

const SINGLE_PAGE_ROUTES = ["price", "service"];

const Header = ({ auth, logOutUser, t }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const onCloseSideBar = () => {
    setOpenMenu(false);
  };

  const onClose = () => {
    setOpenModal(false);
  };

  const logOutHandler = () => {
    logOutUser();
    setShowDropDown(!showDropDown);
    history.push("/");
  };

  const scroll = (link) => {
    const element = document.getElementById(
      `bukmarkz-home-${link.key === "service" ? "services" : "price"}`
    );
    element.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const onNavClick = (link, isMobile = false) => {
    if (history.location.pathname !== "/") {
      history.push("/");
      setTimeout(() => {
        scroll(link);
        isMobile && onCloseSideBar();
      }, 500);
    } else {
      scroll(link);
      isMobile && onCloseSideBar();
    }
  };

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  console.log("USER", auth);

  return (
    <header className={style.headerWrapper}>
      <div className={style.container}>
        <div className={style.menuBar}>
          <img
            src={Menu}
            onClick={() => setOpenMenu(true)}
            alt={"menu"}
            width={35}
            height={35}
          />
        </div>
        <div className={style.logo}>
          <Link to={"/"} onClick={scrollToTop}>
            <img
              className={style.desktopLogo}
              src={DesktopLogo}
              alt={"bukmarz-logo"}
            />
            <img
              className={style.mobileLogo}
              src={MobileLogo}
              alt={"bukmarz-logo"}
            />
          </Link>
          <div className={style.languageContainer}>
            <LanguageSwitcher />
          </div>
        </div>
        <div className={style.navLinks}>
          <nav>
            <ul>
              {navLinks.map((link) => {
                if (SINGLE_PAGE_ROUTES.includes(link.key)) {
                  return (
                    <li
                      onClick={() => onNavClick(link)}
                      className={
                        link.link === location?.pathname ? style.active : ""
                      }
                    >
                      {link.displayName}
                    </li>
                  );
                } else {
                  return (
                    <li
                      onClick={onCloseSideBar}
                      className={
                        link.link === location?.pathname ? style.active : ""
                      }
                    >
                      <Link to={link.link}>{link.displayName}</Link>
                    </li>
                  );
                }
              })}
              {!auth.isAuthenticated ? (
                <li>
                  <Link to={"/auth"}>Sign Up/Login</Link>
                </li>
              ) : (
                <li
                  className={
                    "/dashboard" === location?.pathname ? style.active : ""
                  }
                >
                  <Link to={"/dashboard"}>{t("nav.dashboard")}</Link>
                </li>
              )}
            </ul>
            {auth.isAuthenticated ? (
              <div className={style.userIcon}>
                <img
                  src={userIcon}
                  onClick={() => setShowDropDown(!showDropDown)}
                  alt={"user-icon"}
                  width={30}
                  height={30}
                />
                {showDropDown ? (
                  <>
                    <div
                      className={style.mask}
                      onClick={() => setShowDropDown(!showDropDown)}
                    />
                    <div className={style.dropDown}>
                      <ul>
                        <li>
                          <Link
                            to={"/profile?tab=profile"}
                            onClick={() => setShowDropDown(!showDropDown)}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <a href={"#"} onClick={logOutHandler}>
                            {t("nav.sign_out")}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : null}
              </div>
            ) : null}
          </nav>
        </div>
      </div>
      {openMenu ? (
        <SideBar onClose={onCloseSideBar}>
          <div className={style.mobileNavLinks}>
            <ul>
              {navLinks.map((link) => {
                if (SINGLE_PAGE_ROUTES.includes(link.key)) {
                  return (
                    <li
                      onClick={() => onNavClick(link, true)}
                      className={
                        link.link === location?.pathname ? style.active : ""
                      }
                    >
                      {link.displayName}
                    </li>
                  );
                } else {
                  return (
                    <li
                      onClick={onCloseSideBar}
                      className={
                        link.link === location?.pathname ? style.active : ""
                      }
                    >
                      <Link to={link.link}>{link.displayName}</Link>
                    </li>
                  );
                }
              })}
              {!auth.isAuthenticated ? (
                <li onClick={onCloseSideBar}>
                  <Link to={"/auth"}>{t("nav.signup_login")}</Link>
                </li>
              ) : (
                <li onClick={onCloseSideBar}>
                  <Link to={"/dashboard"}>{t("nav.dashboard")}</Link>
                </li>
              )}
            </ul>
          </div>
        </SideBar>
      ) : null}
      <Modal openModal={openModal} onClose={onClose}>
        <Auth onClose={onClose} />
      </Modal>
    </header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(
  connect(mapStateToProps, { logOutUser }),
  withRouter,
  withTranslation()
)(Header);
