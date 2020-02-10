import React from "react";
import Header from './components/header/Header'
import routes from './routes'
import Sidebar from "./components/sidebar/Sidebar";
import './App.css'

 
class App extends React.Component {

 
  render() {
    return (
        <div>
        <Header/> 
        <div className='body'>
            <Sidebar/>
            {routes}
        </div>
        </div>
    );
  }
}
 
export default App;
