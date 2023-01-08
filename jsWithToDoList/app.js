const input = document.querySelector('.todoİnput')
const form = document.querySelector('.todoForm')
const ul = document.querySelector('.list-group')
// const deletedButton = document.querySelector('.deleted') <--- If I try to reach the Delete button in this way, it will return null because the codes go from top to bottom, html tags will occur on line 51. For this reason, let's access the delete button after that line.

let deletedButton;
let completedButton;
let editBtn;

// Function with html tags  
const addHtmlTag = (todo)=>{
    const domLi = document.createElement('li');
    domLi.classList.add('listt');

    const todoTitlediv = document.createElement('div');
    todoTitlediv.classList.add('listTitle');
    domLi.appendChild(todoTitlediv);

    const todoTitle = document.createElement('h6');
    todoTitle.innerText= todo.text
    todoTitlediv.appendChild(todoTitle);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttons');

    domLi.appendChild(buttonDiv)
    // complete button & icon
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('completed');
    const completedİcon = document.createElement('i');
    completedİcon.classList.add('fa-solid' ,'fa-hands');
    
    completedBtn.appendChild(completedİcon);
    // edit button & icon
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    const editİcon = document.createElement('i');
    editİcon.classList.add('fa-regular' , 'fa-pen-to-square');
    
    editBtn.appendChild(editİcon);
    // deleted button & icon
    const deletedBtn = document.createElement('button');
    deletedBtn.classList.add('deleted');
    const deletedİcon = document.createElement('i');
    deletedİcon.classList.add('fa-regular' , 'fa-trash-can');

    deletedBtn.appendChild(deletedİcon);

    buttonDiv.appendChild(completedBtn);
    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(deletedBtn);

    ul.appendChild(domLi);
}

// we pulled data from LG as initial value
const ınıtıalValues = ()=>{
    const todosFromLS = JSON.parse(localStorage.getItem("todos"))
    if(!todosFromLS){
        localStorage.setItem("todos",JSON.stringify([]))
    }else{ // If there is data in ls
        todosFromLS.map((todo)=>{
            addHtmlTag(todo) // html taglarımzıı olusturduktan sonra butonlara erısım saglıyoruz.
        });
        deletedButton = document.querySelectorAll('.deleted')  // We accessed the button elements in the todos we created.

        completedButton=document.querySelectorAll('.completed')
        
        editBtn = document.querySelectorAll('.edit')
        
    }
    
};

ınıtıalValues();

const addToDo = (e)=>{
    e.preventDefault();
    
    const todoText = input.value

    const todo = {
        text : todoText,
        isCompleted  : false,
    }
    

    const todosFromLS = JSON.parse(localStorage.getItem("todos")) //pulled data from local repositories
    todosFromLS.push(todo); // Pushing the entered value to the todosFromLS array
    localStorage.setItem("todos",JSON.stringify(todosFromLS)) // We are sending the current version of the array back to LS.
    
    addHtmlTag(todo)

    input.value=""
}


form.addEventListener("submit",addToDo)


const deleteToDo = (e)=>{
    const todo = e.target.parentNode.parentNode.parentNode // Here we reached the list tag with parent
    const todoText = todo.firstChild.textContent // we have reached the text of our todo

    //When we click the delete button, we want it to be deleted from local storage as well. For this, let's call our todos from localstorage.

    let todosLs = JSON.parse(localStorage.getItem("todos"))
    todosLs = todosLs.filter((tdls)=>{
       return tdls.text !== todoText
    })
    localStorage.setItem("todos",JSON.stringify(todosLs))
    todo.remove()  
}

const completedToDo = (e)=>{
    const todo = e.target.parentNode.parentNode.parentNode
    const todoTextContent = todo.firstChild.textContent
    const todoText = todo.firstChild

    let todosLs = JSON.parse(localStorage.getItem("todos"))

    todosLs.map((tdls)=>{
       if(todoTextContent===tdls.text){ // localstorages ıcerısınde todotextcontenti aradık eğer varsa is completed i önceki degerın tersıne esıtledık. 
        tdls.isCompleted   = !tdls.isCompleted 
       }
       if(tdls.text===todoTextContent){
        tdls.isCompleted ? todoText.classList.add('textLine') : todoText.classList.remove('textLine')
       }
    })
    
    // yenı halı ls ye kaydettık. 
    localStorage.setItem("todos",JSON.stringify(todosLs))
    
    
}

const editToDo = (e)=>{
    const todo = e.target.parentNode.parentNode.parentNode;
    const todoText = todo.firstChild.textContent;

    let todosLs = JSON.parse(localStorage.getItem("todos"))
    todosLs = todosLs.filter((tdls)=>{
       return tdls.text !== todoText
    })
    localStorage.setItem("todos",JSON.stringify(todosLs))
    todo.remove()  

    input.value = todoText;
}


//We returned the delete buttons with the forEach function and added an click event to each of them.
deletedButton.forEach(btn => {
    btn.addEventListener("click",deleteToDo)
});

completedButton.forEach(btn=>{
    btn.addEventListener("click",completedToDo)
})

editBtn.forEach(btn=>{
    btn.addEventListener("click",editToDo)
})