
console.log("Project Manager has been connected");
const deleteButtons = document.querySelectorAll(".delete");
console.log(deleteButtons.length);

function action(){
    console.log("Working");
}

for(let i = 0; i<deleteButtons.length; i++)
    deleteButtons[i].addEventListener("click", action);


//   deleteButtons.forEach(btn => {
//     console.log("working");
//     btn.addEventListener("click",() => {
//       console.log("Delete button has been clicked");
//       const card = this.closest(".canvass");
//       const projectName = card.querySelector(".info b")?.textContent || "this project";

//       const confirmDelete = confirm(`Are you sure you want to delete ${projectName}?`);
//       if (confirmDelete) {
//         card.remove();
//         // Optional: Send DELETE request to backend here
//       }
//     });
//   });