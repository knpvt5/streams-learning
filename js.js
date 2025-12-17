document.addEventListener("DOMContentLoaded", () => {
  const answer = document.getElementById("answer");
  const button = document.getElementById("ask");
  const input = document.getElementById("question");

  const fileInput = document.getElementById("fileinput");

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

  fileInput.onchange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    const rs = file.stream();
    // const reader = rs.getReader();
    // let res = await reader.read();
    // console.log(res);

    for await (const chunk of rs) {
      console.log("chunk", chunk);
      // callServer(chunk);

      const text = new TextDecoder().decode(chunk);
      console.log("text", text);

      if (file.name.endsWith(".png")) {
        console.log("this is photo");
      }
    }

    // while (true) {
    //   // const {done, value} = await reader.read();
    //   // console.log(value);
    //   // if (done) {
    //   //   console.log("reading ended", done);
    //   //   break;
    //   // }
    //   const res = await reader.read();
    //   console.log(res);
    //   if (res.done) {
    //     console.log("reading ended", res.done);
    //     break;
    //   }
    // }

    // callServer(res);
  };

  /*   button.addEventListener("click", () => {
    console.log(input.value);
  }); */

  function callServer(data) {
    fetch("http://localhost:3000/test", {
      method: "POST",
      body: data,
    })
      .then(async (res) => {
        // console.log(res);
        const rs = res.body;
        answer.innerText = "";
        for await (const chunk of rs) {
          console.log("server chuck", chunk);
          for (const byte of chunk) {
            const decoded = new TextDecoder().decode(new Uint8Array([byte]));
            const line = decoded.split("\n")
            console.log(line)
          }

          answer.innerText = answer.innerText + new TextDecoder().decode(chunk);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  //DOm end
});
