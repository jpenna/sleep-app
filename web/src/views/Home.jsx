import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

import Menu from '../components/Menu';
import ListContent from './ListContent';
import UserContent from './UserContent';

export default function Home() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Menu tab={tab} setTab={setTab} />

      {tab === 0 && <ListContent />}
      <Typography hidden={tab !== 1}>
        Charts
      </Typography>
      <Typography hidden={tab !== 2}>
        Reports
      </Typography>

      {tab === 3 && <UserContent />}

      <Typography hidden={tab !== 4}>
        +Report
      </Typography>
    </>
  );
}
