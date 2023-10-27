const con = document.getElementById("container");
const btn = document.getElementById("resize")
btn.addEventListener("click",()=>{
    let d = prompt("Squares on sides:");
    if (1 < d && d < 80){
        con.innerHTML ="";
        init(d);
    }
})
init(16);
function init(dim){
    let sizeBox = 90 / dim;
    for (let i = 0; i < dim; i++) {
        const row = document.createElement("div");
        row.setAttribute("class","row");
        for (let j = 0; j < dim; j++) {
           const box = document.createElement("div");
           box.setAttribute("class","box");
           box.style.width = sizeBox+"vh";
           box.style.height = sizeBox+"vh";
           box.addEventListener("mouseover", () => box.style.backgroundColor = "rgb(0,0,250)")
           row.appendChild(box);
        }
        con.appendChild(row);
    }
}