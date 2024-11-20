function showContent(sectionId) {
  // הסרת הקלאס active מכל התכנים
  document.querySelectorAll(".content").forEach((section) => {
    section.classList.remove("active");
  });

  // הוספת הקלאס active לתוכן הנבחר
  document.getElementById(sectionId).classList.add("active");

  // עדכון הלחצן הפעיל בתפריט
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.remove("active");
  });
  document
    .querySelector(`button[onclick="showContent('${sectionId}')"]`)
    .classList.add("active");
}

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

// טעינת התוכן הראשון כברירת מחדל
document.addEventListener("DOMContentLoaded", () => {
  showContent("courses");
});
