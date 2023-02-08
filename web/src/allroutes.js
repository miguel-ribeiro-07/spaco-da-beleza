import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

import Header from "./components/Header";
import Agendamento from "./pages/Agendamentos"
import Clientes from "./pages/Clientes"
import Editar from "./pages/Editar/"
import Cadastro from "./pages/Cadastro"
import Servicos from "./pages/Servicos";
import Box from '@mui/material/Box';

  
  function Rotas() {
      return (
          <Box>
              <Router>
              <Header/>
                  <Routes>
                  <Route path="/agendamentos" element={<Agendamento />} />
                  <Route path="/clientes" element={<Clientes />} />
                  <Route path="/editar/:id" element={<Editar />} />
                  <Route path="/servicos" element={<Servicos />}/>
                  <Route path="/cadastro" element={<Cadastro/>} />
                  </Routes>
              </Router>
          </Box>
    );
  }

  export default Rotas