import React from 'react'
import styles from './NavigationItem.module.css'

const navigationItem = (props) => (
    <li className={styles.NavigationItem}>
    <a className={props.active ? styles.active : null} href={props.link}>{props.children}</a></li>
)

export default navigationItem