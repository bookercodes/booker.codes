const nextBtn = document.getElementById("carousel-next-btn");
const prevBtn = document.getElementById("carousel-prev-btn");

nextBtn.addEventListener("click", (e) => {
  const { currentTarget } = e
  const carousel = currentTarget.parentNode;
  const players = carousel.querySelectorAll("iframe");
  for (let i = 0; i < players.length; i++) {
    const player = players[i]
    const _playerStyle = window.getComputedStyle(player);
    if (_playerStyle.display === "block") {
      player.style.display = "none"
      const nextPlayerIndex = i + 1;
      const nextPlayer = players[nextPlayerIndex];
      nextPlayer.style.display = "block";
      prevBtn.disabled = false
      if (nextPlayerIndex === players.length - 1) {
        nextBtn.disabled = true;
      }
      break;
    }
  }
});

prevBtn.addEventListener("click", (e) => {
  const { currentTarget } = e
  const carousel = currentTarget.parentNode
  const players = carousel.querySelectorAll("iframe")
  for (let i = players.length - 1; i >= 0; i--) {
    const player = players[i]
    const _playerStyle = window.getComputedStyle(player);
    if (_playerStyle.display === "block") {
      player.style.display = "none"
      const nextPlayerIndex = i - 1;
      const nextPlayer = players[nextPlayerIndex]
      nextPlayer.style.display = "block"
      nextBtn.disabled = false
      if (nextPlayerIndex === 0) {
        prevBtn.disabled = true
      }
      break
    }
  }
})