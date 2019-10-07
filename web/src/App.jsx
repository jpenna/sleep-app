import React from 'react';
import Container from '@material-ui/core/Container';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
import MomentUtils from '@date-io/moment';

import Header from './components/Header';
import Home from './pages/Home';

export default function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container maxWidth="md">
        <Header />
        <Home />
      </Container>
    </MuiPickersUtilsProvider>
  );
}
