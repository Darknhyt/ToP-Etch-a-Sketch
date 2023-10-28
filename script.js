const con = document.getElementById("container");
const btn = document.getElementById("resize");
const grid = document.getElementById("grid");
const colorPick = document.getElementById("color-pick");
const defaultColors = document.getElementById("default-color");
const mode = document.getElementsByName("mode");
const root = document.querySelector(":root");

let color = colorPick.value;
let dimension = grid.value;
let clicked = false;
let autoMode = false;
let colors = ["#FF0000", "#FF00FF", "#0000FF", "#00FFFF", "#00FF00", "#FFFF00", "#FFFFFF"];

init(16);
function init(dim){
    root.style.setProperty("--color", color);
    createCanvas(dim);
    addEvent();
    clickEvent();
    configColors();
}

function addEvent(){
    con.addEventListener("mouseover", (e)=>{
        if ((clicked || autoMode) && e.target.className == "box") {paint(e.target)}});
    btn.addEventListener("click",()=>{
        if (1 < dimension && dimension <= 50){
            con.innerHTML ="";
            createCanvas(dimension);
        }
    }) 
    grid.addEventListener("input", ()=>{
        dimension = grid.value;
        grid.previousElementSibling.textContent = dimension;
    });
    colorPick.addEventListener("input",()=>{
        color = colorPick.value;
        root.style.setProperty("--color", color);
    });
    mode.forEach(m => {
        m.addEventListener("input",()=>{
            if (m.value == "n"){
                autoMode = false;
            }else {
                autoMode = true;
            }
        });
    })
}

function clickEvent(){
    con.addEventListener("mousedown", (e)=>{
        e.preventDefault();
        if(e.target.className == "box"){
            paint(e.target);
        }
        clicked = true;
    });
    con.addEventListener("mouseup", ()=>{
        clicked = false;
    });
}

function createCanvas(dim){
    let sizeBox = 88 / dim;
    for (let i = 0; i < dim; i++) {
        const row = document.createElement("div");
        row.setAttribute("class","row");
        for (let j = 0; j < dim; j++) {
           const box = document.createElement("div");
           box.setAttribute("class","box");
           box.style.width = sizeBox+"vh";
           box.style.height = sizeBox+"vh";    
           row.appendChild(box);
        }
        con.appendChild(row);
    }
}

function paint(box){
    box.style.backgroundColor = color;
    box.style.outlineColor = "black";
}

function configColors(){
    colors.forEach(e => {
        let bColor = document.createElement("button");
        bColor.setAttribute("class","color-btn");
        bColor.style.backgroundColor = e;
        bColor.addEventListener("mouseover",()=>{
            root.style.setProperty("--color", e);
        })
        bColor.addEventListener("mouseout",()=>{
            root.style.setProperty("--color", color);
        })
        bColor.addEventListener("mouseup",()=>{
            colorPick.value = e;
            color = e;
        })
        defaultColors.appendChild(bColor);
    });
    defaultColors.firstChild.style.borderRadius = "5px 5px 0 0";
    defaultColors.lastChild.style.borderRadius = "0 0 5px 5px";
}