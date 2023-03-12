import { Form } from "@edx/paragon";
import { FormattedMessage, useIntl } from "react-intl";
import { validateName } from "../helpers/validators";

const FirstNameInput = ({ inputRef, isValid, setValid }) => {
  const intl = useIntl();

  const firstNameChangeHandler = (event) => {
    const name = event.target.value.trim();
    if (!validateName(name)) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  return (
    <Form.Group isInvalid={!isValid}>
      <Form.Label>
        <FormattedMessage id="first_name_label" />
      </Form.Label>
      <Form.Control
        ref={inputRef}
        onChange={firstNameChangeHandler}
        placeholder={intl.messages.first_name_placeholder}
      />
      {!isValid && (
        <Form.Control.Feedback>
          <FormattedMessage id="first_name_error" />
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FirstNameInput;
