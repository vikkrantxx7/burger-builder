import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'

const navigationItem = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/'>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}
        {props.isAuthenticated 
            ? <NavigationItem link='/logout'>Logout</NavigationItem> 
            : <NavigationItem link='/auth'>Authenticate</NavigationItem>}
    </ul>
)

export default navigationItem