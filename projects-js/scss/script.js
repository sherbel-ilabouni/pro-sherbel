function fetchUser() {
  showSpinner();
  fetch("https://randomuser.me/api")
    .then((res) => res.json())
    .then((data) => {
      hideSpinner();
      displayUser(data.results[0]);
    });
}

function displayUser(user) {
  const userDisplay = document.querySelector("#user");

  if (user.gender === "female") {
    document.body.style.backgroundColor = "hotpink";
  } else {
    document.body.style.backgroundColor = "steelBlue";
  }
  userDisplay.innerHTML = `
        <img src='${user.picture.large}' alt='random Image'>
        <p>
            <span>Name:</span>${user.name.first} ${user.name.last}
        </p>
        <p>
            <span>Email:</span>${user.email} 
        </p>
        <p>
            <span>phone:</span>${user.phone} 
        </p>
    `;
}
function showSpinner() {
  document.querySelector(".spinner").style.display = "block";
}
function hideSpinner() {
  document.querySelector(".spinner").style.display = "none";
}

document.querySelector("#generate").addEventListener("click", fetchUser);
fetchUser();
