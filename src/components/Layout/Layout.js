import React from 'react'
import styles from './Layout.module.css' 
import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = (props) => (
    <React.Fragment>
        <Toolbar />
        <main className={styles.content}>{props.children}</main>
    </React.Fragment>
)

export default layout