import { useState } from "react";
import { IntlProvider } from "react-intl";
import "./App.scss";
import Header from "./components/Header";
import { LOCALES } from "./i18n/locales";
import { messages } from "./i18n/messages";
import ContactPage from "./pages/ContactPage";

function App() {
  const getInitialLocal = () => {
    const savedLocale = localStorage.getItem("locale");
    return savedLocale || LOCALES.ENGLISH;
  };

  const [currentLocale, setCurrentLocale] = useState(getInitialLocal());

  const languageChangeHandler = (e) => {
    setCurrentLocale(e.target.value);
    localStorage.setItem("locale", e.target.value);
  };

  return (
    <div className="App">
      <IntlProvider
        messages={messages[currentLocale]}
        locale={currentLocale}
        defaultLocale={LOCALES.ENGLISH}
      >
        <Header
          currentLocale={currentLocale}
          onLanguageChange={languageChangeHandler}
        />
        <div className="App__content">
          <ContactPage />
        </div>
      </IntlProvider>
    </div>
  );
}

export default App;
