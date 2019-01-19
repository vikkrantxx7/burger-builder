import React from 'react'
import styles from './Layout.module.css' 
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

export const Toggle = React.createContext()

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => ({showSideDrawer: !prevState.showSideDrawer}))
    }

    render () {
        return (
            <React.Fragment>
                <Toggle.Provider value={this.sideDrawerToggleHandler}>
                    <Toolbar isAuth={this.props.isAuthenticated}/>
                </Toggle.Provider>
                <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={styles.content}>{this.props.children}</main>
            </React.Fragment>
        )}
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)