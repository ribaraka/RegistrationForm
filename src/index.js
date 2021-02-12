import '/assets/css/form.css'

const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const buttonSign = document.querySelector('.button-sign');
const form = document.querySelector('form');
let isError = true;
// const inputError = document.createElement('div');
// inputError.className = 'error-message';

function createError(div) {
  const inputError = document.createElement('div');
  inputError.className = 'error-message';
  inputError.textContent = 'required';
  div.parentNode.insertBefore(inputError, div);
}

function checkFirstName() {
  const firstNameValue = firstName.value.trim();
  if (!firstNameValue){
    createError(firstName);
   }
}

function checkLastName() {
  const lastNameValue = lastName.value.trim();
  if (!lastNameValue){
    createError(lastName);
  }
}

function checkEmailValue() {
  const emailValue = email.value.trim();
  isError = emailValue === '';
}

function checkPassword() {
  const passwordValue = password.value.trim();
  isError = passwordValue === '';
  if (isError) {

  }
}

function handleSignButton(e) {
  checkFirstName();
  checkLastName();
  // checkEmailValue();
  // checkPassword();
  e.preventDefault();

}

buttonSign.addEventListener('click', handleSignButton);

