import { Form } from "@edx/paragon";
import classes from "./ContactForm.module.scss";

const ContactForm = () => {
  return (
    <Form className={classes["contact-form"]}>
      <Form.Group isInvalid>
        <Form.Label>First Name</Form.Label>
        <Form.Control placeholder="Enter first name" />
        <Form.Control.Feedback>
          Please provide a valid name
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGridEmail" isInvalid>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Control.Feedback>
          Please provide a valid email
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
