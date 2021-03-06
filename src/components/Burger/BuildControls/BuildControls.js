import React from 'react'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}
]

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Price to Pay: <strong>&#8377; {props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(ctrl => <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            added={() => props.ingredientAdded(ctrl.type)} 
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]} />)}
        <button className={styles.OrderButton} disabled={!props.purchaseState}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP/SIGN IN'}</button>
    </div>
)

export default buildControls