document.querySelector("#search").onclick = function(){
    document.querySelector("[data-id='download']").classList.remove("active");
    document.querySelector("[data-id='borrow']").classList.remove("active");
    document.querySelector("[data-id='search']").classList.add("active");

}
document.querySelector("#download").onclick = function(){
    document.querySelector("[data-id='borrow']").classList.remove("active");
    document.querySelector("[data-id='search']").classList.remove("active");
    document.querySelector("[data-id='download']").classList.add("active");

}

document.querySelector("#borrow").onclick = function(){
    document.querySelector("[data-id='download']").classList.remove("active");
    document.querySelector("[data-id='search']").classList.remove("active");
    document.querySelector("[data-id='borrow']").classList.add("active");


}

