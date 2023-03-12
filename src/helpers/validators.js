export const validateName = (name) =>
  /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]{2,30}$/.test(name);

export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
