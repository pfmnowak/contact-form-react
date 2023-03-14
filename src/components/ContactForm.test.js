import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { LOCALES } from "../i18n/locales";
import { messages } from "../i18n/messages";
import { store } from "../store/store";
import { createServer } from "../test/server";
import ContactForm from "./ContactForm";

function renderComponent() {
  render(
    <Provider store={store}>
      <IntlProvider
        messages={messages[LOCALES.ENGLISH]}
        locale={LOCALES.ENGLISH}
        defaultLocale={LOCALES.ENGLISH}
      >
        <ContactForm />
      </IntlProvider>
    </Provider>
  );
}

async function renderComponentWithMock(mock) {
  render(
    <Provider store={store}>
      <IntlProvider
        messages={messages[LOCALES.ENGLISH]}
        locale={LOCALES.ENGLISH}
        defaultLocale={LOCALES.ENGLISH}
      >
        <ContactForm onFormSubmit={mock} />
      </IntlProvider>
    </Provider>
  );
  await screen.findByRole("option", { name: /poland/i });
}

describe("ContactForm component", () => {
  createServer([
    {
      path: "https://restcountries.com/v3.1/all",
      res: () => {
        return [
          { name: { common: "Cambodia" } },
          { name: { common: "Poland" } },
          { name: { common: "England" } },
          { name: { common: "France" } },
        ];
      },
    },
  ]);

  it("renders a name input", () => {
    renderComponent();
    const nameInput = screen.getByRole("textbox", {
      name: /first name/i,
    });
    expect(nameInput).toBeInTheDocument();
  });

  it("renders a last name input", () => {
    renderComponent();
    const lastNameInput = screen.getByRole("textbox", {
      name: /last name/i,
    });
    expect(lastNameInput).toBeInTheDocument();
  });

  it("renders an email input", () => {
    renderComponent();
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    expect(emailInput).toBeInTheDocument();
  });

  it("renders a password input", () => {
    renderComponent();
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it("renders a country select", () => {
    renderComponent();
    const countrySelect = screen.getByRole("combobox", {
      name: /country/i,
    });
    expect(countrySelect).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    renderComponent();
    const submitButton = screen.getByRole("button", {
      name: /submit/i,
    });
    expect(submitButton).toBeInTheDocument();
  });

  it("calls onUserAdd when valid form is submitted", async () => {
    const mock = jest.fn();
    renderComponentWithMock(mock);

    const nameInput = screen.getByRole("textbox", {
      name: /first name/i,
    });
    const lastNameInput = screen.getByRole("textbox", {
      name: /last name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const countrySelect = screen.getByRole("combobox", {
      name: /country/i,
    });
    const testOption = await screen.findByRole("option", { name: /poland/i });

    userEvent.click(nameInput);
    userEvent.keyboard("Roman");

    userEvent.click(lastNameInput);
    userEvent.keyboard("Romanowski");

    userEvent.click(emailInput);
    userEvent.keyboard("roman@gmail.com");

    userEvent.click(passwordInput);
    userEvent.keyboard("qweRTY123$%^&*");

    userEvent.selectOptions(countrySelect, testOption);

    const submitButton = screen.getByRole("button", {
      name: /submit/i,
    });
    userEvent.click(submitButton);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toBeCalledWith({
      firstName: "Roman",
      lastName: "Romanowski",
      email: "roman@gmail.com",
      password: "qweRTY123$%^&*",
      country: "Poland",
    });
  });

  it("doesn't submit invalid form", async () => {
    const mock = jest.fn();
    renderComponentWithMock(mock);

    const nameInput = screen.getByRole("textbox", {
      name: /first name/i,
    });
    const lastNameInput = screen.getByRole("textbox", {
      name: /last name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const countrySelect = screen.getByRole("combobox", {
      name: /country/i,
    });
    const testOption = await screen.findByRole("option", { name: /poland/i });

    userEvent.click(nameInput);
    userEvent.keyboard("Roman123");

    userEvent.click(lastNameInput);
    userEvent.keyboard("Romanowski");

    userEvent.click(emailInput);
    userEvent.keyboard("roman@gmail.com");

    userEvent.click(passwordInput);
    userEvent.keyboard("qweRTY123$%^&*");

    userEvent.selectOptions(countrySelect, testOption);

    const submitButton = screen.getByRole("button", {
      name: /submit/i,
    });
    userEvent.click(submitButton);

    expect(mock).toHaveBeenCalledTimes(0);
  });

  it("doesn't submit the form when inputs are empty", async () => {
    const mock = jest.fn();
    renderComponentWithMock(mock);

    const submitButton = await screen.findByRole("button", {
      name: /submit/i,
    });
    userEvent.click(submitButton);

    expect(mock).toHaveBeenCalledTimes(0);
  });

  it("clears the inputs when the form is submitted", async () => {
    renderComponentWithMock(() => {});

    const nameInput = screen.getByRole("textbox", {
      name: /first name/i,
    });
    const lastNameInput = screen.getByRole("textbox", {
      name: /last name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const countrySelect = screen.getByRole("combobox", {
      name: /country/i,
    });
    const testOption = await screen.findByRole("option", { name: /poland/i });

    userEvent.click(nameInput);
    userEvent.keyboard("Roman");

    userEvent.click(lastNameInput);
    userEvent.keyboard("Romanowski");

    userEvent.click(emailInput);
    userEvent.keyboard("roman@gmail.com");

    userEvent.click(passwordInput);
    userEvent.keyboard("qweRTY123$%^&*");

    userEvent.selectOptions(countrySelect, testOption);

    const submitButton = screen.getByRole("button", {
      name: /submit/i,
    });
    userEvent.click(submitButton);

    expect(nameInput).toHaveValue("");
    expect(lastNameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(countrySelect).toHaveValue("");
  });
});
