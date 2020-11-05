const card = document.querySelector(".card");
const container = document.querySelector(".container");

container.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = e.pageX - centerX;
  const deltaY = e.pageY - centerY;
  const rotateY = deltaX / 15;
  const rotateX = -deltaY / 15;

  const shadowY = 25 - (deltaY + 210) / 42; // ~ 15 -> 25

  card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  card.style.boxShadow = `0 ${shadowY}px 20px rgba(0, 0, 0, 0.2), 0 0 50px rgba(0, 0, 0, 0.2)`;
});

container.addEventListener("mouseenter", () => {
  card.style.transition = "none";
});

container.addEventListener("mouseleave", () => {
  card.style.transition = "all 0.5s ease";
  card.style.transform = "rotateY(0) rotateX(0)";
  card.style.boxShadow =
    "0 20px 20px rgba(0, 0, 0, 0.2), 0 0 50px rgba(0, 0, 0, 0.2)";
});
