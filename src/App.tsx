import React from 'react';
import './App.css'
import { CssBaseline, CssVarsProvider } from '@mui/joy';
import ReservationList from './components/ReservationList';

const App: React.FC = () => {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <ReservationList />
    </CssVarsProvider>
  );
};

export default App
