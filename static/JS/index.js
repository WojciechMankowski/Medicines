// TODO znalezienie pól

const input_nameuser = document.getElementById("input_nameuser");
const input_email = document.getElementById("input_email");
const input_password = document.getElementById("input_password");
const input_password2 = document.getElementById("input_password2");
const form = document.querySelector("form");
const formMessage = form.querySelector(".form-message");

const validText = (field, lenght) => {
  return  field.value.length >= lenght ;
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
const validForms = e => {
  e.preventDefault();
  let formErrors = []

  if (!validText(input_nameuser, 8)){
    formErrors.push("Nazwa użytkownika jest za krótka")
  }
  if (!validEmail(input_email)){
    formErrors.push("Email jest nieprawidłowy")
  }
  if (!validPassword(input_password, input_password2)){
    formErrors.push("Hasła nie są takie same")
  }
  if (formErrors.length != 0){
    const ul = document.createElement("ul");
    for (let i = 0; i < formErrors.length; i++){
      const li = document.createElement("li");
      li.innerHTML = formErrors[i];
      ul.appendChild(li);
    }
    formMessage.appendChild(ul);

  }

}

form.addEventListener("submit", validForms);

