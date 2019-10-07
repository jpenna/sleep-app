import React, { useState } from 'react';
import { Card, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    marginTop: '60px',
    overflowX: 'auto',
    textAlign: 'center',
  },
  row: {
    marginTop: '20px',
  },
}));
export default function UserContent() {
  const styles = useStyles();
  const [fromTime, setFromTime] = useState(moment().startOf('day'));
  const [toTime, setToTime] = useState(moment().endOf('day'));

  return (
    <div className={styles.container}>
      <Typography variant="h6">
        Record when you went to sleep and when you woke up.
      </Typography>
      <div className={styles.row}>
        <DateTimePicker
          variant="inline"
          label="From"
          value={fromTime}
          onChange={setFromTime}
        />
      </div>
      <div className={styles.row}>
        <DateTimePicker
          variant="inline"
          label="To"
          value={toTime}
          onChange={setToTime}
        />
      </div>
      <div>
        <Button color="primary" variant="contained" className={styles.row}>
          Save
        </Button>
      </div>
    </div>
  );
}
