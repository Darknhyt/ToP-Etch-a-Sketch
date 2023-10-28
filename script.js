const con = document.getElementById("container");
const btn = document.getElementById("resize");
const grid = document.getElementById("grid");
const colorPick = document.getElementById("color-pick");
const defaultColors = document.getElementById("default-color")
const root = document.querySelector(":root");

let color = colorPick.value;
let dimension = grid.value;
let clicked = false;

btn.addEventListener("click",()=>{
    if (1 < dimension && dimension <= 50){
        con.innerHTML ="";
        createCanvas(dimension);
    }
})

grid.addEventListener("input", ()=>{
    dimension = grid.value;
    grid.nextElementSibling.textContent = dimension;
});

colorPick.addEventListener("input",()=>{
    color = colorPick.value;
    root.style.setProperty("--color", color);
});

init(16);
function init(dim){
    root.style.setProperty("--color", color);
    clickEvent();
    createCanvas(dim);
}

function clickEvent(){
    con.addEventListener("mousedown", (e)=>{
        e.preventDefault();
        if(e.target.className == "box"){
            paint(e.target);
        }
        clicked = true;
    },false);
    con.addEventListener("mouseup", ()=>{
            clicked = false;
    });
}

function createCanvas(dim){
    let sizeBox = 95 / dim;
    for (let i = 0; i < dim; i++) {
        const row = document.createElement("div");
        row.setAttribute("class","row");
        for (let j = 0; j < dim; j++) {
           const box = document.createElement("div");
           box.setAttribute("class","box");
           box.style.width = sizeBox+"vh";
           box.style.height = sizeBox+"vh";
           box.addEventListener("mouseover", ()=>{
                if (clicked) {paint(box)}    
            }, false);
            
           row.appendChild(box);
        }
        con.appendChild(row);
    }
}

function paint(box){
    box.style.backgroundColor = color;
    box.style.outlineColor = "black";
}