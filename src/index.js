import '/assets/css/form.css';
const zxcvbn = require('zxcvbn');
const firstName = document.querySelector('#firstname');
const lastName = document.querySelector('#lastname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordCheck = document.querySelector('#dynamicText');
const button = document.querySelector('#btn-sign');
const Inputs = document.querySelectorAll('.form-control');

function errorInput(input) {
      input.classList.add('is-invalid');
      const inputError = document.createElement('div');
      inputError.classList.add('invalid-feedback');
      input.parentNode.appendChild(inputError);
      return inputError;
}

function validValue(input) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
}

function isEmptyInput() {
  Inputs.forEach(input => {
    input.value.trim();
    if (!input.value && !input.classList.contains('is-invalid')) {
      const inputError = errorInput(input);
      inputError.textContent = 'the form must be filled';
    }
    if (input.value && input.classList.contains('is-invalid')){
      validValue(input);
    }
  });
}

function limitLength() {
  if (firstName.value.length > 3){
    console.log('f');
  }

}

function emailIsValid(email) {
  return /\S+@\S+\.\S+/.test(email)
}

function checkEmailValue() {
  const emailValue = email.value.trim();
  if (!emailValue || !emailIsValid(emailValue)) {
    let error = errorInput(email);
    error.textContent = 'email is invalid';
  }
}

function checkPassword() {
  const passwordValue = password.value.trim();
  if (!passwordValue || passwordValue.length > 64 || passwordValue.length < 8) {
    let error = errorInput(password);
    error.textContent = 'the form must be filled';
  }
}

// $('#password').keyup(function() {
//   const passwordValue = password.value.trim();
//   console.log(commentScore(passwordValue));
// let text = commentScore(zxcvbn(passwordValue).score);
// $(passwordCheck).text(text);
// });

function handleSignUp(e) {
  isEmptyInput();
  // checkEmailValue();
  // checkPassword();
  limitLength();
}


function commentScore(password) {
  let text = zxcvbn(password).score;
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


button.addEventListener('click', handleSignUp);
