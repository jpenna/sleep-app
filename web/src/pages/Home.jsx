import React, { useState, useMemo, useCallback } from 'react';
import { Typography, Table } from '@material-ui/core';

import Menu from '../components/Menu';
import ListContent from '../components/ListContent';

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
    </>
  );
}
