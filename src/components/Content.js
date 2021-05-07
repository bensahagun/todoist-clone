import React, { useContext } from 'react';
import { Toolbar, Box, Container, Grid, Typography, Button, Divider } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MoreHoriz } from '@material-ui/icons';
import clsx from 'clsx';
import AppContext from '../app/context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  sidebarOpen: {
    marginLeft: -theme.custom.sidebarWidth,
  },
  container: {
    padding: '36px 55px 0px 55px',
  },
  headerGrid: {},
}));

export default function Content({ children }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { sidebarOpen } = useContext(AppContext);

  return <Box className={clsx(classes.root, !sidebarOpen && classes.sidebarOpen)}>{children}</Box>;
}

Content.Header = function ContentHeader({ title, children, ...props }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Box {...props}>
      <Toolbar />
      <Container className={classes.container} maxWidth='md'>
        <Grid className={classes.headerGrid} container alignContent='space-between'>
          <Grid item xs>
            <Typography component='h1' variant='h5'>
              <Box fontWeight='600'>{title}</Box>
            </Typography>
          </Grid>
          <Grid item>
            <Button style={{ minWidth: 20 }}>
              <MoreHoriz />
            </Button>
          </Grid>
        </Grid>
        <Divider />
      </Container>
    </Box>
  );
};

Content.Body = function ContentBody({ children, ...props }) {
  return <Box {...props}>{children}</Box>;
};
