import React, { useState, useMemo, useCallback } from 'react';
import { Typography } from '@material-ui/core';

import Menu from '../components/Menu';

export default function Home() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Menu tab={tab} setTab={setTab} />
      <Typography hidden={tab !== 0}>
        List
      </Typography>
      <Typography hidden={tab !== 1}>
        Charts
      </Typography>
      <Typography hidden={tab !== 2}>
        Reports
      </Typography>
    </>
  );
}
