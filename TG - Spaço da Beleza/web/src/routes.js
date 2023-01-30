import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


import './styles.css'

import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

const Rotas = () =>{
    return (
        <>
        <Header/>
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <Router>
                        <Sidebar/>
                            <Routes>
                                <Route path="/agendamentos" exact/>
                            </Routes>
                    </Router>
                </div>
            </div>
        </>
    )
}

export default Rotas