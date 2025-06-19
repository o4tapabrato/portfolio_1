console.log("Log connected");


document.querySelector(".loginbtn").addEventListener("click", "/login");

// let state = false;

// document.querySelector(".loginbtn").addEventListener("click", (event) => {
//     if (state) {
//         document.querySelector(".loginbox").remove();
//         state = false;
//         return;
//     }
//     else
//         state = true;
//     console.log("Clicked");
//     let card = document.createElement('div');
//     card.className = "loginbox";
//     card.innerHTML = `
        
//         <div class = "login">
//         <button  class="close" style="position: relative; top: 2%; left: 12%; padding: 20px;">X</button>
//         <header style="padding: 30px;">User Login</header>
//         <div style="display: flex; justify-content: center; align-items: center;">
//             <fieldset>
//                 <legend>Username</legend>
//                 <form action="/user" mothod="post">
//                     <input type="text" password placeholder="Enter your username" maxlength="30">

//             </fieldset>
//         </div>
//         <div style="display: flex; justify-content: center; align-items: center;">
//             <fieldset>
//                 <legend>Password</legend>
//                     <input type="password" required placeholder="Enter your username" maxlength="30">
//                 </form>
//             </fieldset>
//             </div>
//             <button type="submit" class="submit">SUBMIT</button>
//         </div>
//     </div>
// </div>`
//     document.querySelector("body").append(card);
//     document.querySelector(".close").addEventListener("click", () => {
//         document.querySelector(".loginbox").remove();
//         state = false;
//     })
//     // document.querySelector(".submit").addEventListener("click", async () => {
//     //     console.log("Working");
//     //     await fetch("/login", { method: "POST" });
//     // })

// });
