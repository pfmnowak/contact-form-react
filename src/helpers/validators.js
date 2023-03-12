export const validateName = (name) =>
  /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]{2,30}$/.test(name);

export const validateEmail = (email) =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);

export const validatePassword = (password) => /^[^-\s]{8,30}$/.test(password);
