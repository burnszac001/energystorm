function showItem (id) {
    itemEl = document.querySelector(`#${id}`);
    itemEl.style.display = "block";
}

function hideItem (id) {
    itemEl = document.querySelector(`#${id}`);
    itemEl.style.display = "none";
}

class FoodItem {
    #name;
    #calories;

    constructor (foodName) {
        this.#name = foodName;
    }

    addCalories () {}
}


class CalorieTracker {
    dailyCalorieGoal;
    #foodItems = [];

    constructor (goal) {
        this.dailyCalorieGoal = goal;
    }

    updateCalorieGoal () {
        const goalInputEl = document.querySelector("#goal-input");
        const calorieGoalEl = document.querySelector("#calorie-goal");
        this.dailyCalorieGoal = goalInputEl.value;
        calorieGoalEl.innerHTML = `${this.dailyCalorieGoal}`;
        hideItem('setCalorieGoal');
        showItem('change-btn');
    }

    addFoodItem () {
        newFoodItem = new FoodItem(foodName);
        this.#foodItems.push(newFoodItem);
    }
}

const tracker = new CalorieTracker(2000);
const calorieGoalEl = document.querySelector("#calorie-goal");
calorieGoalEl.innerHTML = `${tracker.dailyCalorieGoal}`;