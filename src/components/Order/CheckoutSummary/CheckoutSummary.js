import React from 'react'
import Burger from '../../Burger/Burger'
import Butten from '../../UI/Button/Button'
import styles from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    return(
        <div className={styles.CheckoutSummary}>
            <h1>Delicious!!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked>Cancel</Button>
            <Button btnType="Success" clicked>Continue</Button>
        </div>
    )
}

export default checkoutSummary