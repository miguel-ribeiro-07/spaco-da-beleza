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
import RedefinirSenha from "./pages/RedefinirSenha";
import Cadastro from "./pages/Cadastro"
import Agenda from "./pages/Agenda";
import Box from '@mui/material/Box';

  
  function Rotas() {

    const sessionId = localStorage.getItem('@userId')

      const isAdm = () => {
        if(sessionId === '6490bb2b6ca1299fd2616db5'){
          return (
            <>
             <Route path="/agendamentos" element={<Agendamento />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/servicos" element={<Servicos />}/>
            <Route path="/criar-servico" element={<CriarServico />}/>
            <Route path="/editar-servico/:id" element={<EditarServico />}/>
            <Route path="/horarios" element={<Horarios/>} />
            <Route path="/editar-cliente/:id" element={<EditarCliente />} />
            </>
          )
        }else if(sessionId !== null){
          return(
            <>
              <Route path="/agenda" element={<Agenda/>} />
              <Route path="/editar-cliente/:id" element={<EditarCliente />} />
            </>
          )
        }
      }

      return (
          <Box>
              <Router>
              <Header/>
                  <Routes>
                  <Route path="/spaco-da-beleza" element={<Login/>}></Route>
                  <Route path="/cadastro" element={<Cadastro/>} />
                  <Route path="/redefinir-senha" element={<RedefinirSenha/>} />
                  {isAdm()}
                  </Routes>
              </Router>
          </Box>
    );
  }

  export default Rotas