import React, { useState, useMemo, useCallback } from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import { AppBar, Toolbar, Button, ButtonGroup } from '@material-ui/core';
import moment from 'moment';

const periodsMap = new Map([
  ['today', 'day'],
  ['week', 'week'],
  ['month', 'month'],
]);

export default function Headers() {
  const [fromTime, setFromTime] = useState(moment().startOf('day'));
  const [toTime, setToTime] = useState(moment().endOf('day'));

  const period = useMemo(() => {
    const now = moment();
    if (now.startOf('day').isSame(fromTime) && now.endOf('day').isSame(toTime)) return 'today';
    if (now.startOf('week').isSame(fromTime) && now.endOf('week').isSame(toTime)) return 'week';
    if (now.startOf('month').isSame(fromTime) && now.endOf('month').isSame(toTime)) return 'month';
    return '';
  }, [fromTime, toTime]);

  const updatePeriod = useCallback((selectedPeriod) => () => {
    const now = moment();
    setFromTime(now.startOf(periodsMap.get(selectedPeriod)).toISOString());
    setToTime(now.endOf(periodsMap.get(selectedPeriod)).toISOString());
  }, []);

  return (
    <AppBar position="relative">
      <Toolbar>
        <DateTimePicker
          variant="inline"
          label="From"
          value={fromTime}
          onChange={setFromTime}
        />
        <DateTimePicker
          variant="inline"
          label="To"
          value={toTime}
          onChange={setToTime}
        />
        <ButtonGroup
          aria-label="large outlined secondary button group"
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
    </AppBar>
  );
}
