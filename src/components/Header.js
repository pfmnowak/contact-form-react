import { Navbar } from "@edx/paragon";
import { useIntl } from "react-intl";
import { LOCALES } from "../i18n/locales";
import classes from "./Header.module.scss";

const Header = ({ currentLocale, onLanguageChange }) => {
  const intl = useIntl();

  const languages = [
    { name: "English", code: LOCALES.ENGLISH },
    { name: "Polish", code: LOCALES.POLISH },
  ];

  return (
    <Navbar expand="lg" className={classes.header}>
      <Navbar.Brand href="#home">Contact-Form-React</Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar-nav" />
      <Navbar.Collapse id="main-navbar-nav">
        <select
          className={classes["header__menu"]}
          id="language-dropdown"
          title={intl.messages.language}
          onChange={onLanguageChange}
          value={currentLocale}
        >
          {languages.map(({ name, code }) => (
            <option key={name} value={code}>
              {name}
            </option>
          ))}
        </select>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
