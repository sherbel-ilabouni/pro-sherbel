function addElement() {
  const elementType = document.getElementById("elementType").value || "div";
  const width = document.getElementById("width").value || "150px";
  const height = document.getElementById("height").value || "150px";
  const content = document.getElementById("content").value;
  const bgColor = document.getElementById("bgColor").value;
  const fontSize = document.getElementById("fontSize").value || "16px";
  const fontColor = document.getElementById("fontColor").value;

  const newElement = document.createElement(elementType);
  newElement.className = "element";
  newElement.style.width = width;
  newElement.style.height = height;
  newElement.style.backgroundColor = bgColor;
  newElement.style.color = fontColor;
  newElement.style.fontSize = fontSize;
  newElement.style.borderRadius = "10px";
  newElement.style.display = "flex";
  newElement.style.alignItems = "center";
  newElement.style.justifyContent = "center";
  newElement.style.padding = "10px";
  newElement.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  newElement.innerText = content;

  document.getElementById("displayArea").appendChild(newElement);

  // Reset form
  resetForm();
}

function resetForm() {
  const inputs = document.querySelectorAll(
    'input:not([type="color"]), textarea'
  );
  inputs.forEach((input) => (input.value = ""));
}

function saveLayout() {
  // כאן תוכל להוסיף לוגיקה לשמירת המסך
  alert("המסך נשמר בהצלחה!");
}
