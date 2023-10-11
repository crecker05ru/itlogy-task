console.log("Work");
const orderForm = document.getElementById("order-form");
const button = document.querySelector(".order__button");
const inputs = document.querySelectorAll(".order__input");
const inputsArr = Array.from(inputs);
const pizzasImages = document.querySelectorAll(".pizzas__pizza-image");
const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal__image");
const closeModalButton = document.querySelector(".modal__close");

const checkInputsValid = () => {
  return inputsArr.every((input) => input.validity.valid);
};

pizzasImages.forEach((pizzaImage) => {
  pizzaImage.addEventListener("click", (e) => {
    modal.style = "display: block;";
    modalImage.src = e.target.src;
    document.body.style = "overflow: hidden;";
  });
});

closeModalButton.addEventListener("click", () => {
  modal.style = "display: none;";
  document.body.style = "overflow: auto;";
});

inputs.forEach((input) => {
  input.addEventListener("keypress", (e) => {
    var key = e.charCode ? e.charCode : e.keyCode;
    if (key == 46) {
      e.preventDefault();
      return false;
    }
    setTimeout(() => {
      if (checkInputsValid()) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    }, 0);
  });
});

orderForm.addEventListener("submit", (e) => {
  if (!checkInputsValid()) {
    e.preventDefault();
    alert("Заполните все поля");
    return;
  }
  alert("Спасибо за заказ");
  const formData = new FormData();
  formData.append("name", orderForm["name"].value);
  formData.append("address", orderForm["address"].value);
  formData.append("telephone", orderForm["telephone"].value);
  fetch("server", {
    method: "POST",
    body: formData,
  });
});

