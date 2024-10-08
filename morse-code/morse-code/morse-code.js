const morseCodeMap = {
  '.-': 'A',
  '-...': 'B', 
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R', 
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9'
};

const charToMorseMap = Object.fromEntries(
  Object.entries(morseCodeMap).map(([key, value]) => [value, key])
);

function morseDecode(input, toMorse = false) {
  if (toMorse) {
    return input
      .toUpperCase().split('').map(char => (char === ' ' ? '   ' : charToMorseMap[char] || '')).join(' ') 
      .replace(/\s{4,}/g, '   '); 
  } else {
    return input.split('   ').map(word => word.split(' ') 
          .map(letter => morseCodeMap[letter]) 
          .join('') 
      )
      .join(' '); 
  }
}

function convert() {
  const inputText = document.getElementById("inputText").value.trim();
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const resultDiv = document.getElementById("result");

  let result;
  if (mode === "encode") {
    result = morseDecode(inputText, true);
  } else {
    result = morseDecode(inputText, false);
  }

  resultDiv.innerText = result;
}

module.exports = morseDecode;