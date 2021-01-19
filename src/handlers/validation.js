const trimmedBody = (obj) => {
  return Object.keys(obj).reduce((acc, value) => {
    acc[value] = obj[value].trim();
    return acc;
  }, {});
};

const isAllEmpty = (firstname, lastname, email, password) => {
  if (firstname === "" && lastname === "" && email === "" && password === "")
    return true;
};

const isAlphabetOnly = (value) => {
  const regx = /^[A-Za-z]+$/;
  if (value.match(regx)) {
    return true;
  }
};

const isLengthValid = (value) => {
  const len = value.length;
  if (len >= 2 && len <= 10) {
    return true;
  }
};

const isValidMail = (value) => {
  const regx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (value.match(regx)) {
    return true;
  }
};

const isValidPassword = (value) => {
  const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (value.match(regx)) {
    return true;
  }
};

module.exports = {
  trimmedBody,
  isAllEmpty,
  isAlphabetOnly,
  isLengthValid,
  isValidMail,
  isValidPassword,
};
