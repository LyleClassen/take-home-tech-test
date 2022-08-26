import React from 'react';
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import './App.css';
import Employees from './pages/employees/Employees';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ marginTop: 5 }}>
          <Employees />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
