import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { LOCALES } from "../i18n/locales";
import { messages } from "../i18n/messages";
import ContactForm from "./ContactForm";

async function renderComponent() {
  render(
    <IntlProvider
      messages={messages[LOCALES.ENGLISH]}
      locale={LOCALES.ENGLISH}
      defaultLocale={LOCALES.ENGLISH}
    >
      <ContactForm />
    </IntlProvider>
  );
  await screen.findByRole("button", {
    name: /submit/i,
  });
}

describe("FirstNameInput component", () => {
  it("doesn't display an error when entering lowercase and uppercase characters", () => {
    renderComponent();
    const nameInput = screen.getByRole("textbox", {
      name: /first name/i,
    });

    userEvent.click(nameInput);
    userEvent.keyboard("testName");

    const nameInputError = screen.queryByText(/provide a valid name/i);
    expect(nameInputError).not.toBeInTheDocument();
  });

  it("displays an error when entering numbers", () => {
    renderComponent();
    const nameInput = screen.getByRole("textbox", {
      name: /first name/i,
    });

    userEvent.click(nameInput);
    userEvent.keyboard("TestName1234");

    const nameInputError = screen.getByText(/provide a valid name/i);
    expect(nameInputError).toBeInTheDocument();
  });

  it("displays an error when entering other non-letter signs", () => {
    renderComponent();
    const nameInput = screen.getByRole("textbox", {
      name: /first name/i,
    });

    userEvent.click(nameInput);
    userEvent.keyboard("&");

    const nameInputError = screen.getByText(/provide a valid name/i);
    expect(nameInputError).toBeInTheDocument();
  });
});
