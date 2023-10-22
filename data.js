import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const foodItemsArray = [{
    title: 'Steak Burger',
    type: 'burger',
    cal: '100kcal', 
    cost: '20', 
    desc: 'Bread, Lettuce, Burger Sauce, Tomato, Cheese, A5 Waygo Beef Patty',
    icon: '🍔',
    quantity: 0,
    uuid: uuidv4(),
},
{   
    title: 'Pizza',
    type: 'pizza',
    cal: '200kcal', 
    cost: '25', 
    icon: '🍕',
    desc: 'Garlic Bread, Tomato, Mozzarella, Pepperoni',
    quantity: 0,
    uuid: uuidv4(),
},
{
    title: 'Beer',
    type: 'Drink',
    cal: '200kcal', 
    cost: '7', 
    desc: 'Homebrew Lager',
    icon: '🍺',
    quantity: 0,
    uuid: uuidv4(),
}
]