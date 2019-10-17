/**
 * this app uses module pattern
 */
//storage controller
// const StorageCtrl = (function(){

//   //public methods
//   return {
//     storeItem: function(item){
//       let items;
//       //check if any items in localstprage
//       if(localStorage.getItem('items'===null)){
//         items = [];
//         //push new item
//         items.push(item)
//         //set the items back to localstorage
//         localStorage.setItem('items', JSON.stringify(items));//localstorage only takes strings
//       }else{
//         items = JSON.parse(localStorage.getItem('items'));
//         //push the new item
//         items.push(item)
//         //re set LS
//         localStorage.setItem('items', JSON.stringify(items));
//       }
//     },
//     getItemsFromStorage: function(){
//       let items;
//       if(localStorage.getItem('items'===null)){
//         items = []
//       }else{
//         items = JSON.parse(localStorage.getItem('items'))
//       }
//       return items;
//     },
//     updateItemStorage: function(updatedItem){
//       let items = JSON.parse(localStorage.getItem('items'))
//       items.forEach((item,index)=>{
//         if(updatedItem.id===item.id){
//           items.splice(index,1,updatedItem)
//         }
//         //re set LS
//         localStorage.setItem('items', JSON.stringify(items));
//       })
//     },
//     deleteItemFromStorage: function(id){
//       let items = JSON.parse(localStorage.getItem('items'))
//       items.forEach((item,index)=>{
//         if(item.id===id){
//           items.splice(index,1)
//         }
//         //re set LS
//         localStorage.setItem('items', JSON.stringify(items));
//       })
//     },
//     clearAllFromStorage: function(){
//       localStorage.removeItem('items')
//     }
//   }
// })()

//item controller
const ItemCtrl = (function(){
  //item constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
  //data structure/state
  const data = {
    items: [
      // {id:0, name: 'steak dinner' , calories: 122},
      // {id:1, name: 'acai bowl', calories: 2334},
      // {id:2, name: 'amala and egusi', calories: 234},
      // {id:3, name: 'abula and semo', calories: 1234},
    ],
    //items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  }
  //public
  return {

    getItems: function(){
      return data.items;
    },
    getItemById: function(id){
      let found = null;
      //loop through the items
      data.items.forEach((item)=>{
        if(item.id===id){
          found=item;
        }
        
      })
      return found;
    },
    setCurrentItem: function(item){
      data.currentItem = item;
    },
    getCurrentItem: function(){
      return data.currentItem;
    },
    getTotalCalories: function(){
      let total = 0;
      //loop through items and add cal
      data.items.forEach((item)=>{
        total+=item.calories
      })

      //set this value to totalcalories val in data
      data.totalCalories = total;
      return data.totalCalories
    },
    addItems: function(name, calories){
      //console.log(name, calories)
      let ID;

      //create ID
      if(data.items.length>0){
        ID=data.items[data.items.length-1].id+1;
      }else{
        ID=0;
      }
      //caalories to number
       calories = parseInt(calories)
       const newItem = new Item(ID,name,calories)
       //add to items array
       data.items.push(newItem)
       return newItem;
    },
    updateItem: function(name, calories){
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id){
      const ids = data.items.map((item)=>{
        return item.id
      })
      //get the index
      const index = ids.indexOf(id)
      //remove item
      data.items.splice(index,1);
    },
    clearAllItems: function(){
      data.items=[]
    },
    logData: function(){
      return data
    }
  }
})()


//UI controller
const UICtrl = (function(){
  const UIselectors = {
    itemlists: '#item-list',
    listItem: '#item-list li',
    addBtn: '.add-btn',
    deleteBtn: '.delete-btn',
    updateBtn: '.update-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCalInput: '#item-calories',
    totalCalories: '.total-calories',
    clearAllBtn: '.clear-btn'
  }
  return{
    populateItemList: function(items){
      let html=''
      items.forEach(item => {
        html += `
      <li class="collection-item" id="item-${item.id}" >
        <strong>${item.name}</strong> <em>${item.calories} calories</em>
        <a href="" class="secondary-content">
          <i  class="fa fa-pencil edit-item"></i>
        </a>
      </li>
        `
      });
      //insert list items
      document.querySelector(UIselectors.itemlists).innerHTML = html
    },
    getItemInput: function(){
      return {
        name: document.querySelector(UIselectors.itemNameInput).value,
        calories: document.querySelector(UIselectors.itemCalInput).value
      }
    },
    addListItem: function(item){
      //show the list
      document.querySelector(UIselectors.itemlists).style.display = 'block'
      //create li element
      const li = document.createElement('li')
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      //html
      li.innerHTML = `
        <strong>${item.name}</strong> <em>${item.calories} calories</em>
        <a href="" class="secondary-content">
          <i  class="fa fa-pencil edit-item"></i>
        </a>
      `
      //insert item
      document.querySelector(UIselectors.itemlists).insertAdjacentElement('beforeend',li )

    },
    updateListItem: function(item){
      let listItems = document.querySelectorAll(UIselectors.listItem); //gives us a nodelist. we cant loop through it

      //turn nodelist to array
      listItems = Array.from(listItems);
      listItems.forEach((listItem)=>{
        const itemID = listItem.getAttribute('id');
        if(itemID===`item-${item.id}`){
          console.log(document.querySelector(`#${itemID}`))
          document.querySelector(`#${itemID}`).innerHTML = `
            <strong>${item.name}</strong> <em>${item.calories} calories</em>
            <a href="" class="secondary-content">
              <i  class="fa fa-pencil edit-item"></i>
            </a>
          `;
        }
      })
    },
    deleteListItem: function(id){
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove()
      //get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //add total calories to the ui(show it)
      UICtrl.showTotalCalories(totalCalories);
      //clear inputs 
      UICtrl.clearEditState()
    },
    removeAllItems:function(){
      let listItems = document.querySelectorAll(UIselectors.itemlists);
      //turn node list into array
      listItems = Array.from(listItems)
      listItems.forEach((item)=>{
        item.remove()
      })
      
    },
    addItemToForm: function(){
      document.querySelector(UIselectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UIselectors.itemCalInput).value = ItemCtrl.getCurrentItem().calories;
      //show the edit buttons
      UICtrl.showEditState()
    },
    showTotalCalories: function(total){
      document.querySelector(UIselectors.totalCalories).textContent = total
    },
    showEditState: function(){
      document.querySelector(UIselectors.updateBtn).style.display = 'inline';
      document.querySelector(UIselectors.deleteBtn).style.display = 'inline';
      document.querySelector(UIselectors.backBtn).style.display = 'inline';
      document.querySelector(UIselectors.addBtn).style.display = 'none';
    },
    hideList: function(){
      document.querySelector(UIselectors.itemlists).style.display = 'none';
    },
    clearInput: function(){
      document.querySelector(UIselectors.itemNameInput).value = '';
      document.querySelector(UIselectors.itemCalInput).value = '';
    },
    clearEditState: function(){
      UICtrl.clearInput()
      document.querySelector(UIselectors.updateBtn).style.display = 'none';
      document.querySelector(UIselectors.deleteBtn).style.display = 'none';
      document.querySelector(UIselectors.backBtn).style.display = 'none';
      document.querySelector(UIselectors.addBtn).style.display = 'inline';
    },
    getSelectors: function(){
      return UIselectors;
    }
  }
})()

//app controller(which is the main controller). all other ctrl are passed in as params
const AppCtrl = (function(ItemCtrl,UICtrl){
  // console.log(ItemCtrl.logData())
  /**
   * load event listeners
   */
  const loadEventListeners = function(){
    //acsess all selectors from the ui conttrl
      const uIselectors = UICtrl.getSelectors()

      //add item event
      document.querySelector(uIselectors.addBtn).addEventListener('click', itemAddSubmit);

      //disable submit on enter key
      document.addEventListener('keypress', function(e){
        if(e.keyCode===13||e.which===13){ //13 is the ASCI code for enter
          e.preventDefault()
          return false
        }
      })

      //edit icon click event
      document.querySelector(uIselectors.itemlists).addEventListener('click',itemEditClick);
      
      //update item event
      document.querySelector(uIselectors.updateBtn).addEventListener('click', itemUpdateSubmit)
      //back button event
      document.querySelector(uIselectors.backBtn).addEventListener('click', UICtrl.clearEditState())
      //update item event
      document.querySelector(uIselectors.deleteBtn).addEventListener('click', itemDeleteSubmit)
      //clear all btn event
      document.querySelector(uIselectors.clearAllBtn).addEventListener('click', clearAllItemsClick)

  }
  //add item submit
  const itemAddSubmit = function(e){
    //console.log('add')

    //get form input from UI controller
    const input = UICtrl.getItemInput()
    //console.log(input)

    //check for item and calorie 
    if(input.name!=='' && input.calories!==''){
      //add item
      const newItem = ItemCtrl.addItems(input.name, input.calories);

      //add item to ui list
      UICtrl.addListItem(newItem)

      //get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //add total calories to the ui(show it)
      UICtrl.showTotalCalories(totalCalories);

      //store in localstorage
      //StorageCtrl.storeItem(newItem)

      //clear ui input fields
      UICtrl.clearInput()
    }

    e.preventDefault()
  }
  //click edit item
  const itemEditClick = function(e){
   if(e.target.classList.contains('edit-item')){
     //get list item id (item-0 etc)
     const listId = e.target.parentNode.parentNode.id;
    // console.log(listId)
    //break this value into an array
    const listIdArr = listId.split('-');
    //get the actual id
    const id = parseInt(listIdArr[1]);

    //get item
    const itemToEdit = ItemCtrl.getItemById(id);
    //console.log(itemToEdit)
    //set currentitem
    ItemCtrl.setCurrentItem(itemToEdit)
    //add item to form
    UICtrl.addItemToForm()

   }
  
    e.preventDefault()
  }
  //update item 
 const itemUpdateSubmit = function (e){
    // console.log('update')
    //get item input
    const input=UICtrl.getItemInput()
    //update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    //update the UI
    UICtrl.updateListItem(updatedItem)

    //get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //add total calories to the ui(show it)
    UICtrl.showTotalCalories(totalCalories);
    //update local storage
    //StorageCtrl.updateItemStorage(updatedItem)
    //clear inputs 
    UICtrl.clearEditState()
    e.preventDefault()
  }
  //delete item
  const itemDeleteSubmit = function(e){
    //get current item
    const currentItem = ItemCtrl.getCurrentItem()
    //delete from data structure
    ItemCtrl.deleteItem(currentItem.id)
    //delete item from UI
    UICtrl.deleteListItem(currentItem.id)
    //get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //add total calories to the ui(show it)
    UICtrl.showTotalCalories(totalCalories);
    //delete item from LS
    //StorageCtrl.deleteItemFromStorage(currentItem.id)
    e.preventDefault()
  }
  //clear all items on click
  const clearAllItemsClick = function(e){
   //delete all items from data structure
   ItemCtrl.clearAllItems()
   //get total calories
   const totalCalories = ItemCtrl.getTotalCalories();
   //add total calories to the ui(show it)
   UICtrl.showTotalCalories(totalCalories);
   
   //remove all items from UI
   UICtrl.removeAllItems()
   //remove all items from LS
   //StorageCtrl.clearAllFromStorage()
   //hide ui
   UICtrl.hideList()
   
    e.preventDefault()
  }

  //things that happen when the app is loaded
  return{
    init: function(){
      console.log('initialising app...')
      //clear edit state/ set initial state
      UICtrl.clearEditState()
      //fetch items from itemlctrl
      const items = ItemCtrl.getItems();
     // console.log(items)

     //check if there are items
     if(items.length!==0){
      //populate list with items
      UICtrl.populateItemList(items)
     }else{
       UICtrl.hideList()
     }

    //get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //add total calories to the ui(show it)
    UICtrl.showTotalCalories(totalCalories);

     //load event listeneers
     loadEventListeners()
    }
  }
})(ItemCtrl,UICtrl)

AppCtrl.init()