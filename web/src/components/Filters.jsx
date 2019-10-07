import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@material-ui/pickers';
import { Toolbar, Button, ButtonGroup } from '@material-ui/core';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  datePickers: {
    flexGrow: 1,
  },
  datePickerSingle: {
    marginLeft: '10px',
  },
  appBar: {
    marginTop: '15px',
  },
}));

const periodsMap = new Map([
  ['today', 'day'],
  ['week', 'week'],
  ['month', 'month'],
]);

export default function Filters({ fromTime, setFromTime, toTime, setToTime }) {
  const style = useStyles();

  const period = useMemo(() => {
    const now = moment();
    if (now.startOf('day').isSame(fromTime) && now.endOf('day').isSame(toTime)) return 'today';
    if (now.startOf('week').isSame(fromTime) && now.endOf('week').isSame(toTime)) return 'week';
    if (now.startOf('month').isSame(fromTime) && now.endOf('month').isSame(toTime)) return 'month';
    return '';
  }, [fromTime, toTime]);

  const updatePeriod = useCallback((selectedPeriod) => () => {
    const now = moment();
    setFromTime(now.startOf(periodsMap.get(selectedPeriod)).toDate());
    setToTime(now.endOf(periodsMap.get(selectedPeriod)).toDate());
  }, []);

  return (
    <div className={style.root}>
      <div className={style.appBar}>
        <Toolbar>
          <div className={style.datePickers}>
            <DateTimePicker
              variant="inline"
              label="From"
              value={fromTime}
              onChange={setFromTime}
            />
            <DateTimePicker
              className={style.datePickerSingle}
              variant="inline"
              label="To"
              value={toTime}
              onChange={setToTime}
            />
          </div>

          <ButtonGroup
            color="primary"
            aria-label="large outlined button group"
          >
            <Button
              variant={period === 'today' ? 'contained' : ''}
              onClick={updatePeriod('today')}
            >
              Today
            </Button>
            <Button
              variant={period === 'week' ? 'contained' : ''}
              onClick={updatePeriod('week')}
            >
              Week
            </Button>
            <Button
              variant={period === 'month' ? 'contained' : ''}
              onClick={updatePeriod('month')}
            >
              Month
            </Button>
          </ButtonGroup>
        </Toolbar>
      </div>
    </div>
  );
}

Filters.propTypes = {
  fromTime: PropTypes.objectOf(PropTypes.any).isRequired,
  setFromTime: PropTypes.func.isRequired,
  toTime: PropTypes.objectOf(PropTypes.any).isRequired,
  setToTime: PropTypes.func.isRequired,
};
