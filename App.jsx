import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import react from 'react'
import Navbar from './Navbar'
import {Routes, Route } from 'react-router-dom';
import Home from './Home'
import Manage from "./Manage";
import Register from "./Register";
import Update from "./update"
import Dashboard from "./Dashboard";
import Task from "./Task";
import Leave from "./Leave";
import Disclaimer from "./Disclaimer"
function App()
{
    return(
        <>
        <Navbar/>
        <Routes>
        <Route exact path ="/" element={<Home/>} />
        <Route exact path ="/manage" element={<Manage/>} />
        <Route exact path ="/register" element={<Register/>} />
        <Route exact path ="/update" element={<Update/>} />
        <Route exact path ="/dashboard" element={<Dashboard/>} />
        <Route exact path ="/task" element={<Task/>} />
        <Route exact path ="/leave" element={<Leave/>} />
        </Routes>
        <Disclaimer/>
        </>
    )
}
export default App;