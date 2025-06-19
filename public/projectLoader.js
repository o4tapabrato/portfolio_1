// let p = fetch("/projects/retrieve")
// p.then((val) => {
//     return val.json();
// }).then(async(arr) => {
    
//     putCards(arr.data, arr.state);

// })

async function retrieve(){
  await fetch("/projects/retrieve")
  .then(response => response.json())
  .then(result => {
    console.log('The result is:',result);
    const projects = result.data;  // array of projects
    const isLoggedIn = result.state; // boolean true/false

    console.log("Projects:", projects);
    console.log("Is user logged in?", isLoggedIn);

    putCards(projects, isLoggedIn ? 1 : 0); // example usage
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });}

  function putCards(arr, state) {
    console.log("State inside putCards:", state, typeof state);

    let html = "";
    const showButtons = state === 1 || state === true || state === "true";

    for (let i = 0; i < arr.length; i++) {
      let div = document.createElement('div');
      div.classList = "canvass hzoom"
      div.innerHTML = `<div class="icons">
                ${showButtons ? `
                <button class="delete">X</button>
                <button class="edit">E</button>
                ` : ""}
            </div>
            <div class="cardImg">
                <img src="${arr[i].image}" class="cimg" alt="image" width="80%">
            </div>
            <div class="info">
                <b>${arr[i].name}</b>: ${arr[i].desc} (${arr[i].priority})
            </div>`
        document.querySelector(".cardholder").append(div);
        
    }
    if(state === 1 || state === true || state === "true"){
    let newBtn = document.createElement("button");
    newBtn.classList = "loginbtn";
    newBtn.innerText = "Add New";
    newBtn.onclick = (e) => {
      window.location.href = "/projects/add";
    };
    document.querySelector(".titlebar ul").append(newBtn);
  }

    // document.querySelector(".cardholder").innerHTML = html;
    //<button class="loginbtn" onclick="window.location.href='/projects/add'">Add New</button>
}


async function main(){
  await retrieve();
  console.log("Project Manager has been connected");
  const deleteButtons = document.querySelectorAll(".delete");
  const editButtons = document.querySelectorAll(".edit");
  console.log("Number of delete buttons found: ",deleteButtons.length);
  console.log("Number of edit buttons found: ",editButtons.length);

  async function del(){
    console.log("Working");
    const card = this.closest(".canvass");
    const projectName = card.querySelector(".info b")?.textContent || "this project";
    const confirmDelete = confirm(`Are you sure you want to delete ${projectName}?`);
    if (confirmDelete) {
        card.remove();
        await fetch(`/projects/delete/${projectName}`);
    }
  }

  async function edit(){
    console.log("Working");
    const card = this.closest(".canvass");
    const projectName = card.querySelector(".info b")?.textContent || "this project";;
    window.location.href = `/projects/edit/${projectName}`;
  }

  for(let i = 0; i<deleteButtons.length; i++)
    deleteButtons[i].addEventListener("click", del);
  for(let i = 0; i<editButtons.length; i++)
    editButtons[i].addEventListener("click", edit);
}
main();



