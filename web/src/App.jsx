import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
import MomentUtils from '@date-io/moment';

import Header from './components/Header';

export default function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container maxWidth="md">
        <CssBaseline />
        <Header />
      </Container>
    </MuiPickersUtilsProvider>
  );
}
