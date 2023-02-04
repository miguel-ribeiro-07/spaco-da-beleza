import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

import Header from "./components/Header";
import Agendamento from "./pages/Agendamentos"
import Clientes from "./pages/Clientes"
import Box from '@mui/material/Box';

  
  function Rotas() {
      return (
          <Box>
              <Router>
              <Header/>
                  <Routes>
                  <Route path="/" element={<Agendamento />} />
                  <Route path="/clientes" element={<Clientes />} />
                  </Routes>
              </Router>
          </Box>
    );
  }

  export default Rotas