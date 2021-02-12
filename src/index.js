import './assets/css/form.css';

const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const buttonSign = document.querySelector('.sign');
const form = document.querySelector('form');
let isError = true;

function handleSignUp(e) {
  if (isError){
    e.preventDefault();
  }
}

form.addEventListener('submit', handleSignUp);
