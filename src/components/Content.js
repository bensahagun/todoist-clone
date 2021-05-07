import React from 'react';
import { Toolbar, Box, Container, Grid, Typography, Button, Divider } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MoreHoriz } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    padding: '36px 55px 0px 55px',
  },
  headerGrid: {},
}));

export default function Content({ children }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return <Box className={classes.root}>{children}</Box>;
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
