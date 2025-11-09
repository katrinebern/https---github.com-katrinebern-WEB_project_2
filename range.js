const alertRange = document.getElementById("alert_range");
const rangeOut = document.getElementById("rangeValue");

if (alertRange && rangeOut) {
  rangeOut.textContent = alertRange.value;

  alertRange.addEventListener("input", function () {
    rangeOut.textContent = alertRange.value;
  });
}

const form = document.querySelector("form");
const dobInput = document.getElementById("dob");

function isAtLeast18(dateStr) {
  if (!dateStr) return false;

  const dob = new Date(dateStr);
  if (isNaN(dob.getTime())) return false;

  const today = new Date();
  const cutoff = new Date(today);
  cutoff.setFullYear(today.getFullYear() - 18);

  return dob <= cutoff;
}

if (dobInput) {
  dobInput.addEventListener("input", function () {
    if (!isAtLeast18(dobInput.value)) {
      dobInput.setCustomValidity("Du skal være 18 år eller ældre.");
    } else {
      dobInput.setCustomValidity("");
    }
    dobInput.reportValidity();
  });
}

if (form && dobInput) {
  form.addEventListener("submit", function (e) {
    if (!isAtLeast18(dobInput.value)) {
      e.preventDefault();
      dobInput.setCustomValidity("Du skal være 18 år eller ældre.");
      dobInput.reportValidity();
    } else {
      dobInput.setCustomValidity("");
    }
  });
}

const password = document.getElementById("password");
const confirm = document.getElementById("confirm");

if (password && confirm) {
  function checkPasswordMatch() {
    if (confirm.value !== password.value) {
      confirm.setCustomValidity("Passwords must match.");
    } else {
      confirm.setCustomValidity("");
    }
  }

  password.addEventListener("input", checkPasswordMatch);
  confirm.addEventListener("input", checkPasswordMatch);

  form.addEventListener("submit", function (e) {
    checkPasswordMatch();
    if (confirm.validationMessage !== "") {
      e.preventDefault();
      confirm.reportValidity();
    }
  });
}
