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

function modalTeamMarkup() {
  const currentLanguage = getLanguageFromLS();
  let langUS = currentLanguage === Movie.language.ENGLISH;
  let teamLead = langUS ? 'Team Lead' : 'Лідер команди';
  let scrumMaster = langUS ? 'Scrum master' : 'Скрам-майстер';
  let developer = langUS ? 'Developer' : 'Розробник';
  let mentor = langUS ? 'Mentor' : 'Ментор';
  let motko = langUS ? 'Andrew Motko' : 'Андрій Мотько';
  let kuharuk = langUS ? 'Olexii Kuharuk' : 'Олексій Кухарук';
  let bielova = langUS ? 'Olena Bielova' : 'Олена Бєлова';
  let makukha = langUS ? 'Yurii Makukha' : 'Юрій Макуха';
  let solod = langUS ? 'Sergii Solod' : 'Сергій Солод';
  let sekan = langUS ? 'Eduard Sekan' : 'Едуард Секан';
  let petlya = langUS ? 'Ivan Petlya' : 'Іван Петля';
  let zahorodnia = langUS ? 'Viktoria Zahorodnia' : 'Вікторія Загородня';
  let yaroshovets = langUS ? 'Olexandr Yaroshovets' : 'Олександр Ярошовець';
  let tsymbaliuk = langUS ? 'Olexandr Tsymbaliuk' : 'Олександр Цимбалюк';
  let photoWith = langUS ? 'photo with' : 'на фото';

  ref.lead.textContent = teamLead;
  ref.scrum.textContent = scrumMaster;
  ref.mentor.textContent = mentor;
  ref.motko.textContent = motko;
  ref.kuharuk.textContent = kuharuk;
  ref.bielova.textContent = bielova;
  ref.makukha.textContent = makukha;
  ref.solod.textContent = solod;
  ref.sekan.textContent = sekan;
  ref.petlya.textContent = petlya;
  ref.zahorodnia.textContent = zahorodnia;
  ref.yaroshovets.textContent = yaroshovets;
  ref.tsymbaliuk.textContent = tsymbaliuk;
  ref.developer.forEach(item => {
    item.textContent = developer;
  });
  ref.imgmotko.alt = `${photoWith} ${motko}`;
  ref.imgkuharuk.alt = `${photoWith} ${kuharuk}`;
  ref.imgbielova.alt = `${photoWith} ${bielova}`;
  ref.imgmakukha.alt = `${photoWith} ${makukha}`;
  ref.imgsolod.alt = `${photoWith} ${solod}`;
  ref.imgsekan.alt = `${photoWith} ${sekan}`;
  ref.imgpetlya.alt = `${photoWith} ${petlya}`;
  ref.imgzahorodnia.alt = `${photoWith} ${zahorodnia}`;
  ref.imgyaroshovets.alt = `${photoWith} ${yaroshovets}`;
  ref.imgtsymbaliuk.alt = `${photoWith} ${tsymbaliuk}`;
}
