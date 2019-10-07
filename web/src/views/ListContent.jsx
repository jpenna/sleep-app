import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { Paper, Table, TableHead, TableCell, TableBody, TableRow, Button, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { useQuery } from '@apollo/react-hooks';

import { GET_SLEEP_LOG } from '../api/queries';

import Filters from '../components/Filters';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function formatDuration(duration) {
  let hours = duration.hours().toString();
  let minutes = duration.minutes().toString();
  if (hours.length < 2) hours = `0${hours}`;
  if (minutes.length < 2) minutes = `0${minutes}`;
  return `${hours}:${minutes}`;
}

export default function ListContent() {
  const classes = useStyles();
  const [fromTime, setFromTime] = useState(moment().startOf('day'));
  const [toTime, setToTime] = useState(moment().endOf('day'));

  const variables = { from: fromTime.toISOString(), to: toTime.toISOString() };
  const { data, loading, error } = useQuery(GET_SLEEP_LOG, { variables });

  const sleepLog = useMemo(() => {
    if (!data || !data.sleepLog) return [];
    return data.sleepLog.sleepLog.map((rec) => {
      const startTime = moment(rec.startTime);
      const endTime = moment(rec.endTime);
      const duration = moment.duration(endTime.diff(startTime));

      return {
        id: rec._id,
        date: startTime.format('ddd, MMM DD YYYY'),
        startTime: startTime.format('LT'),
        endTime: endTime.format('LT'),
        duration: formatDuration(duration),
      };
    });
  }, [data]);

  return (
    <>
      <Filters
        fromTime={fromTime}
        setFromTime={setFromTime}
        toTime={toTime}
        setToTime={setToTime}
      />

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Duration (h)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sleepLog.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell>{row.startTime}</TableCell>
                <TableCell>{row.endTime}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>
                  <Button onClick={() => {}}>
                    <HighlightOffOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {!loading && !error && !sleepLog.length && (
          <Typography align="center" variant="h6" className="pt-4 pb-4">
            No records for period.
          </Typography>
        )}
        {loading && (
          <Typography align="center" className="pt-4 pb-4" component="div">
            <CircularProgress />
          </Typography>
        )}
        {error && (
          <Typography align="center" variant="h6" color="error" className="pt-4 pb-4">
            Error loading sleep records.
          </Typography>
        )}
      </Paper>
    </>
  );
}
