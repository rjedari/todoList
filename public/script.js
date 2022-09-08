let input = document.getElementById("myInput");
let addBtn = document.getElementById("addBtn");
let itemsContainer = document.querySelector(".todo-items");
let error = document.getElementById("error");
let noItem = document.getElementById('noItem');
let items = document.querySelectorAll(".todo-items")
let close = document.getElementById("close");
let land = document.getElementById("anime")
let todoItems = [];

setTimeout(function() {
    land.classList.remove("flex")
    land.classList.add("hidden")
}, 3000);



const majure = (text, status = false) => {


    if (itemsContainer.childElementCount === 1) {
        noItem.classList.add("hidden")
    }
    let div = document.createElement("div");
    div.classList.add('todo-item');
    let p = document.createElement("p");
    p.innerText = text;
    let btnDiv = document.createElement("div");
    let btnDone = document.createElement("button");
    let btnRemove = document.createElement("button");
    let unDo = document.createElement("button");
    unDo.classList.add('undo');
    unDo.innerText = "undo";
    btnDone.classList.add('btn-done');
    btnDone.innerText = "done";
    btnRemove.classList.add('btn-remove');
    btnRemove.innerText = "remove";
    div.appendChild(p);
    btnDiv.appendChild(btnDone);
    btnDiv.appendChild(btnRemove);
    btnDiv.appendChild(unDo);
    div.appendChild(btnDiv);
    itemsContainer.prepend(div);
    input.value = "";
    if (status) {
        div.classList.add("done-todo-item");
        btnDone.classList.add("hidden");
        btnRemove.classList.add("hidden");
    }
    btnDone.addEventListener("click", () => {
        const par = btnDone.parentElement.parentElement;
        par.classList.add("done-todo-item");
        btnDone.classList.add("hidden")
        btnRemove.classList.add("hidden")
        add(par.firstElementChild.innerText);

    })
    btnRemove.addEventListener("click", () => {
        const par = btnRemove.parentElement.parentElement;
        hazf(par.firstElementChild.innerText);
        par.classList.add("hidden");




    })
    unDo.addEventListener("click", () => {
        const par = btnRemove.parentElement.parentElement;
        par.classList.remove("done-todo-item");
        btnDone.classList.remove("hidden")
        btnRemove.classList.remove("hidden")




    })

    


}

const add = (code) => {
    const doo = todoItems.find(items => items.title === code);
    doo.status = true;

    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

const hazf = (code) => {
    const done = todoItems.findIndex(items => items.title === code);
    todoItems.splice(done, 1)
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}



const addItem = () => {
    const inputValue = input.value;
    try {
        if (inputValue === "") {
            throw { message: "fill the blanck space!" }

        } else {
            todoItems.push({
                title: inputValue,
                status: false

            })
            localStorage.setItem('todoItems', JSON.stringify(todoItems))
            majure(inputValue);







        }

    } catch (e) {

        error.classList.remove("hidden");
        error.classList.add("flex");
        close.addEventListener("click", () => {

            error.classList.remove("flex");
            error.classList.add("hidden")
                //   error.addEventListener("keypress", (event) => {
                // if (event.code === "Enter") {
                //     console.log(event);
                // }
                // })



        })





    }




};


const saveItems = () => {
    if (JSON.parse(localStorage.getItem("todoItems")) == undefined) {
        todoItems = [];
    } else
        todoItems = JSON.parse(localStorage.getItem("todoItems"));


    todoItems.forEach(element => {

        majure(element.title, element.status);
    });
}
addBtn.addEventListener("click", addItem);

input.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
        addItem()
    }
});
saveItems();