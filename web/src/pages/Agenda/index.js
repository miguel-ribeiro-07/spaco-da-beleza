import * as React from 'react';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {useDispatch, useSelector} from 'react-redux'
import { allServicos } from '../../store/modules/agenda/actions';
import { Divider } from '@mui/material';
import moment from 'moment'
import '../../styles.css'


const Agenda = () => {

  const dispatch = useDispatch()
  const {servicos} = useSelector((state) => state.agenda)

  useEffect(() =>{
    dispatch(allServicos())
  },[])
  
  function ServiceList({ services }) {
    return (
      <div>
        {services.map((service, index) => (
          <div key={index}>
          <ListItem>
            <ListItemText
              primary={<span style={{ fontSize: '26px' }}>{service?.nomeServico}</span>}
              secondary={<span style={{ fontSize: '16px', color:'var(--secondary)'}}>{`Preço: R$${service?.preco} - Duração: ${moment(service?.duracao).format('HH:mm')} ${moment(service?.duracao).format('HH:mm') == '00:30' ? 'min' : 'Hrs'}`}</span>}
            />
            <Button variant='contained' style={{ backgroundColor: 'var(--secondary)' }} onClick={() => {
              localStorage.setItem('@idServ', service?._id)
            }}>Agendar</Button>
          </ListItem>
          {<Divider />} 
        </div>
        ))}
      </div>
    );
  }


  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems:'center',
          }}
        >
          <Typography component="h1" variant="h4" style={{marginBottom:15}}>
           Serviços disponíveis
          </Typography>
          <List sx={{ width: '100%', maxWidth: 400}}>
            {servicos !== null ? <ServiceList services={servicos.servicos} />: ''}
          </List>
        </Box>
      </Container>
  );
}

export default Agenda