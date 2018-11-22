import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./App.scss";
import SideMenu from '../sidemenu/sidemenu';
import Contact from '../contact/contact'
import {BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends React.Component {
    render() {
        let style = {
            position: "fixed",
            bottom: 0,
            top: 0,
            left: 0,
            right: 0
        };
        return (

            <div style={style}>
                <SideMenu/>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={Contact}/>
                        {/*<Route  path="/Rotate" component={Rotate}/>*/}
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;