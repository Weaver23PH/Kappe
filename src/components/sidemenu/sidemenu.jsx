import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./sidemenu.scss";

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={styles.sideMenu}>
                <div className={styles.logo}>
                    <p>O kappe</p>
                </div>
                <ul className={styles.large}>
                    <li><p>HOME</p></li>
                    <li><p>WORK</p></li>
                    <li><p>ABOUT</p></li>
                    <li><p>BLOG</p></li>
                    <li><p>SERVICES</p></li>
                    <li><p>CONTACT</p></li>
                </ul>
                <p className={styles.filter}>Filter</p>
                <ul className={styles.small}>
                    <li><p>All works</p></li>
                    <li><p>web design</p></li>
                    <li><p>illustration</p></li>
                    <li><p>photography</p></li>
                    <li><p>wallpapers</p></li>
                    <li><p>brochures</p></li>
                </ul>
                <div className={styles.logos}></div>
                <p className={styles.copy}> 2014 by Kappe. All rights reserved</p>
                <div></div>
            </div>
        )
    }
}

export default SideMenu;