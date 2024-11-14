import React, { useContext } from 'react';
import CartContext from '../store/CartContext';
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";

const MealItem = ({ meal }) => {
    const cartCtx = useContext(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }

    // Check if the item is already in the cart
    const isItemInCart = cartCtx.items.some(item => item.id === meal.id);

    return (
        <li className='meal-item'>
            <article>
                <img src={`http://localhost:4000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className='meal-item-price'>{currencyFormatter.format(meal.price)}</p>
                    <p className='meal-item-description'>{meal.description}</p>
                </div>
                <p className='meal-item-actions'>
                    <Button 
                        onClick={handleAddMealToCart} 
                        type='button'
                        disabled={isItemInCart} // Disable button if item is in cart
                    >
                        {isItemInCart ? 'Already in Cart' : 'Add to Cart'}
                    </Button>
                </p>
            </article>
        </li>
    );
};

export default MealItem;
