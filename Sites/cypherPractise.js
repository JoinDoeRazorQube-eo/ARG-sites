var plaintext = "";
var easyMode = true;
window.onload = (event) => {
  easyModeToggle();
};

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

  plaintext = chosenSentance

  if (window.location.href.includes("a1z26")) {
    var asciiSubtract = 0;
    for (let i = 0; i < chosenSentance.length; i++) {
      let asciiCode = chosenSentance.charCodeAt(i)
      if (easyMode) {
        asciiCode > 90 ? asciiSubtract = 96 : asciiSubtract = 64;
      }
      if (asciiCode > asciiSubtract) out += String(asciiCode-asciiSubtract);
      out += " ";
    }
  }

  document.getElementById("InputText").innerText = out;
}
