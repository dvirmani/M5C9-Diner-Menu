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

// Generic comments for the food choices
const genericComments = [
    "This is a customer favorite!",
    "People often come back just for this.",
    "Highly recommended by our chef!",
    "A delightful choice!",
    "You made an excellent choice!"
];

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
    const randomComment = genericComments[Math.floor(Math.random() * genericComments.length)];
    alert(`${randomComment}`);
    return item;
}

// Function to calculate the total cost and create the itemized bill
function createItemizedBill(starter, main, dessert) {
    let totalCost = starter.price + main.price + dessert.price;
    let bill = `HIGHWAY DINER \n\n Your Itemized Bill:\n\nStarter: ${starter.name} - $${starter.price}\nMain: ${main.name} - $${main.price}\nDessert: ${dessert.name} - $${dessert.price}\n`;
    bill += `\nTotal: $${totalCost}`;
    return bill;
}

// Function to prompt for a valid selection
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

// Function to determine meal type based on time
function getMealType(hour, minute) {
    const totalMinutes = hour * 60 + minute;
    const breakfastEnd = 11 * 60; // 11:00 AM
    const lunchEnd = 17 * 60; // 5:00 PM
    const closingTime = 23 * 60; // 11:00 PM

    if (totalMinutes >= 7 * 60 && totalMinutes < breakfastEnd) {
        return "breakfast";
    } else if (totalMinutes >= breakfastEnd && totalMinutes < lunchEnd) {
        return "lunch";
    } else if (totalMinutes >= lunchEnd && totalMinutes <= closingTime) {
        return "dinner";
    } else {
        return null;
    }
}

// Main function to run the diner menu selection
function runDiner() {
    const timeInput = prompt("Welcome to Highway Diner! Please enter your reservation time (HH:MM):");
    const timeParts = timeInput.split(':');
    const hour = parseInt(timeParts[0], 10);
    const minute = parseInt(timeParts[1], 10);

    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour >= 24 || minute < 0 || minute >= 60) {
        alert("Invalid time format. Please enter time in HH:MM format.");
        return;
    }

    if (hour < 7 || hour >= 23 || (hour === 22 && minute > 0)) {
        alert("Sorry, we are closed. Our opening hours are from 07:00 to 23:00.");
        return;
    }

    const mealType = getMealType(hour, minute);
    if (!mealType) {
        alert("Sorry, we are closed. Our opening hours are from 07:00 to 23:00.");
        return;
    }

    alert(`Welcome to ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Menu!`);

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
