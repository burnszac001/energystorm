function showItem (id) {
    itemEl = document.querySelector(`#${id}`);
    itemEl.style.display = "block";
}

function hideItem (id) {
    itemEl = document.querySelector(`#${id}`);
    itemEl.style.display = "none";
}

class NutritionItem {
    name;
    calories;
    elemId;
    #id;


    constructor (name, calories, id) {
        this.name = name;
        this.calories = Number(calories);
        this.#id = id;
        this.elemId = `nutrition-item-${this.#id}`;
    }


    displayNutritionItem () {
        const table = document.querySelector("#nutrition-items");
        const row = table.insertRow(this.#id + 1);
        row.insertCell(0).innerHTML = `<button onclick="tracker.deleteFoodItem(${this.#id})">Remove</button>`;
        row.insertCell(1).innerHTML = this.name;
        row.insertCell(2).innerHTML = this.calories;
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
    proteinGoal;
    remainingCalories;
    remainingProtein;
    #nutritionItemsSize = 0;
    #nutritionItems = new Map();


    constructor (calories, protein) {
        this.calorieGoal = calories;
        this.remainingCalories = this.calorieGoal;
        this.proteinGoal = protein;
    }


    displayCalorieGoal() {
        const calorieGoalEl = document.querySelector("#calorie-goal");
        calorieGoalEl.innerHTML = `${this.calorieGoal}`;
    }


    updateDisplayInfo () {
        const remainingsRow = document.querySelector("#remainings-row");
        const totalsRow = document.querySelector("#totals-row");
        remainingsRow.cells[2].innerHTML = tracker.remainingCalories;
        totalsRow.cells[2].innerHTML = tracker.totalCalories;
        const remainingCaloriesElem = document.getElementById("calories-remaining");
        remainingCaloriesElem.innerHTML = `${tracker.remainingCalories}`;
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
        const itemElems = document.getElementsByClassName("add-food-item");

        const nutritionItem = new NutritionItem(itemElems[0].value, itemElems[1].value, this.#nutritionItemsSize)
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
        this.updateDisplayInfo();
        nutritionItem.deleteSelf();
        this.#nutritionItems.delete(`nutrition-item-${id}`);
        this.#nutritionItemsSize--;
    }


}


const tracker = new NutritionTracker(2000, 50);
tracker.displayCalorieGoal();
tracker.updateDisplayInfo();