import React from 'react';
import { Paper, Table, TableHead, TableCell, TableBody, TableRow, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

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

function createData(id, date, start, end, duration) {
  return { id, date, start, end, duration };
}

const rows = [
  createData('1', 'Wed, 24 Oct 2019', '10:30pm', '7:00am', '8:30'),
  createData('2', 'Wed, 24 Oct 2019', '10:30pm', '7:00am', '8:30'),
  createData('3', 'Wed, 24 Oct 2019', '10:30pm', '7:00am', '8:30'),
  createData('4', 'Wed, 24 Oct 2019', '10:30pm', '7:00am', '8:30'),
  createData('5', 'Wed, 24 Oct 2019', '10:30pm', '7:00am', '8:30'),
];

export default function ListContent() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell>{row.start}</TableCell>
              <TableCell>{row.end}</TableCell>
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
    </Paper>
  );
}
