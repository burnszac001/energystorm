class NutritionItem {
    name;
    calories;
    protein;
    elemId;
    #id;


    constructor (name, calories, protein, id) {
        this.name = name;
        this.calories = Number(calories);
        this.protein = protein;
        this.#id = id;
        this.elemId = `nutrition-item-${this.#id}`;
    }


    displayNutritionItem () {
        const table = document.querySelector("#nutrition-items");
        const row = table.insertRow(this.#id + 1);
        row.insertCell(0).innerHTML = `<button onclick="tracker.deleteFoodItem(${this.#id})">Remove</button>`;
        row.insertCell(1).innerHTML = this.name;
        row.insertCell(2).innerHTML = this.calories;
        row.insertCell(3).innerHTML = `${this.protein}g`;
        row.setAttribute("id", this.elemId);
    }


    deleteSelf () {
        const self = document.getElementById(this.elemId);
        self.parentNode.removeChild(self);
    }


    addCalories () {}
}

class NutritionTracker {
    calorieGoal;
    totalCalories = 0;
    remainingCalories = this.calorieGoal - this.totalCalories;
    #totalCaloriesElem = document.querySelector("#totalCalories");
    #remainingCaloriesElem = document.querySelector("#remainingCalories");

    proteinGoal;
    totalProtein = 0;
    remainingProtein = this.proteinGoal - this.totalProtein;
    #totalProteinElem = document.querySelector("#totalProtein");
    #remainingProteinElem = document.querySelector("#remainingProtein");
    
    #nutritionItemsSize = 0;
    #nutritionItems = new Map();

    
    


    constructor () {}


    displayCalorieGoal() {
        const calorieGoalEl = document.querySelector("#calorie-goal");
        calorieGoalEl.innerHTML = `${this.calorieGoal}`;
    }


    updateDisplayInfo () {
        const remainingsRow = document.querySelector("#remainings-row");
        const totalsRow = document.querySelector("#totals-row");

        remainingsRow.cells[2].innerHTML = this.remainingCalories;
        totalsRow.cells[2].innerHTML = this.totalCalories;

        remainingsRow.cells[3].innerHTML = this.remainingProtein;
        totalsRow.cells[3].innerHTML = this.totalProtein;

        const remainingCaloriesElem = document.getElementById("calories-remaining");
        remainingCaloriesElem.innerHTML = `${this.remainingCalories}`;

        const remainingProteinElem = document.querySelector("#proteinRemaining");
        remainingProteinElem.innerHTML = `${this.remainingProtein}`;
    }


    updateCalorieGoal () {
        const goalInputEl = document.querySelector("#goal-input");
        const calorieGoalEl = document.querySelector("#calorie-goal");

        this.remainingCalories -= (this.calorieGoal - goalInputEl.value);
        this.calorieGoal = goalInputEl.value;
        calorieGoalEl.innerHTML = `${this.calorieGoal}`;

        hideItem('setCalorieGoal');
        showItem('change-btn');
        this.updateDisplayInfo();
    }


    addFoodItem () {
        event.preventDefault();
        const itemElems = document.getElementsByClassName("add-food-item");

        const nutritionItem = new NutritionItem(itemElems[0].value, itemElems[1].value, itemElems[2].value, this.#nutritionItemsSize);

        this.addToDatabase(nutritionItem);

        nutritionItem.displayNutritionItem();
        this.#nutritionItems.set(`nutrition-item-${this.#nutritionItemsSize}`, nutritionItem);
        this.#nutritionItemsSize++;

        this.totalCalories += nutritionItem.calories;
        this.remainingCalories -= nutritionItem.calories;
        this.totalProtein += nutritionItem.protein;
        this.remainingProtein -= nutritionItem.protein;
        this.updateDisplayInfo();    
    }


    addToDatabase(nutritionItem) {
        // const response = fetch('/tracker/day/add', {
        //     method: "POST", 
        //     body: JSON.stringify({ name: name, calories: calories })
        // })
    }


    displayItemFromDatabase (item) {
        const nutritionItem = new NutritionItem(item.name, item.calores, this.#nutritionItemsSize);
        nutritionItem.displayNutritionItem();
        this.#nutritionItems.set(`nutrition-item-${this.#nutritionItemsSize}`, nutritionItem);
        this.#nutritionItemsSize++;

        this.totalCalories += nutritionItem.calories;
        this.remainingCalories -= nutritionItem.calories;
        this.updateDisplayInfo();   
    }


    deleteFoodItem (id) {
        const nutritionItem = this.#nutritionItems.get(`nutrition-item-${id}`);
        this.totalCalories -= nutritionItem.calories;
        this.remainingCalories += nutritionItem.calories;
        this.totalProtein -= nutritionItem.protein;
        this.remainingProtein += nutritionItem.protein;
        this.updateDisplayInfo();
        nutritionItem.deleteSelf();
        this.#nutritionItems.delete(`nutrition-item-${id}`);
        this.#nutritionItemsSize--;
    }
}


// ************************************************************************************* //
// *********************************** Page funtions *********************************** //
// ************************************************************************************* //


function showItem (id) {
    itemEl = document.querySelector(`#${id}`);
    itemEl.style.display = "block";
}


function hideItem (id) {
    itemEl = document.querySelector(`#${id}`);
    itemEl.style.display = "none";
}


function logout() {
    fetch('/auth/logout', {
        method: 'DELETE'
    }).then(() => (window.location.href = '/'));
}


// async function getTrackerObj(date) {
//     const trackerObj = await fetch('/tracker/day', {
//         method: "POST",
//         body: JSON.stringify({date: date}),
//         headers: { 'Content-type': 'application/json; charset=UTF-8' },
//     });
//     const body = await trackerObj.json();


//     return body;
// }


// async function getGoals() {
//     const goals = await fetch('/tracker/goals', {
//         method:"GET",
//         headers: { 'Content-type': 'application/json; charset=UTF-8' },
//     });
//     body = await goals.json();
//     return body;
// }




async function getDay(date) {
    const day = await fetch('/tracker/day', {
        method: "POST",
        body: JSON.stringify({date: date}), 
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    return await day.json();
}


async function displayDay (tracker, date) {
    const response = await getDay(date);
    const goals = response.goals;
    const day = response.day;

    tracker.calorieGoal = goals.calorieGoal;
    tracker.proteinGoal = goals.proteinGoal;
    tracker.remainingCalories = goals.calorieGoal;
    tracker.remainingProtein = goals.proteinGoal;

    tracker.displayCalorieGoal();
    tracker.updateDisplayInfo();

    console.log(day.nutritionItems);
}


const userDate = new Date();
const todaysDate = `${userDate.getDate()}-${userDate.getMonth() + 1}-${userDate.getFullYear()}`;
tracker = new NutritionTracker();
displayDay(tracker, todaysDate);
