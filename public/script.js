async function typing() {
    let response = await fetch("/getSkills");
    let text = await response.json();
    const addItem = async (item) => {
        await write(item);
        await getDelay(2);
    }
    let i = 0;
    while (true) {
        await addItem(text[i]);
        i = (i + 1) % text.length;
    }
}
const write = async (word) => {
    let newDiv = document.createElement("div");
    newDiv.className = "screen lato-black";
    document.querySelector(".screen").remove();
    document.querySelector(".cover").append(newDiv);
    for (let i = 0; i < word.length; i++) {
        await getDelay(1);
        newDiv.innerHTML = newDiv.innerHTML + word[i];
    }
}
const getDelay = (val) => {
    timeout = Math.random() * 100 % 2;
    let mult;
    if (val == 1)
        mult = 100;
    else
        mult = 1000;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout * mult)
    })
}
typing();
async function ripplePfp() {
    let times = 5;
    while (true) {
        let pic = document.querySelector(".pfp");
        for (i = 0; i < times; i++) {
            await getDelay(1);
            if (i % 2)
                pic.style.filter = "none";
            else
                pic.style.filter = "invert(1)";
        }
        await getDelay(2);
    }
}
ripplePfp();

async function edit() {
    window.location.href = "/edit";
}

async function editSetup(){
    console.log("This in inside the edit function");
    let response = await fetch("/getState");
    let state = await response.json();
    console.log(`Current State: ${state}`);
    if(state === 1 || state === true || state === "true"){
        console.log("Placing the button");
        let target = document.querySelector(".content");
        let div = document.createElement("div");
        div.classList = "icons";
        div.innerHTML = `<button class="edit">E</button>`;
        target.append(div);
        document.querySelector(".edit").addEventListener("click", edit)
    }
    else{
        return;
    }
}
editSetup();
