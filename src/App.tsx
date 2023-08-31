import React, { useState } from 'react';
import OutlinedCard from './Component/Card/profileCard';
import ResponsiveAppBar from './Component/Header/header';
import LolRecordCard from './Component/Card/lolRecordCard';



const App = () => {
  

  return (
    <div>
      <ResponsiveAppBar/>
      <div style={{display:'flex', gap:'16px'}}>
      <OutlinedCard/>
      
      </div>
      
      
    </div>
  );
};

export default App;