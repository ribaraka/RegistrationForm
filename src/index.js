import '/assets/css/form.css'

const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const buttonSign = document.querySelector('#btn-sup');

function errorInput(div) {
  const inputError = document.createElement('div');
  inputError.className = 'error-message';
  div.parentNode.insertBefore(inputError, div);
  return inputError;
}

function checkFirstName() {
  const firstNameValue = firstName.value.trim();
  if (!firstNameValue){
    errorInput(firstName);
   }
}

function checkLastName() {
  const lastNameValue = lastName.value.trim();
  if (!lastNameValue){
    errorInput(lastName);
  }
}

function emailIsValid (email) {
  return /\S+@\S+\.\S+/.test(email)
}

function checkEmailValue() {
  const emailValue = email.value.trim();
  if (!emailValue || !emailIsValid(emailValue)){
    let error = errorInput(email);
    error.textContent = 'email is invalid';
  }
}

function checkPassword() {
  const passwordValue = password.value.trim();
  if (!passwordValue || passwordValue.length > 64 || passwordValue.length < 8){
    let error = errorInput(password);
    error.textContent =  checkPassStrength(passwordValue);
  }
}

function scorePassword(pass) {
  let score = 0;
  if (!pass)
    return score;

  // award every unique letter until 5 repetitions
  let letters = {};
  for (let i=0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1;
    score += 5.0 / letters[pass[i]];
  }

  // bonus points for mixing it up
  let variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  }

  let variationCount = 0;
  for (let check in variations) {
    variationCount += (variations[check] === true) ? 1 : 0;
  }
  score += (variationCount - 1) * 10;
  console.log(typeof score, 'pass', pass);
  return score;
}

function checkPassStrength(pass) {
  let score = scorePassword(pass);
  if (score > 80)
    return "strong";
  if (score > 60)
    return "good";
  if (score >= 30)
    return "weak";

  return "";
}

function handleSignButton(e) {
  // checkFirstName();
  // checkLastName();
  // checkEmailValue();
  // checkPassword();
  e.preventDefault();
}

buttonSign.addEventListener('click', handleSignButton);
