import '/assets/css/form.css'

const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const buttonSign = document.querySelector('.button-sign');
const form = document.querySelector('form');
let isError = true;

function errorEmptyInput(div) {
  const inputError = document.createElement('div');
  inputError.className = 'error-message';
  inputError.textContent = 'required';
  div.parentNode.insertBefore(inputError, div);
}

function checkFirstName() {
  const firstNameValue = firstName.value.trim();
  if (!firstNameValue){
    errorEmptyInput(firstName);
   }
}

function checkLastName() {
  const lastNameValue = lastName.value.trim();
  if (!lastNameValue){
    errorEmptyInput(lastName);
  }
}

function emailIsValid (email) {
  return /\S+@\S+\.\S+/.test(email)
}

function checkEmailValue() {
  const emailValue = email.value.trim();
  if (!emailValue){
    errorEmptyInput(email);
  }
  let check = emailIsValid(emailValue);
  console.log(check);
}

function checkPassword() {
  const passwordValue = password.value.trim();
  if (!passwordValue){
    errorEmptyInput(password);
  }
}

function handleSignButton(e) {
  checkFirstName();
  checkLastName();
  checkEmailValue();
  checkPassword();
  e.preventDefault();

}

buttonSign.addEventListener('click', handleSignButton);
