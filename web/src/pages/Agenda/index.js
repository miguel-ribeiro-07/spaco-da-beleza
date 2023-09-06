import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MenuItem } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import Divider from '@mui/material/Divider';
import '../../styles.css'


const Agenda = () => {

  
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
          <Typography component="h1" variant="h5">
           Serviços disponíveis
          </Typography>
          <TextField sx={{ width: '100%', maxWidth: 400}} placeholder='Pesquise pelo serviço...' />
          <List sx={{ width: '100%', maxWidth: 400}}>
          <ListItem>
            <ListItemAvatar>
                <ContentCutIcon style={{ fontSize: '45px' }}/>
            </ListItemAvatar>
            <ListItemText 
                primary={<span style={{ fontSize: '25px' }}>Corte de cabelo</span>} 
                secondary={<span style={{ fontSize: '15px' }}>Preço R$10 - Duração 2h</span>} 
            />
            <Button variant='contained'>Agendar</Button>
            </ListItem>
            <Divider/>
            <ListItem>
            <ListItemAvatar>
                <ContentCutIcon style={{ fontSize: '45px' }}/>
            </ListItemAvatar>
            <ListItemText 
                primary={<span style={{ fontSize: '25px' }}>Corte de cabelo</span>} 
                secondary={<span style={{ fontSize: '15px' }}>Preço R$10 - Duração 2h</span>} 
            />
            <Button variant='contained'>Agendar</Button>
            </ListItem>
          </List>
        </Box>
      </Container>
  );
}

export default Agenda