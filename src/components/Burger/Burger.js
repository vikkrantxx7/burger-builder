import React from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredient => [...(new Array(props.ingredients[ingredient]))]
        .map((_,i) => <BurgerIngredient key={ingredient + i} type={ingredient}/>))
            .reduce((acc,el) => acc.concat(el), [])
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger