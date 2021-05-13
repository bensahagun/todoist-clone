import React, { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Switch,
  Grid,
  Button,
  Paper,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Fuse from 'fuse.js';
import { Menu, Home, Search, Add, NightsStay, WbSunny, Inbox, FiberManualRecord } from '@material-ui/icons';
import AppContext from '../app/context';
import Tasks from '../features/tasks/Tasks';
import { selectTasks } from '../features/tasks/tasksSlice';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    padding: theme.spacing(0, 1),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 42,
      paddingRight: 42,
    },
  },
  iconButton: {
    padding: theme.spacing(1, 0.5),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 5,
      paddingRight: 5,
    },
    minWidth: 28,
    color: theme.palette.common.white,
  },
  toolbarIcon: {
    fontSize: '1.2rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.4rem',
    },
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
      width: 80,
      [theme.breakpoints.up('sm')]: {
        width: 145,
      },
      transition: 'width 0.1s ease',
    },
    '& input:focus': {
      [theme.breakpoints.up('sm')]: {
        width: 350,
      },
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
  searchModal: {
    backgroundColor: 'rgba(0,0,0,0.15)!important',
  },
  searchModalPaper: {
    position: 'absolute',
    left: 0,
    top: '40px',
    width: '90%',
    margin: '0 5%',
    borderRadius: '3px',

    [theme.breakpoints.up('sm')]: {
      left: '113px',
      width: 400,
      margin: 0,
    },

    outline: 'none',
    zIndex: 1250,
  },
  searchModalToolbar: {},
  searchListItem: {},
  searchListItemIcon: {
    minWidth: 30,
    fontSize: '1rem',
  },
  searchItemText: {
    fontSize: '1rem',
  },
}));

export default function Header() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const {
    sidebarOpen,
    setSidebarOpen,
    prefersDarkMode,
    setPrefersDarkMode,
    setSelectedTaskFilter,
    setPageTitle,
    setAddTaskActive,
  } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [appBarColor, setAppBarColor] = useState('primary');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleHomeClick = () => {
    setPageTitle('Inbox');
    setSelectedTaskFilter('INBOX');
    setAddTaskActive(false);
  };

  return (
    <>
      <AppBar color={appBarColor} elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              <Button className={classes.iconButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className={classes.toolbarIcon} />
              </Button>
              <Button onClick={() => handleHomeClick()} className={classes.iconButton}>
                <Home className={classes.toolbarIcon} />
              </Button>
              <TextField
                onFocus={() => setSearchModalOpen(true)}
                onChange={({ target }) => setSearchInput(target.value)}
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
                <Add className={classes.toolbarIcon} />
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
      {searchModalOpen ? (
        <Header.Search
          searchInput={searchInput}
          searchModalOpen={searchModalOpen}
          setSearchModalOpen={setSearchModalOpen}
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
        />
      ) : null}
    </>
  );
}

Header.Search = function HeaderSearch({
  searchModalOpen,
  setSearchModalOpen,
  searchInput,
  editModalOpen,
  setEditModalOpen,
}) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const tasks = useSelector(selectTasks);

  const [editTaskId, setEditTaskId] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const handleClick = (taskId) => {
    setEditTaskId(taskId);
    setEditModalOpen(true);
  };

  useEffect(() => {
    const options = {
      includeScore: true,
      keys: ['title'],
    };

    const fuse = new Fuse(tasks, options);
    setSearchResults(fuse.search(searchInput));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return searchModalOpen && searchResults.length > 0 ? (
    <>
      <Paper className={classes.searchModalPaper} elevation={1}>
        <List>
          {searchResults.map(({ item }) => (
            <ListItem className={classes.searchListItem} onClick={() => handleClick(item.id)} button key={item.id} item>
              <ListItemIcon className={classes.searchListItemIcon}>
                {item.projectId === 'INBOX' ? (
                  <Inbox className={classes.searchListItemIcon} style={{ color: '#246fe0' }} />
                ) : (
                  <FiberManualRecord className={classes.searchListItemIcon} />
                )}
              </ListItemIcon>
              <ListItemText className={classes.searchItemText} primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Tasks.EditModal
        taskId={editTaskId}
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        cancelCallback={() => setSearchModalOpen(false)}
      />
    </>
  ) : null;
};
