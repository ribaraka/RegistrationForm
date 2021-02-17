import '/assets/css/form.css';
const zxcvbn = require('zxcvbn');
import $ from 'jquery';

const firstName = document.querySelector('#firstname');
const lastName = document.querySelector('#lastname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const field = document.querySelector('#form');
const passwordCheck = document.querySelector('#dynamicText');

function errorInput(input) {
  // if(input.classList.contains('is-invalid')){
  //   return ;
  // }
  const inputError = document.createElement('div');
  input.classList.add('is-invalid');
  inputError.classList.add('invalid-feedback');
  input.parentNode.appendChild(inputError);
  return inputError;
}

function checkFirstName() {
  const firstNameValue = firstName.value.trim();
  if (!firstNameValue) {
    let error = errorInput(firstName);
    error.textContent = 'the form must be filled';
  }
}

function checkLastName() {
  const lastNameValue = lastName.value.trim();
  if (!lastNameValue) {
    let error = errorInput(lastName);
    error.textContent = 'the form must be filled';
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
  if (!passwordValue || passwordValue.length > 64 || passwordValue.length < 8){
    let error = errorInput(password);
    error.textContent = 'the form must be filled';
  }
}

$('#password').keyup(function() {
  const passwordValue = password.value.trim();
  let text = commentScore(zxcvbn(passwordValue).score);
  $(passwordCheck).text(text);
});

function handleSignUp(e) {
  // checkFirstName();
  // checkLastName();
  // checkEmailValue();
  checkPassword();
  e.preventDefault();
}

function commentScore(score) {

  return (score === 0) ? 'too guessable: risky password.' :
    (score === 1) ? 'very guessable: protection from throttled online attacks.!' :
      (score === 2) ? 'somewhat guessable: protection from unthrottled online attacks.' :
        (score === 3) ? 'safely unguessable: moderate protection from offline slow-hash scenario.' :
          'very unguessable: strong protection from offline slow-hash scenario.';

  // let text = zxcvbn(value).score + '';
  // switch (text) {
  //   case '0':
  //       text += 'too guessable: risky password.';
  //       break;
  //   case 1:
  //     text = 'very guessable: protection from throttled online attacks.';
  //     break;
  //       case 2:
  //         text = 'somewhat guessable: protection from unthrottled online attacks.';
  //       break;
  //       case 3:
  //         text = 'safely unguessable: moderate protection from offline slow-hash scenario.';
  //       break;
  //       case 4:
  //         text = 'very unguessable: strong protection from offline slow-hash scenario.';
  //       break;
  //   }
}

field.addEventListener('submit', handleSignUp);
