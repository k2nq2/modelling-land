const accordItem = document.querySelectorAll(".accordion-item");
const programList = document.querySelector(".program-list");
const programListItem = document.querySelector(".program-list");
const programBtn = document.querySelector(".open-program-btn");
const programBtnText = document.querySelector(".program-btn-text");
const programBtnImg = document.querySelector(".program-btn-img");
accordItem.forEach((e) => {
    e.addEventListener("click", toggleItem, false);
});

function toggleItem() {
    const isActive = this.classList.contains("active");

    accordItem.forEach((e) => {
        if (e.classList.contains("active")) {
            e.classList.remove("active")
        }
    })

    if (!isActive) {
        this.classList.add("active")
    }
}

 programBtn.addEventListener("click", toggleList, false);

 function toggleList() {
     const isExpanded = programList.classList.contains("collapse");

     if (isExpanded) {
         programList.classList.remove("collapse")
         this.classList.add("expanded")
         programBtnText.textContent = "voir plus";
     } else {
         programList.classList.add("collapse")
         this.classList.remove("expanded")
         programBtnText.textContent = "fermer";
     } }