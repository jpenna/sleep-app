import React, { useState } from 'react';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';

import { ADD_OR_UPDATE_SLEEP } from '../api/mutations';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    marginTop: '60px',
    overflowX: 'auto',
    textAlign: 'center',
  },
}));
export default function UserContent() {
  const styles = useStyles();
  const [startTime, setStartTime] = useState(moment().startOf('hour'));
  const [endTime, setEndTime] = useState(moment().endOf('hour'));

  const [saveSleep, { data, loading }] = useMutation(
    ADD_OR_UPDATE_SLEEP,
    {
      variables: { start: startTime.toISOString(), end: endTime.toISOString() },
    },
  );

  return (
    <div className={styles.container}>
      <Typography variant="h6">
        Record when you went to sleep and when you woke up.
      </Typography>

      <div className="mt-8">
        <DateTimePicker
          variant="inline"
          label="From"
          value={startTime}
          onChange={setStartTime}
        />
      </div>

      <div className="mt-3">
        <DateTimePicker
          variant="inline"
          label="To"
          value={endTime}
          onChange={setEndTime}
        />
      </div>

      <div className="mt-8 pb-3">
        <Button
          color="primary"
          variant="contained"
          onClick={saveSleep}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Save'}
        </Button>
      </div>

      {data && (
        <Typography align="center" color={data.updateSleep.success ? '' : 'error'} className="pb-4 text-green-500">
          {
            data.updateSleep.success
              ? 'Your sleep time was recorded!'
              : data.updateSleep.error
          }
        </Typography>
      )}
    </div>
  );
}
