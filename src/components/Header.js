import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, TextField, InputAdornment, Switch, Grid, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Menu, Home, Search, Add, NightsStay, WbSunny } from '@material-ui/icons';
import AppContext from '../app/context';
import Tasks from '../features/tasks/Tasks';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    paddingLeft: 42,
    paddingRight: 42,
  },
  iconButton: {
    paddingLeft: 5,
    paddingRight: 5,
    minWidth: 28,
    color: theme.palette.common.white,
  },
  search: {
    marginLeft: 5,
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    padding: '7px 12px',
    color: theme.palette.common.white,

    '& input': {
      height: 'auto',
      padding: 0,
      fontSize: '0.8rem',
      marginLeft: 5,
      width: 145,
    },
  },
  switchBase: {
    '&$switchChecked': {
      color: theme.palette.grey[700],
    },
    '&$switchChecked + $switchTrack': {
      backgroundColor: theme.palette.grey[500],
    },
  },
  switchChecked: {},
  switchTrack: {},
  switchIcon: {
    verticalAlign: 'middle',
    color: theme.palette.common.white,
  },
}));

export default function Header() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { sidebarOpen, setSidebarOpen, prefersDarkMode, setPrefersDarkMode } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [appBarColor, setAppBarColor] = useState('primary');

  return (
    <AppBar color={appBarColor} elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Grid container justify='space-between' alignItems='center'>
          <Grid item>
            <Button className={classes.iconButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu style={{ fontSize: '1.4rem' }} />
            </Button>
            <Button className={classes.iconButton}>
              <Home style={{ fontSize: '1.4rem' }} />
            </Button>
            <TextField
              style={{ verticalAlign: 'middle' }}
              size='small'
              InputProps={{
                className: classes.search,
                startAdornment: (
                  <InputAdornment>
                    <Search />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              placeholder='Find'
            />
          </Grid>
          <Grid item>
            <Button onClick={() => setModalOpen(!modalOpen)} className={classes.iconButton}>
              <Add style={{ fontSize: '1.4rem' }} />
            </Button>

            <Tasks.AddModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

            <Grid component='label'>
              <WbSunny className={classes.switchIcon} fontSize='small' />
              <Switch
                size='small'
                checked={prefersDarkMode}
                onChange={({ target }) => {
                  setAppBarColor(target.checked ? 'secondary' : 'primary');
                  setPrefersDarkMode(target.checked);
                }}
                classes={{
                  switchBase: classes.switchBase,
                  track: classes.switchTrack,
                  checked: classes.switchChecked,
                }}
              />
              <NightsStay className={classes.switchIcon} fontSize='small' />
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
