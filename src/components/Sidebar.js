import React, { useContext, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  Button,
} from '@material-ui/core';
import AppContext from '../app/context';
import { tasks } from '../app/constants';
import { Add, FiberManualRecord, KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';

const sidebarWidth = 305;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: sidebarWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
  },
  drawerPaper: {
    width: sidebarWidth,
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
  ListItemAvatar: {
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
  formControl: {
    flexGrow: 1,
    marginRight: 0,
    marginLeft: theme.spacing(0.75),
  },
  checkBoxLabel: {
    fontWeight: 'bold',
  },
  addProjectButton: {
    minWidth: 40,
    color: theme.palette.grey[500],
  },
}));

const projects = [{ name: 'Meetings 🤝' }, { name: 'Health 💉' }, { name: 'House 🏠' }];

export default function Sidebar() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { sidebarOpen, selectedTask, setSelectedTask } = useContext(AppContext);
  const [projectCollapsed, setProjectCollapsed] = useState(true);

  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      open={sidebarOpen}
      classes={{
        paper: classes.drawerPaper,
      }}>
      <Toolbar />
      <List component='nav' className={classes.list}>
        {tasks.map((task) => (
          <ListItem
            button
            key={task.key}
            className={classes.listItem}
            onClick={() => setSelectedTask(task.key)}
            selected={task.key === selectedTask ? true : false}>
            <ListItemAvatar className={classes.ListItemAvatar} style={{ color: task.color }}>
              {task.icon}
            </ListItemAvatar>
            <ListItemText disableTypography className={classes.listItemText} primary={task.name} />
            <ListItemSecondaryAction>
              <Typography className={classes.listItemSecondaryAction}>1</Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Grid container>
        <FormControlLabel
          onChange={({ target }) => setProjectCollapsed(target.checked)}
          control={
            <Checkbox
              icon={<KeyboardArrowRight className={classes.buttonIcon} />}
              checkedIcon={<KeyboardArrowDown className={classes.buttonIcon} />}
              name='projectCollapsed'
            />
          }
          classes={{
            root: classes.formControl,
            label: classes.checkBoxLabel,
          }}
          checked={projectCollapsed}
          label='Projects'
        />
        <Button className={classes.addProjectButton}>
          <Add />
        </Button>
      </Grid>

      <Collapse in={projectCollapsed}>
        <List component='nav'>
          {projects.map((project) => (
            <ListItem key={project.name} button className={classes.listItem}>
              <ListItemAvatar className={classes.ListItemAvatar}>
                <FiberManualRecord style={{ fontSize: '1rem' }} />
              </ListItemAvatar>

              <ListItemText className={classes.listItemText} disableTypography primary={project.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Drawer>
  );
}
