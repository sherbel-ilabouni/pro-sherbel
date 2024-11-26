setTimeout(function () {
  document.querySelector(".overlay").style.display = "block";
  document.getElementById("popup-contact").style.display = "block";
}, 15000);

document.getElementById("close-popup").addEventListener("click", function () {
  document.querySelector(".overlay").style.display = "none";
  document.getElementById("popup-contact").style.display = "none";
});

// סגירת הפופאפ בלחיצה על המסך הכהה
document.querySelector(".overlay").addEventListener("click", function () {
  document.querySelector(".overlay").style.display = "none";
  document.getElementById("popup-contact").style.display = "none";
});
