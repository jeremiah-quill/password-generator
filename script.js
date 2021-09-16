// TODO: Handle invalid inputs on line 70 and line 95


// Variables
const generateBtn = document.querySelector("#generate");
const overlay = document.querySelector('.overlay');
const lengthInput = document.querySelector('#length');
// Turn HTML Collection of inputs into an array
const characterInputs = Array.from(document.querySelectorAll('.char-input'))
const lowercases = ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const uppercases = lowercases.map(lowercase => lowercase.toUpperCase())
const numeric = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const special = [' ',`!`,`”`,	`#`	,`$`	,`%`,	`&`	,`’`	,`(`	,`)`,	`*`,	`+`	,`,`, `-`,	`.`,	`/`,	`:`,	`;`,	`<`,	`=`,	`>`,	`?`,	`@`,	'[', "]",	"^",	"_",	"`",	"{",	"|",	"}",	"~"]
let length = '';
let characters = [];

// Functions
const showEl = (id) => {
    document.querySelector(id).style.display = 'block'
};

const hideEl = (id) => {
    document.querySelector(id).style.display = 'none'
;
}

const generatePassword = (length, chars) => {
    let characterList = []
    if(chars[0]) {
    characterList.push(...lowercases)
    }
    if(chars[1]) {
    characterList.push(...uppercases)
    }
    if(chars[2]) {
    characterList.push(...numeric)
    }
    if(chars[3]) {
    characterList.push(...special)
    }
    let password = ''
    for(let i=1; i<=length; i++) {
    password += characterList[getRandomInt(0, characterList.length)]
    }
    return password
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

// ** Event Listeners **
document.querySelector('#submit-length').addEventListener('click', (e) => {
    e.preventDefault();

    // Validate that a required length between 8 and 128 (inclusive) is chosen
    if(lengthInput.value >= 8 && lengthInput.value <= 128) {
        
        // Get length value from input and update length variable
        let lengthInputValue = document.querySelector('#length')
        length = lengthInputValue.value
    
        // Reset input field, hide required length form, display required character type form
        lengthInputValue.value = ''
        hideEl('#request-length')
        showEl('#request-chars')

    } else {
        // Display message "Please choose a password length between 8 and 128"
        console.log('Please choose a password length between 8 and 128')
    }
})

document.querySelector('#submit-chars').addEventListener('click', (e) => {
    e.preventDefault();
    
    characters = characterInputs.map(input => input.checked)

    // Validate that at least one of the character type checkboxes is true
    if(characters.includes(true)) {
        // Reset checkbox inputs and hide form element
    characterInputs.forEach(input => input.checked = false)
    hideEl('#request-chars');

    // Generate password based on chosen criteria, hide overlay element, and write password to textarea
    let password = generatePassword(length, characters)
    overlay.style.display = 'none';
    document.querySelector('#password').value = password

    // Make generate button clickable after password has been generated and printed to screen
    generateBtn.disabled = false;

    } else {
        // Display message "Please choose at least one required character type"
        console.log('Please choose at least one required character type')
    }
})

generateBtn.addEventListener('click', () => {
    // Disable generate button so you can't click it while going through criteria prompts
    generateBtn.disabled = true;
    // Display overlay
    overlay.style.display = 'flex';
    // Display form requesting required length of password
    showEl('#request-length');
})