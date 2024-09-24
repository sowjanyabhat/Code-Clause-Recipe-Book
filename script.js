document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const steps = document.getElementById('recipe-steps').value;
    const image = document.getElementById('recipe-image').files[0];

    const reader = new FileReader();
    reader.onloadend = function() {
        const recipe = {
            id: Date.now(),
            name,
            ingredients,
            steps,
            image: reader.result // Store the image as a Base64 string
        };
        addRecipeToLocalStorage(recipe);
        displayRecipes();
    }
    if (image) {
        reader.readAsDataURL(image);
    } else {
        const recipe = {
            id: Date.now(),
            name,
            ingredients,
            steps,
            image: '' // No image provided
        };
        addRecipeToLocalStorage(recipe);
        displayRecipes();
    }
});

function addRecipeToLocalStorage(recipe) {
    let recipes = localStorage.getItem('recipes');
    recipes = recipes ? JSON.parse(recipes) : [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function displayRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    recipes.forEach(recipe => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${recipe.name}</h3>
                         <p>${recipe.ingredients}</p>
                         <p>${recipe.steps}</p>
                         ${recipe.image ? '<img src="' + recipe.image + '" style="width:100px; height: auto;">' : ''}
                         <button onclick="deleteRecipe(${recipe.id})">Delete</button>`;
        recipeList.appendChild(div);
    });
}

function deleteRecipe(id) {
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    recipes = recipes.filter(recipe => recipe.id !== id);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}

window.onload = function() {
    displayRecipes();
}
