const card = document.querySelector(".card");
const container = document.querySelector(".container");

const name = document.querySelector(".name");
const profession = document.querySelector(".profession");
const contacts = document.querySelector(".contacts");
const footer = document.querySelector(".footer");

let touchEndTimer;

const mouseMove = (e) => {
  let touch;
  if (e.changedTouches) {
    touch = e.changedTouches[0];
  }

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = (e.pageX || touch.pageX) - centerX;
  const deltaY = (e.pageY || touch.pageY) - centerY;
  const rotateY = deltaX / 15;
  const rotateX = -deltaY / 15;

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
};

const mouseLeave = () => {
  card.style.transition = "all 0.5s ease";
  card.style.transform = "rotateY(0) rotateX(0)";
  card.style.boxShadow =
    "0 20px 20px rgba(0, 0, 0, 0.2), 0 0 50px rgba(0, 0, 0, 0.2)";

  name.style.transform = "translateZ(0)";
  profession.style.transform = "translateZ(0)";
  contacts.style.transform = "translateZ(0)";
  footer.style.transform = "translateZ(0)";
};

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
