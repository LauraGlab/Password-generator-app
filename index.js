const sliderValue = document.getElementById('sliderValue');
const mySlider = document.getElementById('mySlider');const includeSymbols = document.getElementById('includeSymbols');
const cubeStrength = document.querySelectorAll('.cube');
const checkbox = document.querySelectorAll('input[type=checkbox]')
const passwordName = document.getElementById('passwordName');
const copiedText = document.getElementById('copiedText');
const copyImg = document.getElementById('copyImg');
const strengthText = document.getElementById("levelOfStrength");
const cube1 = document.querySelector(".cube1");
const cube2 = document.querySelector(".cube2");
const cube3 = document.querySelector(".cube3");
const cube4 = document.querySelector(".cube4");
const allCubes = new Array(cube1, cube2, cube3, cube4);
const generateBtn = document.getElementById('generateBtn');

//Allowed characters
  const lowerCaseChars = "abcdefghijklmnoprstuwxyz";
  const upperCaseChars = "ABCDEFGHIJKLMNOPRSTUWXYZ";
  const numberChars = "1234567890";
  const symbolChars = "!@#$%^&*()_+";

//Slider 
function handlingSlider(){
  sliderValue.textContent = mySlider.value;

  const min = mySlider.min;
  const max = mySlider.max;
  const val = mySlider.value;

  mySlider.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

//Creating new array of checked checkboxes
const optionsOfCheck = () => {
  let allowedChars = "";
  let chosenCheckboxes = [];
  allowedChars += checkbox[0].checked ? chosenCheckboxes.push(upperCaseChars) : "";
  allowedChars += checkbox[1].checked ? chosenCheckboxes.push(lowerCaseChars) : "";
  allowedChars += checkbox[2].checked ? chosenCheckboxes.push(numberChars) : "";
  allowedChars += checkbox[3].checked ? chosenCheckboxes.push(symbolChars) : "";

  return chosenCheckboxes;
};

//Generating password with a new array[]
function creatingPassword(){
  const charOptions = optionsOfCheck();
  const passwordLength = mySlider.value;
  let charCategories = charOptions.length;
  let password = "";

//some sort of program = the for loop works until we have the exact same number of selected characters as slider length
  for (let i = 0; i < passwordLength; i++) {
    let randomIndex = charOptions[Math.floor(Math.random() * charCategories)];
    let result = randomIndex[Math.floor(Math.random() * randomIndex.length)];

    passwordName.style.color = "white";
    password += result;
  }

  passwordName.textContent = password;
  return password;
};
//Error in checkbox
function errorCheckbox(){
    const charOptions = optionsOfCheck();
    let charCategories = charOptions.length;
    const errorCheck = document.getElementById("errorCheckbox");
  if (charCategories === 0) {
    errorCheck.textContent = "Choose at least one option";
  } else {
    errorCheck.textContent = "";
  }
}
//Generating password
function generatePassword(){
  strengthBar();
  creatingPassword();
  errorCheckbox(); 
}

//Styling strength bar
function resetStrength(){
  allCubes.forEach(
    (currentElement) => (currentElement.className -= " too-weak weak medium strong")
  );
  strengthText.textContent = "";
  allCubes.forEach((currentElement) => (currentElement.className += " cube"));
}

function strengthBar(resetStrength){
  const passwordLength = mySlider.value;
  const options = optionsOfCheck();
  const errorCheck = document.getElementById("errorCheckbox");
  const weak = allCubes.slice(0, 2);
  const medium = allCubes.slice(0, 3);
  const strong = allCubes.slice(0,4);

  resetStrength();

if(options.length === 0){
  errorCheck.textContent = "Choose at least one option";
} else if((options.length === 4 || options.length === 3 || options.length === 2 || options.length === 1) && passwordLength >=1 && passwordLength < 4){
  cube1.className -= " cube";
  cube1.className += ' too-weak';
  strengthText.textContent = "T00 WEAK!";
} else if((options.length === 2 || options.length === 1) && passwordLength >=4){
  strengthText.textContent = "WEAK";
  weak.forEach((currentElement) => (currentElement.className -= " cube"));
  weak.forEach((currentElement) => (currentElement.className += " weak"));
} else if((options.length === 3 || options.length === 2) && passwordLength >=6){
  strengthText.textContent = "MEDIUM";
  medium.forEach((currentElement) => (currentElement.className -= " cube"));
  medium.forEach((currentElement) => (currentElement.className += " medium"));
} else if(options.length === 4 && passwordLength >= 8){
  strengthText.textContent = "STRONG";
  strong.forEach((currentElement) => (currentElement.className -= " cube"));
  strong.forEach((currentElement) => (currentElement.className += " strong"));
} else{
  console.error("error");
}
}

//Copy the password
function copyPassword() {
  if(passwordName.textContent !== "P4$5W0rD!"){
  navigator.clipboard.writeText(passwordName.textContent);
  setTimeout(() => {
    copiedText.textContent += "Copied!";
    copiedText.className += " fade-out";
    setTimeout(() => {
      copiedText.textContent = "";
      copiedText.style.className -= " fade-out";
    }, 2000);
  }, 100);
}
}


//Making a whole code actually works
mySlider.addEventListener("input", handlingSlider);
generateBtn.addEventListener('click', generatePassword);
copyImg.addEventListener('click', copyPassword);

