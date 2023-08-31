import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OutlinedCard from '../Card/profileCard';


interface LolRecordCardProps {
  matchUser: string[];
  gamedata: {
    


  };
}


function LolRecordCard({matchUser ,gamedata }:LolRecordCardProps) {

    const gameInfo = JSON.stringify(gamedata)
    
    
    const OurTeam = matchUser.slice(0,5);
    const EnemyTeam = matchUser.slice(5);
   
    


  
  return (
    <div>
    
    <Box sx={{  minWidth: 250, maxWidth: 'fit-content', marginBottom: '16px', display: 'flex', flexDirection: 'row' }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
              
          </Typography>
          
          {OurTeam.map((x, index) => (
           <Typography key={index} variant="body1">
            {x}
            </Typography>
            ))}
            </CardContent>
        </Card>
        
        <Card variant="outlined">
        <CardContent>
          
           <Typography variant="body1">
             
            </Typography>
         
          
           
          
          <Typography variant="body1" >
             
          </Typography>
        </CardContent>
      </Card>
    </Box>
    </div>
  );
}
export default LolRecordCard;