var plaintext = "";
var easyMode = true;
var gameMode = 0;
window.onload = (event) => {
  gameMode = 0;
  easyModeToggle();
};

function modeChange() {
    gameMode = (gameMode+1)%3
    switch (gameMode) {
        case 0:
          document.getElementById("modeButton").innerText = "A1Z26";
          document.getElementById("KeyInputNum").style.display = "none";
          document.getElementById("KeyInputText").style.display = "none";
          break;
        case 1:
          document.getElementById("modeButton").innerText = "Caesar";
          document.getElementById("KeyInputNum").style.display = "inline-block";
          document.getElementById("KeyInputText").style.display = "none";
          break;
        case 2:
          document.getElementById("modeButton").innerText = "Viginere";
          document.getElementById("KeyInputNum").style.display = "none";
          document.getElementById("KeyInputText").style.display = "inline-block";
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
    input = input.toLowerCase().replace(/ /g, "");
    output = output.toLowerCase().replace(/ |,|'|\./g, "")
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
    chosenSentance = chosenSentance.replace(/,|'|\./g, "");
  }
  var asciiSubtract = 0;
  plaintext = chosenSentance
  switch (gameMode) {
      case 0:
        for (let i = 0; i < chosenSentance.length; i++) {
          let asciiCode = chosenSentance.charCodeAt(i)
          if (i > 0) out += " ";
          if (easyMode) {
            asciiCode > 90 ? asciiSubtract = 96 : asciiSubtract = 64;
          }
          if (asciiCode > asciiSubtract) out += String(asciiCode-asciiSubtract);
        }
        break;
        //you know what fuck it spaghetti code it is!
      case 1:
      var max = 126;
      var min = 32;
        for (let i = 0; i < chosenSentance.length; i++) {
          let asciiCode;
          if (easyMode) {
            max = 90;
            min = 65;
            asciiCode = chosenSentance.toUpperCase().charCodeAt(i)
          } else {
            asciiCode = chosenSentance.charCodeAt(i)
          }
          if (asciiCode >= min && asciiCode <= max) {
            asciiCode += +document.getElementById("KeyInputNum").value;
            if (asciiCode > max) {
              asciiCode = asciiCode - max + min;
            } else if (asciiCode < min) {
              asciiCode = max + 1 - min + asciiCode
            }
          }
          out += String.fromCharCode(asciiCode);
        }
        break;
      case 2:

        break;
      default:

        break;
  }

  document.getElementById("InputText").innerText = out;
}
