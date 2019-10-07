import React from 'react';
import { Card, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    marginTop: '90px',
    overflowX: 'auto',
    textAlign: 'center',
  },
  logout: {
    marginTop: '24px',
  },
  email: {
    marginTop: '4px',
  },
}));
export default function UserContent() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Card>
        <Typography variant="subtitle2">
          Logged as
        </Typography>
        <Typography variant="body1" className={styles.email}>
          user@email.com
        </Typography>

        <Button color="secondary" variant="outlined" className={styles.logout}>
          Logout
        </Button>
      </Card>
    </div>
  );
}
