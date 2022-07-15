// TODO znalezienie pól

const input_nameuser = document.getElementById("input_nameuser");
const input_email = document.getElementById("input_email");
const input_password = document.getElementById("input_password");
const input_password2 = document.getElementById("input_password2");
const form = document.querySelector("form");
const formMessage = form.querySelector(".form-message");

const validText = (field, lenght) => {
  return field.value >= lenght;
};
const validEmail = (field) => {
  const reg =
    /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
  return reg.test(field.value);
};
const validPassword = (field, field2) => {
  const lenghtBool = validText(field, 8);
  return (
    lenghtBool ||
    field.value.length != field2.value.length ||
    field.value != field2.value
  );
};
function markFieldAsError(field, show) {
  if (show) {
    field.classList.add("field-error");
  } else {
    field.classList.remove("field-error");
  }
}

input_nameuser.addEventListener("input", (e) =>
  markFieldAsError(e.target, validText(input_nameuser, 8))
);
input_email.addEventListener("input", (e) =>
  markFieldAsError(e.target, validEmail(input_email))
);
input_password.addEventListener("input", (e) =>
  markFieldAsError(e.target, validPassword(input_password, input_password2))
);
input_password2.addEventListener("input", (e) =>
  markFieldAsError(e.target, validPassword(input_password, input_password2))
);

const validForms = (e) => {
  e.preventDefault();
  console.log("walidacja");

  let formErrors = [];

  const fields = [input_email, input_nameuser, input_password, input_password2];

  for (const element of fields) {
    markFieldAsError(element, false);
  }
  if (!validText(input_nameuser, 8)) {
    markFieldAsError(input_nameuser, true);
    formErrors.push("Wypełnij poprawnie pole z nazwą użytkownika");
  }
  if (!validEmail(input_email)) {
    markFieldAsError(input_email, true);
    formErrors.push("Wypełnij poprawnie pole z e-mailem");
  }
  if (!validPassword(input_password, input_password2)) {
    markFieldAsError(input_password, true);
    formErrors.push("Wypełnij poprawnie pole z hasłami");
  }

  if (!formErrors.length) {
    form.submit();
  } else {
    formMessage.innerHTML = `
        <h3 class="form-error-title">Przed wysłaniem formularza proszę poprawić błędy:</h3>
        <ul class="form-error-list">
            ${formErrors.map((el) => `<li>${el}</li>`).join("")}
        </ul>
    `;
  }
};
form.addEventListener("submit", validForms);
