'use strict';
import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
let formData = {
  email: ' ',
  message: ' ',
};
//tworzenie obiektu na podstawie danych z formularza z odstepem czasowym
const savedInputTrottle = event => {
  const {
    elements: { email, message },
  } = form;

  formData = {
    email: email.value,
    message: message.value,
  };
  console.log(formData);

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};
//po przeładowaniu strony elementy formularza odbieraja wartosci z localStorage
const siteReload = () => {
  const {
    elements: { email, message },
  } = form;

  const savedInformation = localStorage.getItem('feedback-form-state');

  try {
    const parsedInformation = JSON.parse(savedInformation);
    if (parsedInformation === null) {
      return;
    } else {
      email.value = parsedInformation.email;
      message.value = parsedInformation.message;
    }
  } catch (error) {
    console.log('zapis do local storage:', error.name);
    console.log(error.message);
  }
};

//Funkcja submit ktora sprawdza zawartosc formularza, pobiera informacje z localstorage i wyświetla je w logu
const handlerSubmiter = event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  if (email.value === '' && message.value === '') {
    alert('Należy podać wiadomość i email');
  } else {
    const savedInformation = localStorage.getItem('feedback-form-state');
    try {
      const parsedInformation = JSON.parse(savedInformation);
      console.log('Obiekt danych formularza: ', parsedInformation);
      event.currentTarget.reset();
      localStorage.removeItem('feedback-form-state');
    } catch (error) {
      console.log('zapis do consoli:', error.name);
      console.log(error.message);
    }
  }
};

form.addEventListener('input', throttle(savedInputTrottle, 500));
form.addEventListener('submit', handlerSubmiter);
window.addEventListener('load', siteReload);
