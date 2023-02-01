import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './styles.css'
import Box from '@mui/material/Box';

import Header from "./components/Header/index"
import Agendamentos from "./pages/Agendamentos"
import Clientes from "./pages/Clientes"

const Rotas = () =>{
    return (
            <>
                    <div className="container-fluid h-100">
                        <div className="row h-100">
                        <Router>
                            <Header/>                    
                                <Routes>
                                    <Route path="/" exact element={<Agendamentos/>} />
                                    <Route path="/clientes" exact element={<Clientes/>}/>
                                </Routes>
                        </Router>
                        </div>
                    </div>
            </>
    )
}

export default Rotas