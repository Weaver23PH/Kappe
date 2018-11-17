import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./App.scss";
import SideMenu from '../sidemenu/sidemenu';
import {HashRouter, Switch, Route} from 'react-router-dom';

 class App extends React.Component{
     render(){
         return (
             <React.Fragment>
                <SideMenu/>
             <HashRouter>
                     {/*<Switch>*/}
                         {/*<Route exact path="/" component={MainBody}/>*/}
                         {/*<Route  path="/Rotate" component={Rotate}/>*/}
                     {/*</Switch>*/}
                 </HashRouter>
                 }
             </React.Fragment>
         )
     }
 }
export default App;