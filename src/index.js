import '/assets/css/form.css';
const zxcvbn = require('zxcvbn');
const firstName = document.querySelector('#firstname');
const lastName = document.querySelector('#lastname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordCheck = document.querySelector('#dynamicText');
const button = document.querySelector('#btn-sign');
const inputs = document.querySelectorAll('.form-control');

function containsInvalid(input) {
  return input.classList.contains('is-invalid');
}

function errorInput(input) {
  input.classList.add('is-invalid');
  const inputError = document.createElement('div');
  inputError.classList.add('invalid-feedback');
  input.parentNode.appendChild(inputError);
  return inputError;
}

function validateInput(input) {
  if (input.nextElementSibling){
    input.nextElementSibling.remove();
  }
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
}

function isEmptyInput() {
  inputs.forEach(input => {
    input.value.trim();
    if (!input.value && !containsInvalid(input)) {
      const inputError = errorInput(input);
      inputError.textContent = 'the form must be filled';
    }
    if (input.value) {
      validateInput(input);
    }
  });
}

function limitForName(...inputs) {
  for (let input of inputs) {
    if (input.value.length > 5 && !containsInvalid(input)) {
      const inputError = errorInput(input);
      inputError.textContent = 'max 255';
    }
  }
}

function limitLength() {
  limitForName(firstName, lastName);

  if ((password.value.length < 8 || password.value.length > 64) && !containsInvalid(password)){
    const inputError = errorInput(password);
    inputError.textContent = 'password must be between 8 and 64 characters';
  }
}

function emailIsValid(email) {
  return /\S+@\S+\.\S+/.test(email)
}

function checkEmailValue() {
  if (!emailIsValid(email.value) && !containsInvalid(email)) {
    let error = errorInput(email);
    error.textContent = 'E-mail is invalid';
  }
}

function isError() {
  return [...inputs].some(input =>{
     return containsInvalid(input);
  })
}

function handleSignUp() {
  isEmptyInput();
  checkEmailValue();
  limitLength();
  if (!isError()){
    window.location.href = 'result.html';
  }
}

function commentScore(password) {
  let text = zxcvbn(password).score;
  console.log(text);
  switch (text) {
    case 0:
      text = 'too guessable: risky password.';
      break;
    case 1:
      text = 'very guessable: protection from throttled online attacks.';
      break;
    case 2:
      text = 'somewhat guessable: protection from unthrottled online attacks.';
      break;
    case 3:
      text = 'safely unguessable: moderate protection.';
      break;
    case 4:
      text = 'very unguessable: strong protection.';
      break;
  }

  return text;
}

function passwordCheckMassage() {
  const passwordValue = password.value.trim();
  passwordCheck.textContent = commentScore(passwordValue);
}

button.addEventListener('click', handleSignUp);
password.addEventListener("keyup", passwordCheckMassage);
