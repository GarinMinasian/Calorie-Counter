document.addEventListener('DOMContentLoaded', () => {
    const meals = [];
    const mealForm = document.getElementById('meal-form');
    const mealsList = document.getElementById('meals');
    const totalCaloriesEl = document.getElementById('total-calories');
    const progressBar = document.querySelector('.progress-bar');
    const calorieGoalInput = document.getElementById('calorie-goal');
  
    let calorieGoal = 2000;
  
    calorieGoalInput.addEventListener('input', (e) => {
      calorieGoal = parseInt(e.target.value, 10) || 2000;
      updateProgress();
    });
  
    mealForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const mealName = document.getElementById('meal-name').value;
      const calorieCount = parseInt(document.getElementById('calorie-count').value, 10);
      const mealCategory = document.getElementById('meal-category').value;
  
      const meal = { name: mealName, calories: calorieCount, category: mealCategory };
      meals.push(meal);
  
      updateUI();
      mealForm.reset();
    });
  
    function updateUI() {
      mealsList.innerHTML = '';
      let totalCalories = 0;
  
      meals.forEach((meal, index) => {
        totalCalories += meal.calories;
  
        const li = document.createElement('li');
        li.innerHTML = `
          ${meal.name} (${meal.category}): ${meal.calories} cal
          <button onclick="deleteMeal(${index})">Delete</button>
        `;
        mealsList.appendChild(li);
      });
  
      totalCaloriesEl.textContent = totalCalories;
      updateProgress(totalCalories);
    }
  
    window.deleteMeal = function(index) {
      meals.splice(index, 1);
      updateUI();
    };
  
    function updateProgress(totalCalories = 0) {
      const percentage = Math.min((totalCalories / calorieGoal) * 100, 100);
      progressBar.style.width = `${percentage}%`;
    }
  });
  