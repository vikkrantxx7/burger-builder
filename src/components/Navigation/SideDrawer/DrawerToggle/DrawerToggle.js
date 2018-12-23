import React from 'react'
import {Toggle} from '../../../../hoc/Layout/Layout'
import styles from './DrawerToggle.module.css'

const drawerToggle = (props) => (
    <Toggle.Consumer>
        {(clicked) => <div className={styles.DrawerToggle} onClick={clicked}><div></div><div></div><div></div></div>}
    </Toggle.Consumer>
)

export default drawerToggle