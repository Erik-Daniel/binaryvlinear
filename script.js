let bTable = document.getElementById("bTable");
let lTable = document.getElementById("lTable");
const input = document.getElementById("input");
const search = document.getElementById("search");
const inputContainer = document.getElementById("inputContainer");
let bLookingNumber = 50;
let lLookingNumber = 1;
let binaryInterval;
let linearInterval;
let bLookingMax = 100;
let bLookingMin = 0;
function displayGrid() {
    for(let i = 1; i < 101; i++){
        let box = document.createElement("span");
        box.classList.add("cell");
        box.textContent = i.toString();
        bTable.appendChild(box.cloneNode(true));
        lTable.appendChild(box.cloneNode(true));

    }
}

displayGrid();

function bigNumber() {
    let errorLbl = document.getElementById("error");
    if(errorLbl === null){
        let error = document.createElement("label");
        error.innerHTML = "Number must be below or equal to 100!";
        error.id = "error";
        inputContainer.insertBefore(error,search);
    }
  
    
}

search.onclick = function() {
    let value = input.value;
    reset();

    if(value != ""){
        if(value > 100){
            bigNumber();
           
        }
        else {
           
            let errorLbl = document.getElementById("error");
            if(errorLbl != null){
                inputContainer.removeChild(errorLbl);
            }
            searchNumber(value);

        }
    }
    
}

function searchNumber(number) {
    binaryInterval = setInterval(function() {binarySearch(number)},1000);
    linearInterval = setInterval(function() {linearSearch(number)}, 1000);
}

function binarySearch(number) {
    
    if(bLookingNumber === parseInt(number)){
        clearInterval(binaryInterval);
        getNumber("binary",number,"found");
    }
    else {
        if(bLookingNumber > number){
            //go down
            getNumber("binary", bLookingNumber,"down");

            bLookingMax = bLookingNumber;
            bLookingNumber = Math.round(Math.abs(bLookingNumber + bLookingMin) / 2);
         
            


        }
        else {
            //go up
            getNumber("binary", bLookingNumber,"up");

            bLookingMin = bLookingNumber;
            bLookingNumber = bLookingNumber + Math.round(Math.abs(bLookingMax - bLookingNumber) / 2);
           
        
        }
    }
}


function linearSearch(number) {
    if(lLookingNumber === parseInt(number)){
        clearInterval(linearInterval);
        getNumber("linear",lLookingNumber,"true");
    }
    else {
        getNumber("linear",lLookingNumber,"false");
        lLookingNumber++;
    }
}



function getNumber(search, number, operation) {
    if(search === "linear"){
        let listOfChilderen = lTable.childNodes;
        for(let i = 0; i < listOfChilderen.length; i++){
            if(listOfChilderen[i].textContent === number.toString()){
                if(operation === "false"){
                    listOfChilderen[i].textContent = ">";
                    listOfChilderen[i].style.backgroundColor = "rgb(255, 82, 82)";

                }
                else if(operation === "true"){
                    listOfChilderen[i].style.backgroundColor = "rgb(82, 255, 84)";
                    
                }
            }
            
        }

    }
    else if(search === "binary"){
        let listOfChilderen = bTable.childNodes;
        for(let i = 0; i < listOfChilderen.length; i++){
            
            if(listOfChilderen[i].textContent === number.toString()){
                if(operation === "down"){
            

                    listOfChilderen[i].textContent = "<";
                    listOfChilderen[i].style.backgroundColor = "rgb(255, 82, 82)";

                }
                else if(operation === "up"){
                
                    listOfChilderen[i].textContent = ">";
                    listOfChilderen[i].style.backgroundColor = "rgb(82, 203, 255)";
                }
                else if(operation === "found"){
                    listOfChilderen[i].style.backgroundColor = "rgb(82, 255, 84)";
                }
            }
        }   
    }
}

function reset() {
    bTable.innerHTML = "";
    bLookingNumber = 50;
    lTable.innerHTML = "";
    lLookingNumber = 1;
    bLookingMax = 100;
    bLookingMin = 0;
    clearInterval(binaryInterval);
    clearInterval(linearInterval);
    displayGrid();
}