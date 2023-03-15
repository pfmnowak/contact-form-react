import { FormattedMessage } from "react-intl";
import ContactForm from "../components/ContactForm";
import classes from "./ContactPage.module.scss";

const ContactPage = () => {
  const formSubmitHandler = (formData) => {
    console.log(formData);
  };

  return (
    <main className={classes["contact-page"]}>
      <header>
        <h1 className={classes["contact-page__header"]}>
          <FormattedMessage id="contact_page_header" />
        </h1>
      </header>
      <ContactForm onFormSubmit={formSubmitHandler} />
    </main>
  );
};

export default ContactPage;
