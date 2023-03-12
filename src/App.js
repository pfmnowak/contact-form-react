import { IntlProvider } from "react-intl";
import "./App.scss";
import ContactForm from "./components/ContactForm";
import { LOCALES } from "./i18n/locales";
import { messages } from "./i18n/messages";

function App() {
  const locale = LOCALES.ENGLISH;
  // const locale = LOCALES.POLISH;

  const formSubmitHandler = (formData) => {
    console.log(formData);
  };

  return (
    <div className="App">
      <IntlProvider
        messages={messages[locale]}
        locale={locale}
        defaultLocale={LOCALES.ENGLISH}
      >
        <header className="App-header">
          <ContactForm onFormSubmit={formSubmitHandler} />
        </header>
      </IntlProvider>
    </div>
  );
}

export default App;
