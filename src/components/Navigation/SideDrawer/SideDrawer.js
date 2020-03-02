import React from 'react'
import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import styles from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary'

export default function SideDrawer(props) {
    let classes = [styles.SideDrawer, styles.Close]

    if(props.open) {
        classes = [styles.SideDrawer, styles.Open]
    }

    return (
        <Auxiliary className="mt-16">
            <Backdrop isShow={props.open} clicked={props.closed} />
            <div className={classes.join(' ')}>
                <Logo />
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Auxiliary>
    )
}
