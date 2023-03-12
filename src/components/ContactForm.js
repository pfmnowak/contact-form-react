import { Form } from "@edx/paragon";
import { FormattedMessage, useIntl } from "react-intl";
import classes from "./ContactForm.module.scss";

const ContactForm = () => {
  const intl = useIntl();
  return (
    <Form className={classes["contact-form"]}>
      <Form.Group isInvalid>
        <Form.Label>
          <FormattedMessage id="first_name_label" />
        </Form.Label>
        <Form.Control placeholder={intl.messages.first_name_placeholder} />
        <Form.Control.Feedback>
          <FormattedMessage id="first_name_error" />
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGridEmail" isInvalid>
        <Form.Label>
          <FormattedMessage id="email_label" />
        </Form.Label>
        <Form.Control
          type="email"
          placeholder={intl.messages.email_placeholder}
        />
        <Form.Control.Feedback>
          <FormattedMessage id="email_error" />
        </Form.Control.Feedback>
      </Form.Group>

      {/*
        first-name
        last-name
        email
        password
        country-select
      */}

      {/* <Button variant="primary" type="submit">
        Submit
      </Button> */}
    </Form>
  );
};

export default ContactForm;
