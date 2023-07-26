export const validateEmail = (email) => {
  if (email.length < 1) throw new Error('No email supplied');

  const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

  if (regex.test(email)) {
    return true;
  } else {
    throw new Error('Email does not match required format');
  }
};

export const validatePassword = (password) => {
  if (password.length < 6)
    throw new Error('Password must meet minimum length of 6 characters');

  return true;
};
