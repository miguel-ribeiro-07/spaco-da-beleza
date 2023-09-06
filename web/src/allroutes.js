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
import Agenda from "./pages/Agenda";
import Box from '@mui/material/Box';

  
  function Rotas() {

      const sessionId = localStorage.getItem('@userId')

      /*const ProtectedRoutes = ({sessionId }) => (
        sessionId === '6490bb2b6ca1299fd2616db5' ? (
          <>
            <Route path="/agendamentos" element={<Agendamento />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/editar-cliente/:id" element={<EditarCliente />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/criar-servico" element={<CriarServico />} />
            <Route path="/editar-servico/:id" element={<EditarServico />} />
            <Route path="/horarios" element={<Horarios />} />
          </>
        ) : (
          <Redirect to="/outra-rota" />
        )
      );*/


      /*
          <Route element={<ProtectedRoutes sessionId={sessionId} />} />
          {Outras rotas públicas }
      */
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
                  <Route path="/agenda" element={<Agenda/>} />
                  </Routes>
              </Router>
          </Box>
    );
  }

  export default Rotas