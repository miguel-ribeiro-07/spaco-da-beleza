import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

import Header from "./components/Header";
import Login from "./pages/Login";
import Agendamento from "./pages/Agendamentos"
import Clientes from "./pages/Clientes"
import Servicos from "./pages/Servicos";
import Horarios from "./pages/Horarios"
import EditarCliente from "./pages/EditarCliente/"
import CriarServico from "./pages/CriarServico";
import EditarServico from "./pages/EditarServico"
import Cadastro from "./pages/Cadastro"
import Box from '@mui/material/Box';

  
  function Rotas() {
      return (
          <Box>
              <Router>
              <Header/>
                  <Routes>
                  <Route path="/" element={<Login/>}></Route>
                  <Route path="/cadastro" element={<Cadastro/>} />
                  <Route path="/agendamentos" element={<Agendamento />} />
                  <Route path="/clientes" element={<Clientes />} />
                  <Route path="/editar-cliente/:id" element={<EditarCliente />} />
                  <Route path="/servicos" element={<Servicos />}/>
                  <Route path="/criar-servico" element={<CriarServico />}/>
                  <Route path="/editar-servico/:id" element={<EditarServico />}/>
                  <Route path="/horarios" element={<Horarios/>} />
                  </Routes>
              </Router>
          </Box>
    );
  }

  export default Rotas