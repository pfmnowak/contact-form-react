import { IntlProvider } from "react-intl";
import "./App.scss";
import { LOCALES } from "./i18n/locales";
import { messages } from "./i18n/messages";
import ContactPage from "./pages/ContactPage";

function App() {
  const locale = LOCALES.ENGLISH;
  // const locale = LOCALES.POLISH;

  return (
    <div className="App">
      <IntlProvider
        messages={messages[locale]}
        locale={locale}
        defaultLocale={LOCALES.ENGLISH}
      >
        <ContactPage />
      </IntlProvider>
    </div>
  );
}

export default App;
