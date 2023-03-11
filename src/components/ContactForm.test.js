import { render, screen } from "@testing-library/react";
import ContactForm from "./ContactForm";

describe("ContactForm component", () => {
  it("displays a name input", () => {
    render(<ContactForm />);
    const nameInput = screen.getByRole("textbox", {
      name: /first name/i,
    });
    expect(nameInput).toBeInTheDocument();
  });

  it("displays an email input", () => {
    render(<ContactForm />);
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    expect(emailInput).toBeInTheDocument();
  });
});
