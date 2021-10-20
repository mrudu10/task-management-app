const taskContainer = document.querySelector(".task__container");
let globalStore = [];//array of objects
console.log(taskContainer);
// whenever we have event as parameter we should use apply 

const generateNewCard = (taskData) => `
  <div class="col-sm-12 col-md-6 col-lg-4">
  <div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
   <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
  <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
  </div>
  <div class="card-body">
  <img class="card-img-top" src=${taskData.imageUrl} alt="...">
   <h5 class="card-title mt-3 fw-bolder text-primary">${taskData.taskTitle}</h5>
   <p class="card-text">${taskData.taskDescription}</p>
   <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  </div>
  </div>
  `;



const loadInitialCardData=()=>{
  //get the stored card data

  const getCardData = localStorage.getItem("tasky");

  //we got the array of data so we should convert it into normal object
  const {cards} = JSON.parse(getCardData);

  //destructuring from array of objects to object of objects and storing it into cards


  //update our global storage
//syntax of map function is cards.map((e)=>{})
cards.map((cardObject) => {
  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

  //update our globalStore
  globalStore.push(cardObject);
}

)

};



//delete function
//when we press a button on some card then that activty is called as an event
//the parent of event is window

// const deleteCard=(event)=>{

//   event=window.event;
//   const targetID=event.target.id;//target => oin what particular thing the event is triggered
//   const tagname=event.target.tagName;
//   globalStore=globalStore.filter((cardObject)=>
//   {
//     cardObject.id!==targetID;//if the card has a target id that is not delete then we should push it into global store
  
// })
//   //whatever changes are made now we should push that into local storage
//   localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
//   if(tagname==='BUTTON')
//   {
//    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);//button
//   }
//   else{
//    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);//fas fa icon
    
//   }
// };


const deleteCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

  if(tagname === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  } else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};






const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value
  };

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStore.push(taskData);

// localStorage.setItem("Tasky",globalStore);
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
  
  };
  



//go to applications, storage, local storage... this will show key and objects pair.
//  the objects are displayed as [object objects] coz the values are stored as object of objects but we need array of objects.
// hence we will convert object of objects to array of objects using JSON.stringify(key:value)





//API is application programming interface
//local storage is accessing application via local storage
//interface middle man
//for that purpose,to store the data, we are using an array ie Global storage
//setItem in localStorage is to implement the data that we want to enable for storing locally
//we cant push the data directly into local storage so we are using a data type- an array(globalstore_) to push the data into localstorage 
//now for the local storage when we push it into a storage named in a particular way,
//  there is a possibility that other datas of same name can also be pushed so we should give an id for that which is tasky in our case 
// localStorage.setItem("Tasky",globalStore);
