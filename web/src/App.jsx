import React from 'react';
import Container from '@material-ui/core/Container';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import './api/connect';

import MomentUtils from '@date-io/moment';

import Home from './views/Home';

export default function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container maxWidth="md">
        <Home />
      </Container>
    </MuiPickersUtilsProvider>
  );
}
