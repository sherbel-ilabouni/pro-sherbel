setTimeout(function () {
  document.getElementById("popup-contact").style.display = "block";
}, 15000); // הצגת הטופס לאחר 15 שניות

document.getElementById("close-popup").addEventListener("click", function () {
  document.getElementById("popup-contact").style.display = "none";
});
