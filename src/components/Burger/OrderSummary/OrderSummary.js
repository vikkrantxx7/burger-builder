import React from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
                                .map(igKey => {
                                    return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
                                })
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious Burger with below ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: &#8377; {props.price.toFixed(2)}</strong></p>
            <p>Proceed to checkout-</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </>
    )
}

export default orderSummary