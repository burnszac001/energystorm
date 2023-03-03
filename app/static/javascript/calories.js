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
        this.elemId = `food-item-${this.id}`;
    }


    displayNutritionItem () {
        const newElem = document.createElement(`div`);
        let textElem = document.createTextNode(`${this.name}: ${this.calories} calories`);
        newElem.appendChild(textElem);
        const btn = document.createRange().createContextualFragment(
            `<button onclick="tracker.deleteFoodItem(${this.#id})">Delete</button>`
        );
        newElem.appendChild(btn);
        newElem.setAttribute("id", this.elemId);

        const foodItemsElem = document.getElementById("food-items");
        foodItemsElem.appendChild(newElem);
    }


    deleteSelf () {
        const self = document.getElementById(this.elemId);
        self.parentNode.removeChild(self);
    }


    addCalories () {}
}


class NutritionTracker {
    calorieGoal;
    proteinGoal;
    remainingCalories;
    remainingProtein;
    #nutritionItemsSize = 0;
    #nutritionItems = [];


    constructor (calories, protein) {
        this.calorieGoal = calories;
        this.remainingCalories = this.calorieGoal;
        this.proteinGoal = protein;
    }


    displayCalorieGoal() {
        const calorieGoalEl = document.querySelector("#calorie-goal");
        calorieGoalEl.innerHTML = `${this.calorieGoal}`;
    }


    displayRemainingCalories () {
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
        this.displayRemainingCalories();
    }


    addFoodItem () {
        const itemElems = document.getElementsByClassName("add-food-item");

        const nutritionItem = new NutritionItem(itemElems[0].value, itemElems[1].value, this.#nutritionItemsSize)
        nutritionItem.displayNutritionItem();
        this.#nutritionItems.push(nutritionItem);
        this.#nutritionItemsSize++;

        this.remainingCalories -= nutritionItem.calories;
        this.displayRemainingCalories();        
    }


    deleteFoodItem (index) {
        const nutritionItem = this.#nutritionItems[index];
        this.remainingCalories += nutritionItem.calories;
        this.displayRemainingCalories();
        nutritionItem.deleteSelf();
        this.#nutritionItems.splice(index, 1);
        this.#nutritionItemsSize--;
    }


}


const tracker = new NutritionTracker(2000, 50);
tracker.displayCalorieGoal();
tracker.displayRemainingCalories();