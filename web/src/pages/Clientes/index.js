import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect} from 'react'
import moment from 'moment'
import { allClientes, updateCliente, deleteCliente, getCliente, resetCliente } from '../../store/modules/cliente/actions';
import {useDispatch, useSelector} from 'react-redux'
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const Clientes = () =>{
  
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const {clientes, components, clientebanco} = useSelector((state) => state.cliente)


  const setComponent = (component, state) =>{
    dispatch(
      updateCliente({
        components: {... components, [component]:state},
      })
    )
  }

  const remove = () => {
    dispatch(deleteCliente())
  }

  useEffect(() =>{
    dispatch(allClientes())
  }, [])

const columns = [
  { field: 'nome', headerName: 'Nome', width: 130, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { field: 'email', headerName: 'E-mail', width: 200, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { field: 'telefone', headerName: 'Telefone', width: 130, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { field: 'sexo', headerName: 'Sexo', width: 130, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { field: 'dataCadastro', headerName: 'Data de Cadastro', width: 160, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { 
    field: 'editar',
    headerName: 'Editar',
    align: 'center',
    headerClassName:'super-app-theme--header',
    width: 100,
    headerAlign: 'center', 
    renderCell: params => (
      <IconButton aria-label="editar"
      onClick={() => {
        setComponent('disabled', false)
        dispatch(resetCliente())
        navigate(`/editar-cliente/${params.id}`)}}
      >
        <EditIcon />
      </IconButton>
    )
  },
  { 
    field: 'excluir',
    headerName: 'Exluir',
    align: 'center',
    headerClassName:'super-app-theme--header',
    width: 100,
    headerAlign: 'center', 
    renderCell: params => (
      <IconButton aria-label="delete"
      onClick={() => {
        dispatch(updateCliente({
          id:params.id
        }))
        dispatch(getCliente())
        setComponent('confirmDelete', true)}}
      >
        <DeleteIcon/>
      </IconButton>
    )
  }
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
            rows={rows}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            sx={{
              boxShadow:2,
              border:3,
              borderColor:'#8936b3',
              '& .super-app-theme--header': {
                backgroundColor: '#8936b3',
              }
            }}
          />
          <Dialog
          open={components.confirmDelete}
          onClose={() => setComponent('confirmDelete', false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Exclus??o de cliente"}
            </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Realmente gostaria de realizar a exclus??o do cliente?
                </DialogContentText>
                <DialogContentText >
                  Nome do cliente: {clientebanco.nome}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => remove()}>Deletar</Button>
                <Button onClick={() => setComponent('confirmDelete', false)} autoFocus>
                  N??o deletar
                </Button>
              </DialogActions>
          </Dialog>
        </div>
      );
    
}

export default Clientes