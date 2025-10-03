// 3D tilt effect on mouse movement
document.querySelectorAll(".custom-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const { offsetWidth: width, offsetHeight: height } = card;
    const { offsetX: x, offsetY: y } = e;

    const rotateX = ((y / height) - 0.5) * 15; 
    const rotateY = ((x / width) - 0.5) * -15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});
// Scene, Camera, Renderer
