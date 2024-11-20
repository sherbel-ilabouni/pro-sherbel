document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll(".form-control");

  const validators = {
    fullName: {
      regex: /^[\u0590-\u05FFa-zA-Z\s]{2,30}$/,
      error: "נא להזין שם תקין (2-30 תווים, אותיות בלבד)",
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      error: "נא להזין כתובת אימייל תקינה",
    },
    phoneNumber: {
      regex: /^0[2-9]\d{7,8}$/,
      error: "נא להזין מספר טלפון תקין (9-10 ספרות)",
    },
    message: {
      regex: /.{10,500}/,
      error: "ההודעה חייבת להכיל לפחות 10 תווים",
    },
  };

  inputs.forEach((input, index) => {
    input.style.opacity = "0";
    setTimeout(() => {
      input.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      input.style.opacity = "1";
    }, index * 100);
  });

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      validateField(this);
    });

    input.addEventListener("focus", function () {
      this.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      this.classList.remove("focused");
      validateField(this);
    });
  });

  function validateField(field) {
    const validator = validators[field.id];
    const errorDiv = field.nextElementSibling;

    if (validator && !validator.regex.test(field.value)) {
      field.classList.add("error");

      if (!errorDiv || !errorDiv.classList.contains("error-message")) {
        const error = document.createElement("div");
        error.className = "error-message";
        error.textContent = validator.error;
        field.parentNode.insertBefore(error, field.nextSibling);
      }
      return false;
    } else {
      field.classList.remove("error");
      if (errorDiv && errorDiv.classList.contains("error-message")) {
        errorDiv.remove();
      }
      return true;
    }
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // בדיקת תקינות כל השדות
    let isValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      showMessage("נא לתקן את השגיאות בטופס", "error");
      return;
    }

    const submitBtn = form.querySelector(".btn");
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
      await mockSubmitForm();

      showMessage("ההודעה נשלחה בהצלחה! נחזור אליך בהקדם", "success");
      form.reset();
    } catch (error) {
      showMessage("אירעה שגיאה בשליחת הטופס. נא לנסות שוב", "error");
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  });

  function showMessage(message, type) {
    const existingMessage = document.querySelector(".message-popup");
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageDiv = document.createElement("div");
    messageDiv.className = `message-popup ${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.classList.add("show");
    }, 100);

    setTimeout(() => {
      messageDiv.classList.remove("show");
      setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
  }

  function mockSubmitForm() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  }

  const socialIcons = document.querySelectorAll(".social-media a");
  socialIcons.forEach((icon, index) => {
    icon.style.opacity = "0";
    icon.style.transform = "translateY(20px)";

    setTimeout(() => {
      icon.style.transition = "all 0.3s ease";
      icon.style.opacity = "1";
      icon.style.transform = "translateY(0)";
    }, index * 200);
  });

  const title = document.querySelector(".form h2");
  if (title) {
    title.style.opacity = "0";
    title.style.transform = "translateY(-20px)";

    setTimeout(() => {
      title.style.transition = "all 0.5s ease";
      title.style.opacity = "1";
      title.style.transform = "translateY(0)";
    }, 300);
  }
});

const style = document.createElement("style");
style.textContent = `
    .message-popup {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .message-popup.show {
        opacity: 1;
        transform: translateY(0);
    }

    .message-popup.success {
        background: linear-gradient(45deg, #00b894, #00cec9);
        box-shadow: 0 4px 15px rgba(0, 184, 148, 0.3);
    }

    .message-popup.error {
        background: linear-gradient(45deg, #d63031, #e17055);
        box-shadow: 0 4px 15px rgba(214, 48, 49, 0.3);
    }

    .focused {
        transform: scale(1.02);
    }
`;

document.head.appendChild(style);
