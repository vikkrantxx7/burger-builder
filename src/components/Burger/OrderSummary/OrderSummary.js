import React from 'react'

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
            <p>Proceed to checkout-</p>
        </>
    )
}

export default orderSummary