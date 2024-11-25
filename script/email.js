document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("FLWKm9dNRHcfp1cRn");

  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll(".form-control");
  const submitButton = form.querySelector(".btn");

  const validators = {
    name: {
      regex: /^[\u0590-\u05FFa-zA-Z\s]{2,30}$/,
      error: "נא להזין שם תקין (2-30 תווים, אותיות בלבד)",
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      error: "נא להזין כתובת אימייל תקינה",
    },
    phoneNumber: {
      regex: /^(?:0[23489]|05[0-9])[0-9]{7}$/,
      error: "נא להזין מספר טלפון ישראלי תקין (לדוגמה: 0501234567)",
    },
    message: {
      regex: /.{10,500}/,
      error: "ההודעה חייבת להכיל לפחות 10 תווים",
    },
  };

  inputs.forEach((input) => {
    input.style.opacity = "0";
    setTimeout(() => {
      input.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      input.style.opacity = "1";
    }, 100);

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

  const phoneInput = form.querySelector("#phoneNumber");
  phoneInput.addEventListener("input", function (e) {
    // השאר רק ספרות
    this.value = this.value.replace(/[^\d]/g, "");
    validateField(this);
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

  function showMessage(message, type) {
    const existingMessage = document.querySelector(".message-popup");
    if (existingMessage) existingMessage.remove();

    const messageDiv = document.createElement("div");
    messageDiv.className = `message-popup ${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => messageDiv.classList.add("show"), 100);
    setTimeout(() => {
      messageDiv.classList.remove("show");
      setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
  }

  submitButton.addEventListener("click", async function (e) {
    e.preventDefault();

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

    const templateParams = {
      to_name: "sherbel", 
      from_name: form.querySelector("#name").value,
      user_name: form.querySelector("#name").value,
      user_email: form.querySelector("#email").value,
      phoneNumber: form.querySelector("#phoneNumber").value,
      message: form.querySelector("#message").value,
      reply_to: form.querySelector("#email").value,
    };

    submitButton.disabled = true;
    submitButton.textContent = "שולח...";

    try {
      const response = await emailjs.send(
        "service_2snzp35",
        "template_5hlqlqo",
        templateParams
      );

      console.log("SUCCESS!", response.status, response.text);
      showMessage("ההודעה נשלחה בהצלחה!", "success");
      form.reset();
    } catch (error) {
      console.error("שגיאה בשליחת ההודעה:", error);
      showMessage("אירעה שגיאה בשליחת ההודעה. אנא נסה שוב.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "שליחה";
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
      direction: rtl;
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
      transition: transform 0.3s ease;
    }

    .error-message {
      color: #d63031;
      font-size: 0.8em;
      margin-top: 5px;
      direction: rtl;
    }

    .form-control.error {
      border-color: #d63031;
      animation: shake 0.5s;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }

    .btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .form-control {
      transition: all 0.3s ease;
    }

    .form-control:focus {
      border-color: #00b894;
      box-shadow: 0 0 0 0.2rem rgba(0, 184, 148, 0.25);
    }
  `;
  document.head.appendChild(style);
});
