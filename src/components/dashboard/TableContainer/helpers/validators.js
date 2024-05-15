const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

export function validateData(values) {
  const {firstName, lastName, email} = values
  return {
    firstName: !validateRequired(firstName)
      ? 'First Name is Required'
      : '',
    lastName: !validateRequired(lastName) ? 'Last Name is Required' : '',
    email: !validateEmail(email) ? 'Incorrect Email Format' : '',
  };
}
