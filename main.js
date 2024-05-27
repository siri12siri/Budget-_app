'use strict';
let totalAmount = document.querySelector("#total-amount");
let userAmount = document.querySelector(".user-amount");
const checkAmount = document.querySelector("#check-amount");
const totalAmountButton = document.querySelector("#total-amount-button");
const productTitle = document.querySelector(".product-title");
const budgetError  = document.querySelector("#budget-error");
const productTitleError = document.querySelector("#product-title-error");

const amount = document.querySelector("#amount");
const expenditureValue = document.querySelector("#expenditure-value");
const balanceAmount = document.querySelector("#balance-amount");
const list = document.querySelector("#list");
let tempAmount = 0;

 //setting the budget part
  totalAmountButton.addEventListener("click", () => {
    
    tempAmount = totalAmount.value;
   // empty or the negative value
   if (tempAmount === "" || tempAmount < 0) {
    budgetError.classList.remove("hide");
   } 
   else 
   {
    budgetError.classList.add("hide");
   
   // set budget
   amount.innerHTML = tempAmount;

   // set balance
   balanceAmount.innerText = tempAmount - expenditureValue.innerText;
   // clear the input box
   totalAmount.value = "";
   }
});

// function to disable edit and delete button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
         element.disabled = bool;
    });
};

//function to modify list elements
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceAmount.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;

    if(edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceAmount.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};


// Function to Create List💲
const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class ="product">${expenseName}</p><p class ="amount">${expenseValue}</p>`;
    
    // edit button

    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-user-pen", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });

     // delete button

     let deleteButton = document.createElement("button");
     deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
     deleteButton.style.fontSize = "1.2em";
     deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
     });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
 
};

// function to add the expenses

checkAmount.addEventListener("click", () => {
    
    if(!userAmount.value  || !productTitle.value){
        productTitleError.classList.remove("hide");
        return false;
    } 
    // set expanses
    //userAmount.innerHTML = expenditureValue;
   
    //Enable buttons
    disableButtons(false);
    //expense
    let expenditure = parseInt(userAmount.value);
      
    // total expenes (present(expanses) + new)
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;

    // total balance (budget - total expenses)
     const totalBalance = tempAmount - sum;
     balanceAmount.innerText = totalBalance;
     
    // create list
     listCreator(productTitle.value, userAmount.value);

    // empty inputs
    // clear the title field
    productTitle.value = "";
    // clear the input box
    userAmount.value = "";
});



