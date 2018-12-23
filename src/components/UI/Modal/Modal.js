import React from 'react'
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => {
    return (
        <>
            <Backdrop show={props.purchasing} clicked={props.modalClosed}/>
            <div className={styles.Modal} style={{
                transform: props.purchasing ? 'translateY(0)' : 'translateY(-180%)',
                opacity: props.purchasing ? '1' : '0'}}>
                {props.children}
            </div>
        </>
    )
}

export default modal