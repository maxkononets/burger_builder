import React from 'react';

import NavigationItems from '../Toolbar/NavigationItems/NavigationItems'
import classes from './SideDrawer.css'

import Logo from '../../Logo/Logo'
import Auxiliary from "../../../hoc/Auxiliary/auxiliary";
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
       <Auxiliary>
           <Backdrop
               show={props.open}
               clicked={props.closed}
           />
           <div className={attachedClasses.join(' ')}>
               <div className={classes.Logo}>
                   <Logo />
               </div>
               <nav>
                   <NavigationItems />
               </nav>
           </div>
       </Auxiliary>
    );
};

export default SideDrawer;