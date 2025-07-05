const buttonA = document.querySelector("#button_A");
const contentA = document.querySelector("#content_A");

let click = 0;

buttonA.onclick = () => {
  buttonA.textContent = "Нажми еще!";
  contentA.textContent = `${click} нажатий на кнопку`;
  if (click < 10) {
    click += 1;
  } else if (click < 20) {
    buttonA.textContent = "хватит.";
    click += 1;
  } else {
    buttonA.textContent = "хватит.";
    contentA.textContent = "я сказал хватит.";
  }
};
