import React, {Component} from 'react'
import Auxiliary from "../../hoc/auxiliary";
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

import classes from './Layout.css'

class Layout extends Component {
    state = {
        showSidebar: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({
            showSidebar: false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState({
            showSidebar: true
        })
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    open={this.state.showSidebar}
                    closed={this.sideDrawerCloseHandler}
                />
                <main className={classes.Container}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

export default Layout