import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect} from 'react'
import moment from 'moment'
import { allServicos, updateServico, deleteServico, getServico, resetServico} from '../../store/modules/servico/actions';
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



const Servicos = () =>{
  
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const {servicos, components, servicobanco} = useSelector((state) => state.servico)


  const setComponent = (component, state) =>{
    dispatch(
      updateServico({
        components: {... components, [component]:state},
      })
    )
  }

  const remove = () => {
    dispatch(deleteServico())
  }

  useEffect(() =>{
    dispatch(allServicos())
  }, [])

const columns = [
  { field: 'nomeServico', headerName: 'Nome do Serviço', width: 150, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { field: 'descricao', headerName: 'Descrição do Serviço', width: 300, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { field: 'duracao', headerName: 'Duração', width: 70, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { field: 'preco', headerName: 'Preço', width: 90, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { field: 'status', headerName: 'Status', width: 70, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { field: 'dataCadastro', headerName: 'Data de Cadastro', width: 130, headerClassName:'super-app-theme--header', headerAlign: 'center'},
  { 
    field: 'editar',
    headerName: 'Editar',
    align: 'center',
    headerClassName:'super-app-theme--header',
    width: 65,
    headerAlign: 'center', 
    renderCell: params => (
      <IconButton aria-label="editar"
      onClick={() => {
        setComponent('disabled', false)
        navigate(`/editar-servico/${params.id}`)}}
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
    width: 80,
    headerAlign: 'center', 
    renderCell: params => (
      <IconButton aria-label="delete"
      onClick={() => {
        dispatch(updateServico({
          id:params.id
        }))
        dispatch(getServico())
        setComponent('confirmDelete', true)}}
      >
        <DeleteIcon/>
      </IconButton>
    )
  }
];

const rows = (servicos.map((servico) =>({
    id:servico._id,
    nomeServico:servico.nomeServico,
    descricao:servico.descricao,
    duracao:moment(servico.duracao).format('HH:mm'),
    preco:`R$${servico.preco.toFixed(2)}`,
    status:servico.status === 'A' ? 'Ativo' : 'Inativo',
    dataCadastro:moment(servico.dataCadastro).format('DD/MM/YYYY')
})))


    return (
        <div style={{ height: 600, width: '100%' }}>
          <h1>Servicos</h1>
          <Button style={{marginBottom:15, marginLeft:0, backgroundColor: '#8936b3'}} variant='contained' onClick={() => {
            setComponent('disabled', false)
            dispatch(resetServico())
            navigate('/criar-servico')}}>ADICIONAR NOVO SERVIÇO</Button>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={9}
            rowsPerPageOptions={[9]}
            sx={{
              boxShadow:2,
              border:3,
              borderColor:'#8936b3',
              '& .super-app-theme--header': {
                backgroundColor: '#ff4dff',
                color: 'white',
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
              {"Exclusão do serviço"}
            </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Realmente gostaria de realizar a exclusão do serviço?
                </DialogContentText>
                <DialogContentText >
                  Nome do serviço: {servicobanco.nomeServico}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => remove()}>Deletar</Button>
                <Button onClick={() => setComponent('confirmDelete', false)} autoFocus>
                  Não deletar
                </Button>
              </DialogActions>
          </Dialog>
        </div>
      );
    
}

export default Servicos