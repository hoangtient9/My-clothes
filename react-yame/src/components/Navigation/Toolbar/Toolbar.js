import React, { useState, Fragment, useRef } from 'react';

import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToolbarIcons from './ToolbarIcons/ToolbarIcons';
import { useHistory } from 'react-router-dom';

const Toolbar = props => {

    const [show, setShow] = useState(false);
    const myRef = useRef(null);
    const history = useHistory();

    const searchHandler = (e) => {
        if (e.keyCode === 13) {
            history.push({
                pathname: '/search',
                search: `?k=name&q=${encodeURIComponent(e.target.value)}`
            });
            setShow(!show)
            myRef.current.value = ''
        }
    }

    return (
        <Fragment>
        <div className={!show ? [classes.Search, classes.SearchHidden].join(' ') :classes.Search}>
            <div>
                <div>
                    <input type='search' placeholder='Search...' ref={myRef} onKeyDown={(e) => searchHandler(e)} />
                </div>
                <div>
                    <span className="material-icons" onClick={() => setShow(!show)}>clear</span>
                </div>
            </div>
        </div>
        <header className={classes.Toolbar}>
            <div>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
                <ToolbarIcons clicked={props.sideDrawerToggleClicked} show={() => {
                    setShow(!show);
                    setTimeout(() => myRef.current.focus(), 200)
                }}/>
            </div>     
        </header>
        </Fragment>
    )
}

export default Toolbar;