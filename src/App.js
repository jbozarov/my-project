import React from "react";
import Header from './components/header/Header'
import routes from './routes'
import Sidebar from "./components/sidebar/Sidebar";
import './App.css'
import Schedule from './components/schedule/Schedule'

 
class App extends React.Component {

 
  render() {
    return (
        <div>
        <Header/> 
        <div className='body'>
         {/*<Schedule />*/}
            <Sidebar/>
            {routes} 
        </div>
        </div>
    );
  }
}
 
export default App;
