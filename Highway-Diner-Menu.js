// Define the menu items and prices
const menu = {
    breakfast: {
        starters: [
            { name: "Fruit Salad", price: 4.99 },
            { name: "Yogurt Parfait", price: 4.49 },
            { name: "Oatmeal", price: 4.49 }
        ],
        mains: [
            { name: "Pancakes", price: 8.99 },
            { name: "Omelette", price: 8.99 },
            { name: "French Toast", price: 7.99 }
        ],
        desserts: [
            { name: "Muffin", price: 3.99 },
            { name: "Danish", price: 4.49 },
            { name: "Cinnamon Roll", price: 5.99 }
        ]
    },
    lunch: {
        starters: [
            { name: "Bruschetta", price: 4.99 },
            { name: "Soup", price: 4.99 },
            { name: "Caesar Salad", price: 5.49 }
        ],
        mains: [
            { name: "Cheeseburger", price: 9.99 },
            { name: "BLT Sandwich", price: 8.99 },
            { name: "Chicken and Waffles", price: 10.49 }
        ],
        desserts: [
            { name: "Brownie", price: 5.99 },
            { name: "Ice Cream", price: 4.49 },
            { name: "Cheesecake", price: 5.99 }
        ]
    },
    dinner: {
        starters: [
            { name: "Tempura Shrimp", price: 6.99 },
            { name: "Stuffed Mushrooms", price: 5.99 },
            { name: "Caprese Salad", price: 4.99 }
        ],
        mains: [
            { name: "Steak", price: 19.99 },
            { name: "Veggie Burger", price: 11.99 },
            { name: "Pizza", price: 12.99 }
        ],
        desserts: [
            { name: "Tiramisu", price: 5.99 },
            { name: "Chocolate Cake", price: 4.99 },
            { name: "Panna Cotta", price: 5.49 }
        ]
    }
};

// Comment vault
const comments = {
    breakfast: {
        starters: [
            "The fruit salad is fresh and vibrant!",
            "Our yogurt parfait is a great start to your day.",
            "The oatmeal is hearty and healthy."
        ],
        mains: [
            "The pancakes are fluffy and delicious!",
            "Our omelette is packed with fresh vegetables.",
            "French Toast is a classic choice."
        ],
        desserts: [
            "The muffin is freshly baked.",
            "Our Danish is sweet and flaky.",
            "The cinnamon roll is warm and gooey."
        ]
    },
    lunch: {
        starters: [
            "The bruschetta is bursting with flavor!",
            "Our soup is always a hit.",
            "The Caesar salad is crisp and refreshing."
        ],
        mains: [
            "The cheeseburger is our most popular item!",
            "You can't go wrong with the BLT sandwich.",
            "Our chicken and waffle is a speciality."
        ],
        desserts: [
            "The brownie is rich and decadent.",
            "Our ice cream is creamy and delicious.",
            "The cheesecake is smooth and creamy."
        ]
    },
    dinner: {
        starters: [
            "The tempura shrimp is a great start to your meal.",
            "Stuffed mushrooms are a crowd favorite.",
            "The caprese salad is light and fresh."
        ],
        mains: [
            "The steak is cooked to perfection.",
            "Our veggie burger is a vegetarian delight.",
            "The Pizza is made freshly in a woodfire oven."
        ],
        desserts: [
            "The tiramisu is a delightful end to your meal.",
            "Our chocolate cake is a chocolate lover's dream.",
            "The panna cotta is creamy and delicious."
        ]
    }
};

// Function to display the menu options in the prompt
function getMenuOptions(menuType, courseType) {
    return menu[menuType][courseType]
        .map(item => `${item.name} - $${item.price}`)
        .join('\n');
}

// Function to select an item and get a comment
function selectItem(menuType, courseType, itemName) {
    const item = menu[menuType][courseType].find(it => it.name.toLowerCase() === itemName.toLowerCase());
    if (!item) {
        return null;
    }
    const commentIndex = menu[menuType][courseType].findIndex(it => it.name.toLowerCase() === itemName.toLowerCase());
    const comment = comments[menuType][courseType][commentIndex];
    alert(`${comment}`);
    return item;
}

// Function to calculate the total cost and create the itemized bill
function createItemizedBill(starter, main, dessert) {
    let totalCost = starter.price + main.price + dessert.price;
    let bill = `HIGHWAY DINER \n\n Your Itemized Bill:\n\nStarter: ${starter.name} - $${starter.price}\nMain: ${main.name} - $${main.price}\nDessert: ${dessert.name} - $${dessert.price}\n`;
    bill += `\nTotal: $${totalCost}`;
    return bill;
}

// Function to prompt for a valid selection from the menu
function promptForValidSelection(menuType, courseType, promptMessage) {
    let selectedItem;
    while (!selectedItem) {
        const itemName = prompt(promptMessage);
        selectedItem = selectItem(menuType, courseType, itemName);
        if (!selectedItem) {
            alert("Invalid selection. Please try again.");
        }
    }
    return selectedItem;
}

// Main function to run the diner menu selection
function runDiner() {
    const mealType = prompt("Welcome to Highway Diner! What would you like to have? (Breakfast/Lunch/Dinner)").toLowerCase();
    if (!menu[mealType]) {
        alert("Invalid meal type. Please select Breakfast, Lunch, or Dinner.");
        return;
    }

    const starterOptions = getMenuOptions(mealType, 'starters');
    const selectedStarter = promptForValidSelection(mealType, 'starters', `Please select a starter by entering the name:\n${starterOptions}`);

    const mainOptions = getMenuOptions(mealType, 'mains');
    const selectedMain = promptForValidSelection(mealType, 'mains', `Please select a main by entering the name:\n${mainOptions}`);

    const dessertOptions = getMenuOptions(mealType, 'desserts');
    const selectedDessert = promptForValidSelection(mealType, 'desserts', `Please select a dessert by entering the name:\n${dessertOptions}`);

    const itemizedBill = createItemizedBill(selectedStarter, selectedMain, selectedDessert);

    alert(itemizedBill);
}

// Run the diner menu selection process
runDiner();