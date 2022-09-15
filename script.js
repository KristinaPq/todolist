// getting all required elements получение всех необходимых элементов
const inputBox = document.querySelector(".inputField input"); /*поиск HTML-элементов по CSS-селектору. При этом querySelector выбирает один элемент, а querySelectorAll – все.*/
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// onkeyup event
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; //getting user entered value получение введенного пользователем значения
  if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces если значение пользователя не только пробелы
    addBtn.classList.add("active"); //active the add button активировать кнопку добавления
  }else{
    addBtn.classList.remove("active"); //unactive the add button
  }
}

showTasks(); //calling showTask function  вызов функции showTask

addBtn.onclick = ()=>{ //when user click on plus icon button
  let userEnteredValue = inputBox.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage получение локального хранилища
  if(getLocalStorageData == null){ //if localstorage has no data если в локальном хранилище нет данных
    listArray = []; //create a blank array создать пустой массив
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object преобразование строки json в объект js
  }
  listArray.push(userEnteredValue); //pushing or adding new value in array нажатие или добавление нового значения в массив
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string преобразование объекта js в строку json
  showTasks(); //calling showTask function
  addBtn.classList.remove("active"); //unactive the add button once the task added неактивная кнопка добавления после добавления задачи
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  }else{
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag добавление нового тега li внутри тега ul
  inputBox.value = ""; //once task added leave the input field blank после добавления задачи оставьте поле ввода пустым
}

// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}