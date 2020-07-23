// eslint-disable-next-line
const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameMinLength = 3;

export const EmailValid = (email) => email && emailRegexp.test(email);

export const PasswordValid = (password) =>
  password && password.trim().length > 5;

export const PasswordsMatch = (password, confirmPassword) =>
  password && confirmPassword && password === confirmPassword;

export const FirstnameValid = (firstname) =>
  firstname && firstname.trim().length >= nameMinLength;

export const LastnameValid = (lastname) =>
  lastname && lastname.trim().length >= nameMinLength;

export const FieldLengthValid = (field, length) =>
  field && field.trim().length > length;
