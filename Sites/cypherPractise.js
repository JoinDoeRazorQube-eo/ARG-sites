var plaintext = "";
var easyMode = true;
var gameMode = 0;
window.onload = (event) => {
  gameMode = 0;
  easyModeToggle();
};

function modeChange(mode) {
    gameMode = mode;
    switch (gameMode) {
        case 0:
          document.getElementById("KeyInputNum").style.display = "none";
          document.getElementById("KeyInputText").style.display = "none";
          document.getElementById("BookDiv").style.display = "none";
          break;
        case 1:
          document.getElementById("KeyInputNum").style.display = "inline-block";
          document.getElementById("KeyInputText").style.display = "none";
          document.getElementById("BookDiv").style.display = "none";
          break;
        case 2:
          document.getElementById("KeyInputNum").style.display = "none";
          document.getElementById("KeyInputText").style.display = "inline-block";
          document.getElementById("BookDiv").style.display = "none";
          break;
        case 3:
          document.getElementById("KeyInputNum").style.display = "none";
          document.getElementById("KeyInputText").style.display = "none";
          document.getElementById("BookDiv").style.display = "inline-block";
          break;
        default:
          document.getElementById("modeButton").innerText = "????";
          break;
    }
    reroll();
}

function easyModeToggle() {
    easyMode = !document.getElementById("HardModeCheckbox").checked;
    reroll();
}

function verify() {
  var input = plaintext;
  var output = document.getElementById("OutputText").value;
  if (easyMode) {
    input = Clean(input, true);
    output = Clean(output, true);
  }

  if (input == output) {
    document.getElementById("result").innerText = "Congrats!";
  } else if (output == "") {
    document.getElementById("result").innerText = "Please enter the decyphered text above";
  } else {
    document.getElementById("result").innerText = "Wrong! Try Again!";
  }
}

function reroll() {
  document.getElementById("result").innerText = "";
  const sentances = [
    "Hello World",
    "The Spice must flow",
    "Nobody has encountered an explosive daisy and lived to tell the tale.",
    "There was no telling what thoughts would come from the machine.",
    "The teenage boy was accused of breaking his arm simply to get out of the test.",
    "I was starting to worry that my pet turtle could tell what I was thinking.",
    "At that moment I was the most fearsome weasel in the entire swamp.",
    "Flying fish flew by the space station.Flying fish flew by the space station.",
    "It must be five o'clock somewhere.",
  ];

  var chosenSentance = sentances[Math.round(Math.random()*(sentances.length-1))];
  var out = "";
  if (easyMode) {
    chosenSentance = Clean(chosenSentance, true);
  }
  var asciiSubtract = 0;
  plaintext = chosenSentance;
  if (gameMode == 0) {
    for (let i = 0; i < chosenSentance.length; i++) {
      let asciiCode = chosenSentance.charCodeAt(i);
      if (i > 0) out += " ";
      if (easyMode) {
        asciiCode > 90 ? asciiSubtract = 96 : asciiSubtract = 64;
      }
      if (asciiCode > asciiSubtract) out += String(asciiCode-asciiSubtract);
    }
  } else if (gameMode != 3){
    var max = 126;
    var min = 32;

      let j = 0;
    for (let i = 0; i < chosenSentance.length; i++) {
      let asciiCode;
        let inputText;
        if (document.getElementById("KeyInputText").value == '') {
          inputText = "Viginere";
        } else {
          inputText = document.getElementById("KeyInputText").value;
        }

      if (easyMode) {
        max = 90;
        min = 65;
        asciiCode = chosenSentance.charCodeAt(i);
        //dunno if it is better or worse to put an if gamemode two arround the indented code
          inputText = inputText.toUpperCase().replace(/[^A-Z]/g, "");
          document.getElementById("KeyInputText").value = inputText;

      } else {
        asciiCode = chosenSentance.charCodeAt(i);
      }

          inputText = inputText.replace(" ", "");
          document.getElementById("KeyInputText").value = inputText;
          let inputAscii = inputText[j % inputText.length].charCodeAt();
          inputAscii = inputAscii-min;

      if (asciiCode >= min && asciiCode <= max) {
        if (gameMode == 1) {
          asciiCode += +document.getElementById("KeyInputNum").value;
        }
        if (gameMode == 2){
          asciiCode += inputAscii;
        }

        if (asciiCode > max) {
          asciiCode = asciiCode - max + min -1;
        } else if (asciiCode < min) {
          asciiCode = max + 1 - min + asciiCode;
        }
      }

      out += String.fromCharCode(asciiCode);
        if (asciiCode != 32) { j++; }
    }
  } else {
    const breakIndeces = [];
    var bookText = document.getElementById("BookText").innerText;
    var breaks = document.getElementById("BookText").innerHTML;

    if (easyMode) {
      bookText = bookText.toUpperCase();
    }

    let idx = breaks.indexOf("<br>");
    for (let i = 0; idx !== -1; i ++) {
      breakIndeces.push(idx-(4*i));
      idx = breaks.indexOf("<br>", idx + 1);
     }

     for (let i = 0; i < chosenSentance.length; i++) {
       if (i > 0) out += " ";
       let letterIndices = [];
       var element = chosenSentance[i];
       let inde = bookText.indexOf(element);
       while (inde !== -1 && inde < breakIndeces[breakIndeces.length-1]) {
         letterIndices.push(inde);
         inde = bookText.indexOf(element, inde + 1);
       }

       if (letterIndices.length > 0) {
         var chosenLetter = letterIndices[Math.round(Math.random()*(letterIndices.length-1))];
         var line = 1;
         for (let j = 0; j < breakIndeces.length; j++) {
           if (chosenLetter < breakIndeces[j]) {
             chosenLetter += 1;
             if (j > 0) {out += String(chosenLetter-breakIndeces[j-1])}
             else {out += +chosenLetter;}
             break;
           } else {
             line++;
           }
         }
            out += ":" + +line + ";";
       } else {
         out += chosenSentance[i];
       }
     }
  }
  document.getElementById("InputText").innerText = out;
}




function Clean(str, toUpper) {
  if (toUpper == true) {
    str = str.toUpperCase();
  }
  return str.replace(/[^0-9a-z-A-Z ]/g, "");
}
