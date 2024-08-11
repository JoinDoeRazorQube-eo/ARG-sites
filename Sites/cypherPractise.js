var plaintext = "";
var easyMode = true;
var gameMode = 0;
var egg = 0;
const anom = {
  Back: 1,
  LinkTxt: 2,
  StrangeImage: 3,
  StrangeAudio: 4,
  ClickMe: 5
}

const sentances = [
  "Hello World",
  "The Spice must flow",
  "Nobody has encountered an explosive daisy and lived to tell the tale.",
  "There was no telling what thoughts would come from the machine.",
  "The teenage boy was accused of breaking his arm simply to get out of the test.",
  "I was starting to worry that my pet turtle could tell what I was thinking.",
  "At that moment I was the most fearsome weasel in the entire swamp.",
  "Flying fish flew by the space station.",
  "It must be five o'clock somewhere.",
];

const spectrogramAudio = [
  ["https://drive.google.com/file/d/1ura47Td6tUyQTU8IuwVQ4el7c95AQAyR/preview", "LORD, WHAT CAN THE HARVEST HOPE FOR, IF NOT FOR THE CARE OF THE REAPER MAN?"],
  ["https://drive.google.com/file/d/1BL6E20CjNbG65RZnvihtIE0nSQzUzXOz/preview", "Anyone who thinks the pen is mightier than the sword has not been stabbed with both."],
  ["https://drive.google.com/file/d/1bw3R39foqtecx_C8Z1pd-2zy45bl228R/preview", "To say that Richard Mayhew was not very good at heights would be perfectly accurate, but would fail to give the full picture; it would be like describing the planet Jupiter as bigger than a duck."]
];

const stegImage = [
  ["./Steganography/Image/Pencil.png", "Writing a list of random sentences is harder than I initially thought it would be"],
  ["./Steganography/Image/Glass.png", "She couldn't decide if the glass was half empty or half full so she drank it."],
  ["./Steganography/Image/Wall.png", "There is no better feeling than staring at a wall with closed eyes."]
];

window.onload = (event) => {
  gameMode = 0;
  easterEgg();
  if (window.location.href.toLowerCase().includes("substitution")) {
    easyModeToggle();
  }
  if (window.location.href.toLowerCase().includes("steganography")) {
    Selection();
  }
};



function easterEgg() {
  var fun = Math.random()*100;
  var perc = 5; //for testing >5 is good REMEMBER TO DROP IT SIGNIFICANTLY!!!!
  if (fun <= perc*4) {
    egg = Math.ceil(fun/perc);
  }

  let hours = new Date().getHours();
  if (hours > 4) { //NO EGG FOR U!
    if (egg == 1) {
      egg = 0;
    }
  }
}

function doEgg() {
  switch (egg) {
    case anom.Back:
      let msg = "GO BACK";
      let list = document.querySelectorAll('p, a, h1, button, label, em');
      for (let i = 0; i < list.length; i++){
        list[i].innerText = msg;
      }
      document.getElementById("OutputText").placeholder = msg;
      break;

    case anom.LinkTxt:
    //this one must be done in reroll fuction
      //plaintext = "LINK TO SOMEPLACE" //remember to do this CANNOT BE CASE SENSITIVE unless case given somewhere else
      break;

    case anom.StrangeImage:
      if (gameMode == 1 && window.location.href.toLowerCase().includes("steganography")) {
        file = "./Steganography/Image/Door.png";
        document.querySelector('[for="SelectorInput0"]').innerText = "Something cool";
        document.querySelector('[for="SelectorInput1"]').innerText = "Something hot";
        document.querySelector('[for="SelectorInput2"]').innerText = "Something lost";
      }

      break;

    case anom.StrangeAudio:
      if (gameMode == 0 && window.location.href.toLowerCase().includes("steganography")) {
        file = "https://drive.google.com/file/d/1xM2--e7eMQlkVT2-Gwh2A0yPMRQzaaQg/preview";
        let msg = "?????";
        for (let i = 0; i < 3; i++) {
          let query = '[for="SelectorInputX"]';
          query = query.replace('X', i);
          document.querySelector(query).innerText = msg;
        }
      }
      break;

    case anom.ClickMe:
      if (document.getElementById("ClickMe!") ==  null) {
        document.body.appendChild(document.createElement('br'))


        const a = document.createElement('a');
        a.href = "https://drive.google.com/drive/folders/1gbVJ8Egw682k361lCE7mYgCDHJktmnrW?preview";
        a.target = "_blank";

        const button = document.createElement('button');
        button.textContent = 'Click me!';
        button.id = "ClickMe!";

        document.body.appendChild(a);
        a.appendChild(button);
        break;
      }

    default:
      break;
  }
}

function modeChange(mode) {
    gameMode = mode;
    doEgg();
    if (window.location.href.toLowerCase().includes("substitution")) {
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
    if (window.location.href.toLowerCase().includes("steganography")) {
      switch (gameMode) {
          case 0:
            document.getElementById("ImageDiv").style.display = "none";
            document.getElementById("AudioDiv").style.display = "inline-block";
            break;
          case 1:
            document.getElementById("ImageDiv").style.display = "inline-block";
            document.getElementById("AudioDiv").style.display = "none";
            break;
          default:
            document.getElementById("modeButton").innerText = "????";
            break;
      }
    }
    Selection();
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

  var chosenSentance = sentances[Math.round(Math.random()*(sentances.length-1))];
  var out = "";
  if (egg == anom.LinkTxt) {
    chosenSentance = "https://www.youtube.com/watch?v=JYfsUS03vnQ";
  }
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
          inputText = "Vigenere";
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
  if (out.includes(" ")) {
    document.getElementById("InputBackground").style.width = "300px";
  }else{
    document.getElementById("InputBackground").style.width = "auto";
  }
  document.getElementById("InputText").innerText = out;
  doEgg()
}


var file = "";
var sel;
function Selection() {

  sel = document.querySelector('input[name="RadioSelectorInput"]:checked');
  var source = "";

  var solution = "";

  if (gameMode == 0) {
    document.querySelector('[for="SelectorInput0"]').innerText = "Terry Pratchett";
    document.querySelector('[for="SelectorInput1"]').innerText = "Lemony Snicket";
    document.querySelector('[for="SelectorInput2"]').innerText = "Neil Gaimen";
      document.getElementById("password").style.display = "none";

    file = spectrogramAudio[sel.value % spectrogramAudio.length][0];
    solution = spectrogramAudio[sel.value % spectrogramAudio.length][1];
    source = "AudioSource";
  } else {
    document.querySelector('[for="SelectorInput0"]').innerText = "Pencil";
    document.querySelector('[for="SelectorInput1"]').innerText = "Glass";
    document.querySelector('[for="SelectorInput2"]').innerText = "Wall";
      document.getElementById("password").style.display = "block";

    file = stegImage[sel.value % stegImage.length][0];
    solution = stegImage[sel.value % stegImage.length][1];
    source = "ImageSource";
  }


  plaintext = solution;
  doEgg()
  document.getElementById(source).src = file;
}


function Clean(str, toUpper) {
  if (toUpper == true) {
    str = str.toUpperCase();
  }
  return str.replace(/[^0-9a-z-A-Z ]/g, "");
}
