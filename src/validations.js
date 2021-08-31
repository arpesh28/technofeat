export const validateLogin = ({email, password}) => {
  if (email.length == 0) {
    var message;
    return ('Email cannot be empty');
  } else if (password.length == 0) {
    return ('Password cannot be empty');
  } else if (!validateEmail(email)) {
    return ( 'Please enter a valid Email Address');
  } else if (password.length < 5) {
    return ( 'Password must be at least 5 characters');
  }
  return true;
};

export const validateEmail = email => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateCal = (num1, num2, value) => {
  if (num1.length == 0 || num2.length == 0) {
    return 'Inputs cannot be empty';
  } else if (value.length == 0) {
    return 'Please select an operator!';
  } else if (!Number.isInteger(parseInt(num1))) {
    return 'Input must be an Integer';
  } else if (!Number.isInteger(parseInt(num2))) {
    return 'Input must be an Integer';
  }
  return true;
};
