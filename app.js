const container = document.querySelector(".container");
const card = document.querySelector(".card");
const cardFront = document.querySelector(".card-front");
const cardBack = document.querySelector(".card-back");
const flipButton = document.querySelector(".flip-btn");

const name = document.querySelector(".name");
const profession = document.querySelector(".profession");
const contacts = document.querySelector(".contacts");
const footer = document.querySelector(".footer");

const logo = document.querySelector(".logo");
const amp = document.querySelector(".amp");

let touchEndTimer;

const mouseMove = (e) => {
  let touch;
  if (e.changedTouches) {
    touch = e.changedTouches[0];
  }

  const isFlipped = card.classList.contains("is-flipped");

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = (e.pageX || touch.pageX) - centerX;
  const deltaY = (e.pageY || touch.pageY) - centerY;
  const rotateY = (isFlipped ? 180 : 0) + deltaX / 15;
  const rotateX = ((isFlipped ? 1 : -1) * deltaY) / 15;

  const shadowY = 25 - (deltaY + 210) / 42; // ~ 15 -> 25

  card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  card.style.boxShadow = `0 ${shadowY}px 20px rgba(0, 0, 0, 0.2), 0 0 50px rgba(0, 0, 0, 0.2)`;
};

const mouseEnter = () => {
  card.style.transition = "none";

  name.style.transform = "translateZ(50px)";
  profession.style.transform = "translateZ(30px)";
  contacts.style.transform = "translateZ(40px)";
  footer.style.transform = "translateZ(20px)";

  logo.style.transform = "translateZ(40px)";
  amp.style.transform = "translateZ(60px)";
};

const mouseLeave = () => {
  const isFlipped = card.classList.contains("is-flipped");

  card.style.transition = "all 0.5s ease";
  card.style.transform = null; // `rotateY(${isFlipped ? 180 : 0}deg) rotateX(0)`;
  card.style.boxShadow =
    "0 20px 20px rgba(0, 0, 0, 0.2), 0 0 50px rgba(0, 0, 0, 0.2)";

  name.style.transform = "translateZ(0)";
  profession.style.transform = "translateZ(0)";
  contacts.style.transform = "translateZ(0)";
  footer.style.transform = "translateZ(0)";

  logo.style.transform = "translateZ(0)";
  amp.style.transform = "translateZ(0)";
};

const flipCard = () => {
  card.style.transition = "all 0.5s ease";
  card.classList.toggle("is-flipped");
  setTimeout(() => {
    card.style.transition = "none";
  }, 500);
};

flipButton.addEventListener("click", flipCard);

container.addEventListener("mousemove", mouseMove);
container.addEventListener("mouseenter", mouseEnter);
container.addEventListener("mouseleave", mouseLeave);

container.addEventListener("touchmove", mouseMove, {passive: true});
container.addEventListener(
  "touchstart",
  () => {
    mouseEnter();
    clearTimeout(touchEndTimer);
  },
  {passive: true}
);
container.addEventListener(
  "touchend",
  () => {
    mouseLeave();
    touchEndTimer = setTimeout(mouseLeave, 200);
  },
  {passive: true}
);
