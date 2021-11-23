let bTable = document.getElementById("bTable");
let lTable = document.getElementById("lTable");

function displayGrid() {
    for(let i = 1; i < 101; i++){
        let box = document.createElement("span");
        box.classList.add("cell");
        box.textContent = i.toString();
        bTable.appendChild(box)
    }
}

displayGrid();