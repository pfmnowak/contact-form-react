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

describe("EmailInput component", () => {
  it("doesn't display an error when entering a valid email", () => {
    renderComponent();
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });

    userEvent.click(emailInput);
    userEvent.keyboard("test1234@email.com");

    const emailInputError = screen.queryByText(/provide a valid email/i);
    expect(emailInputError).not.toBeInTheDocument();
  });

  it("displays an error when entering an email without '@' symbol", () => {
    renderComponent();
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });

    userEvent.click(emailInput);
    userEvent.keyboard("test1234.email.com");

    const emailInputError = screen.getByText(/provide a valid email/i);
    expect(emailInputError).toBeInTheDocument();
  });

  it("displays an error when entering an email with invalid characters", () => {
    renderComponent();
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });

    userEvent.click(emailInput);
    userEvent.keyboard("te#$%^&st@email.com");

    const emailInputError = screen.getByText(/provide a valid email/i);
    expect(emailInputError).toBeInTheDocument();
  });

  it("displays an error when entering an email with invalid domain", () => {
    renderComponent();
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });

    userEvent.click(emailInput);
    userEvent.keyboard("test@email.comcom");

    const emailInputError = screen.getByText(/provide a valid email/i);
    expect(emailInputError).toBeInTheDocument();
  });
});
