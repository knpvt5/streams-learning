document.addEventListener("DOMContentLoaded", () => {
  const answer = document.getElementById("answer");
  const button = document.getElementById("ask");
  const input = document.getElementById("question");

  //   debugger
  button.onclick = () => {
    console.log(input.value);
    callServer(input.value);
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

  function callServer(data) {
    fetch("http://localhost:3000/", {
      method: "POST",
      body: data,
    })
      .then((res) => res.text())
      .then((res) => {
        answer.innerHTML = res;
      });
  }


  //DOm end
});
