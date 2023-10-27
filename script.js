const con = document.getElementById("container");
const btn = document.getElementById("resize");
const grid = document.getElementById("grid");
const colorPick = document.getElementById("color-pick");
const root = document.querySelector(":root");

let color = colorPick.value;
let d = grid.value;

btn.addEventListener("click",()=>{
    if (1 < d && d <= 50){
        con.innerHTML ="";
        init(d);
    }
})

grid.addEventListener("input", ()=>{
    d = grid.value;
    grid.nextElementSibling.textContent = d;
});

colorPick.addEventListener("input",()=>{
    color = colorPick.value;
    root.style.setProperty("--color", color);
});

init(16);
function init(dim){
    document.querySelector(":root").style.setProperty("--color", color);
    let sizeBox = 97 / dim;
    for (let i = 0; i < dim; i++) {
        const row = document.createElement("div");
        row.setAttribute("class","row");
        for (let j = 0; j < dim; j++) {
           const box = document.createElement("div");
           box.setAttribute("class","box");
           box.style.width = sizeBox+"vh";
           box.style.height = sizeBox+"vh";
           box.addEventListener("mouseover", ()=>{
                box.style.backgroundColor = color;
                box.style.outlineColor = color;
        });
           row.appendChild(box);
        }
        con.appendChild(row);
    }
}