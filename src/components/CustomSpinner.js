import { Spinner } from "@edx/paragon";
import { useIntl } from "react-intl";
import classes from "./CustomSpinner.module.scss";

const CustomSpinner = () => {
  const intl = useIntl();

  return (
    <Spinner
      animation="border"
      className={classes.spinner}
      screenReaderText={intl.messages.loading}
    />
  );
};

export default CustomSpinner;
