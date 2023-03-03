function showItem (id) {
    itemEl = document.querySelector(`#${id}`);
    itemEl.style.display = "block";
}

function hideItem (id) {
    itemEl = document.querySelector(`#${id}`);
    itemEl.style.display = "none";
}

class FoodItem {
    name;
    calories;
    elemId;
    #id;

    constructor (foodName, calorieAmount, id) {
        this.name = foodName;
        this.calories = Number(calorieAmount);
        this.#id = id;
        this.elemId = `food-item-${this.id}`;
    }

    displayFoodItem () {
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


class CalorieTracker {
    dailyCalorieGoal;
    remainingCalories;
    #foodItemsSize = 0;
    #foodItems = [];

    constructor (goal) {
        this.dailyCalorieGoal = goal;
        this.remainingCalories = goal;
    }

    displayRemainingCalories () {
        const remainingCaloriesElem = document.getElementById("calories-remaining");
        remainingCaloriesElem.innerHTML = `${tracker.remainingCalories}`;
    }


    updateCalorieGoal () {
        const goalInputEl = document.querySelector("#goal-input");
        const calorieGoalEl = document.querySelector("#calorie-goal");

        this.remainingCalories -= (this.dailyCalorieGoal - goalInputEl.value);
        this.dailyCalorieGoal = goalInputEl.value;
        calorieGoalEl.innerHTML = `${this.dailyCalorieGoal}`;

        hideItem('setCalorieGoal');
        showItem('change-btn');
        this.displayRemainingCalories();
    }


    addFoodItem () {
        const itemElems = document.getElementsByClassName("add-food-item");

        const foodItem = new FoodItem(itemElems[0].value, itemElems[1].value, this.#foodItemsSize)
        foodItem.displayFoodItem();
        this.#foodItems.push(foodItem);
        this.#foodItemsSize++;

        this.remainingCalories -= foodItem.calories;
        this.displayRemainingCalories();        
    }

    deleteFoodItem (index) {
        const foodItem = this.#foodItems[index];
        this.remainingCalories += foodItem.calories;
        this.displayRemainingCalories();
        foodItem.deleteSelf();
        this.#foodItems.splice(index, 1);
    }

}

const tracker = new CalorieTracker(2000);
const calorieGoalEl = document.querySelector("#calorie-goal");
calorieGoalEl.innerHTML = `${tracker.dailyCalorieGoal}`;
tracker.displayRemainingCalories();