import React from 'react'
import styles from './Order.module.css'

const order = (props) => {
    const ingredientOutput = Object.entries(props.ingredients).map(ingredient => (
        <span key={ingredient[0]} style={{textTransform: 'capitalize',
            display: 'inline-block', margin: '0 6px', boxShadow: '0px 2px 2px #ccc',
            border: '1px solid #eee', padding: '4px'}}>{ingredient[0]} ({ingredient[1]})</span>
    ))

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>&#8377; {props.price}</strong></p>
        </div>
    )
}


export default order