// Variables
const generateBtn = document.querySelector("#generate");
const modal = document.querySelector('.modal');
const lowercases = ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const uppercases = lowercases.map(lowercase => lowercase.toUpperCase())
const numeric = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const special = [' ',`!`,`”`,	`#`	,`$`	,`%`,	`&`	,`’`	,`(`	,`)`,	`*`,	`+`	,`,`, `-`,	`.`,	`/`,	`:`,	`;`,	`<`,	`=`,	`>`,	`?`,	`@`,	'[', "]",	"^",	"_",	"`",	"{",	"|",	"}",	"~"]

// Functions
const displayModal = () => {
  if(modal.classList.contains('flex')) {
    return
  } else {
    modal.classList.add('flex')
  }
}

const closeModal = () => {
  modal.classList.remove('flex')
}

const askCriteria = () => {
  modal.innerHTML = `<div class="criteria"><p>Choose Criteria for Password:</p>
  <form>
  <input type="checkbox" id="length" name="criteria" value="length">
  <label for="length">Password Length (Default: 8)</label><br>
  <input type="checkbox" id="char" name="criteria" value="chars">
  <label for="char">Include Specific Characters (Default: all lowercase)</label><br>
  <button class="criteria-submit">Next</button>
  </form>
  </div>`
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const gatherData = () => {
  // Asks what criteria to use for password (either length or specific characters)
  askCriteria();

  document.querySelector('.criteria-submit').addEventListener('click', (e) => {
    e.preventDefault()
    // criteria is an array of booleans [length, characters]
    let criteria = Array.from(document.querySelectorAll('input')).map(input => input.checked)
    
    // If neither criteria are chosen, uses length of 8 and only lowercase
    if(!criteria[0] && !criteria[1]) {
      let password = ''
      for(let i=1; i<=8; i++) {
        password += lowercases[getRandomInt(0, 25)]
      }
      writePassword(password)
    }

    if(criteria[0]) {
        modal.innerHTML = `<div class="criteria">
        <form>
        <label for="number">Password Length (between 8 and 128):</label>
        <input type="number" id="number" name="number" min="8" max="128">
        <button class="length-submit">Next</button>
        </form>
        </div>`;
        document.querySelector('.length-submit').addEventListener('click', (e) => {
          e.preventDefault()
          let length = document.querySelector('#number').value;
          
          if(criteria[1]) {
            modal.innerHTML = `<div class="criteria"><p>Required Character Types:</p>
            <form>
            <input type="checkbox" id="lowercase" name="criteria" value="lowercase">
            <label for="lowercase">Lowercase</label><br>
            <input type="checkbox" id="uppercase" name="criteria" value="uppercase">
            <label for="uppercase">Uppercase</label><br>
            <input type="checkbox" id="numeric" name="criteria" value="numeric">
            <label for="numeric">Numeric</label><br>
            <input type="checkbox" id="special" name="criteria" value="special">
            <label for="special">Special Characters</label><br>
            <button class="criteria-submit">Next</button>
            </form>
            </div>`;
            document.querySelector('.criteria-submit').addEventListener('click', (e) => {
              e.preventDefault()
              let characters = Array.from(document.querySelectorAll('input')).map(input => input.checked)
              
              // GENERATE PASSWORD
              let characterList = []
              if(characters[0]) {
                characterList.push(...lowercases)
              }
              if(characters[1]) {
                characterList.push(...uppercases)
              }
              if(characters[2]) {
                characterList.push(...numeric)
              }
              if(characters[3]) {
                characterList.push(...special)
              }
              let password = ''
              for(let i=1; i<=length; i++) {
                password += characterList[getRandomInt(0, characterList.length-1)]
              }
              writePassword(password)
              
            })

          } else {

            // GENERATE PASSWORD
            let password = ''
            for(let i=1; i<=length; i++) {
              password += lowercases[getRandomInt(0, 25)]
            }
            writePassword(password)
          }
        })

    } else {
        modal.innerHTML = `<div class="criteria"><p>Required Character Types:</p>
        <form>
        <input type="checkbox" id="lowercase" name="criteria" value="lowercase">
        <label for="lowercase">Lowercase</label><br>
        <input type="checkbox" id="uppercase" name="criteria" value="uppercase">
        <label for="uppercase">Uppercase</label><br>
        <input type="checkbox" id="numeric" name="criteria" value="numeric">
        <label for="numeric">Numeric</label><br>
        <input type="checkbox" id="special" name="criteria" value="special">
        <label for="special">Special Characters</label><br>
        <button class="criteria-submit">Next</button>
        </form>
        </div>`;

        document.querySelector('.criteria-submit').addEventListener('click', (e) => {
          e.preventDefault()
          characters = Array.from(document.querySelectorAll('input')).map(input => input.checked)
          
          // GENERATE PASSWORD
          let characterList = []
          if(characters[0]) {
            characterList.push(...lowercases)
          }
          if(characters[1]) {
            characterList.push(...uppercases)
          }
          if(characters[2]) {
            characterList.push(...numeric)
          }
          if(characters[3]) {
            characterList.push(...special)
          }
          let password = ''
          for(let i=1; i<=8; i++) {
            password += characterList[getRandomInt(0, characterList.length-1)]
          }
          writePassword(password)
        })
    }
  })
}

const writePassword = (password) => {
  var passwordText = document.querySelector('#password')
  passwordText.value = password
  closeModal()
}

const generatePassword = () => {
  displayModal()
  gatherData()
}




// Add event listener to generate button
generateBtn.addEventListener("click", generatePassword);
