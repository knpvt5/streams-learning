document.addEventListener("DOMContentLoaded", () => {
  const answer = document.getElementById("answer");
  const button = document.getElementById("ask");
  const input = document.getElementById("question");

//   debugger
  button.onclick = () => {
    console.log(input.value);
  };

//   button.ondblclick = () => {
//     console.log("Double Clicked");
//   };

  onkeydown = (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
      button.click();
    }
  };

  /*   button.addEventListener("click", () => {
    console.log(input.value);
  }); */

  fetch("http://localhost:3000/")
    .then((res) => res.text())
    .then((res) => {
      answer.innerHTML = res;
    });
});
