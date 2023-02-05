import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect} from 'react'
import moment from 'moment'
import { allClientes } from '../../store/modules/cliente/action';
import {useDispatch, useSelector} from 'react-redux'
import { border } from '@mui/system';


const Clientes = () =>{
  const dispatch = useDispatch()
  const {clientes} = useSelector((state) => state.clientes)

  
  useEffect(() =>{
    dispatch(allClientes())
  }, [])

const columns = [
  { field: 'nome', headerName: 'Nome', width: 130, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { field: 'email', headerName: 'E-mail', width: 130, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { field: 'telefone', headerName: 'Telefone', width: 130, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { field: 'sexo', headerName: 'Sexo', width: 130, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { field: 'dataCadastro', headerName: 'Data de Cadastro', width: 160, headerClassName:'super-app-theme--header', headerAlign: 'center'},
];

const rows = (clientes.map((cliente) =>({
    id:cliente._id,
    nome:cliente.nome,
    email:cliente.email,
    telefone:cliente.telefone,
    sexo:cliente.sexo,
    dataCadastro:moment(cliente.dataCadastro).format('DD/MM/YYYY')
})))


    return (
        <div style={{ height: 600, width: '100%' }}>
          <h1>Clientes</h1>
          <DataGrid
            checkboxSelection
            rows={rows}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            sx={{
              boxShadow:2,
              border:3,
              borderColor:'#8936b3',
              '& .super-app-theme--header': {
                backgroundColor: '#ff4dff',
              }
            }}
          />
        </div>
      );
    
}

export default Clientes