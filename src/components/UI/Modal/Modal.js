import React from 'react'
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.purchasing !== nextProps.purchasing || this.props.children !== nextProps.children
    }

    render() {
        return (
        <>
            <Backdrop show={this.props.purchasing} clicked={this.props.modalClosed}/>
            <div className={styles.Modal} style={{
                transform: this.props.purchasing ? 'translateY(0)' : 'translateY(-180%)',
                opacity: this.props.purchasing ? '1' : '0'}}>
                {this.props.children}
            </div>
        </>)
    }
}

export default Modal