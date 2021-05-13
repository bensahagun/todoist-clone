import React, { useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, Toolbar } from '@material-ui/core';
import AppContext from '../app/context';
import Projects from '../features/projects/Projects';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.custom.sidebarWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
  },
  drawerPaper: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: theme.custom.sidebarWidth,
    },
    backgroundColor: theme.palette.background.default,
    borderRight: 'none',
    paddingTop: 35,
    paddingLeft: 30,
    boxSizing: 'border-box',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  list: {
    padding: 0,
    marginBottom: theme.spacing(2),
  },
  listItemAvatar: {
    minWidth: 30,
    color: theme.palette.grey[600],
    display: 'flex',
  },
  listItem: {
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
  },
  listItemText: {
    fontSize: '0.9rem',
  },
  listItemSecondaryAction: {
    fontSize: '0.8rem',
    color: theme.palette.grey[500],
    verticalAlign: 'top',
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  buttonIcon: {
    color: theme.palette.grey[500],
    fontSize: '1.4rem',
  },
}));

export default function Sidebar() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { sidebarOpen } = useContext(AppContext);

  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      open={sidebarOpen}
      classes={{
        paper: classes.drawerPaper,
      }}>
      <Toolbar />
      <Projects />
    </Drawer>
  );
}
