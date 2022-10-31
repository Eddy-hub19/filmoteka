const team = document.querySelector('.footer-text__link');
const backdropTeam = document.querySelector('.backdrop-team');
const closeTeam = document.querySelector('.modal-team__button');
const body = document.querySelector('body');
const modalTeam = document.querySelector('.modal-team__container');
const heartIcon = document.querySelector('.footer-text__icon');

const ref = {
  lead: document.querySelector('.js-role-lead'),
  scrum: document.querySelector('.js-role-scrum'),
  developer: document.querySelectorAll('.js-role-developer'),
  mentor: document.querySelector('.js-role-mentor'),

  motko: document.querySelector('.js-name-motko'),
  kuharuk: document.querySelector('.js-name-kuharuk'),
  bielova: document.querySelector('.js-name-bielova'),
  makukha: document.querySelector('.js-name-makukha'),
  solod: document.querySelector('.js-name-solod'),
  sekan: document.querySelector('.js-name-sekan'),
  petlya: document.querySelector('.js-name-petlya'),
  zahorodnia: document.querySelector('.js-name-zahorodnia'),
  yaroshovets: document.querySelector('.js-name-yaroshovets'),
  tsymbaliuk: document.querySelector('.js-name-tsymbaliuk'),  

  imgMotko: document.querySelector('.team__img-js-motko'),
  imgKuharuk: document.querySelector('.team__img-js-kuharuk'),
  imgBielova: document.querySelector('.team__img-js-bielova'),
  imgMakukha: document.querySelector('.team__img-js-makukha'),
  imgSolod: document.querySelector('.team__img-js-solod'),
  imgSekan: document.querySelector('.team__img-js-sekan'),
  imgPetlya: document.querySelector('.team__img-js-petlya'),
  imgZahorodnia: document.querySelector('.team__img-js-zahorodnia'),
  imgYaroshovets: document.querySelector('.team__img-js-yaroshovets'),
  imgTsymbaliuk: document.querySelector('.team__img-js-tsymbaliuk'),
};

team.addEventListener('click', onTeamClick);
closeTeam.addEventListener('click', onCloseTeamClick);
backdropTeam.addEventListener('click', onCloseClickBackdrop);

function onTeamClick(e) {
  e.preventDefault();
  backdropTeam.classList.remove('is-hidden');
  body.classList.add('modal-open');
  modalTeamMarkup();
  heartIcon.classList.remove('animate__heartBeat');

  if (e.target !== e.currentTarget) {
    window.addEventListener('keydown', onEscKeyPress);
    body.classList.add('modal-open');
    backdropTeam.classList.remove('is-hidden');
  }
}

function onCloseTeamClick(e) {
  window.removeEventListener('keydown', onEscKeyPress);
  backdropTeam.classList.add('is-hidden');
  body.classList.remove('modal-open');
  heartIcon.classList.add('animate__heartBeat');
}

function onCloseClickBackdrop(e) {
  if (e.target == e.currentTarget) {
    body.classList.remove('modal-open');
    backdropTeam.classList.add('is-hidden');
  }
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseTeamClick();
    console.log('yup');
  }
}
