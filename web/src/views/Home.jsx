import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

import Menu from '../components/Menu';
import ListContent from './ListContent';
import UserContent from './UserContent';
import AddRecordContent from './AddRecordContent';

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

      {tab === 4 && <AddRecordContent />}
    </>
  );
}
