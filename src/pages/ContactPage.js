import { FormattedMessage } from "react-intl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactForm from "../components/ContactForm";
import { useAddNewContactMutation } from "../services/contacts";
import classes from "./ContactPage.module.scss";

const ContactPage = () => {
  const [addNewContact] = useAddNewContactMutation();

  const showSuccessToastMessage = () => {
    toast.success(<FormattedMessage id="toast_success" />, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showErrorToastMessage = () => {
    toast.error(<FormattedMessage id="toast_error" />, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const formSubmitHandler = async (formData) => {
    const result = await addNewContact(formData);
    if (result.data) {
      showSuccessToastMessage();
    }
    if (result.error) {
      showErrorToastMessage();
    }
  };

  return (
    <main className={classes["contact-page"]}>
      <header>
        <h1 className={classes["contact-page__header"]}>
          <FormattedMessage id="contact_page_header" />
        </h1>
      </header>
      <ContactForm onFormSubmit={formSubmitHandler} />
      <ToastContainer />
    </main>
  );
};

export default ContactPage;
