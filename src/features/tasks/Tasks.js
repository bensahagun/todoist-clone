import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Box, Button, Paper, FormGroup, Input, FormControl } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';
import { Add, Inbox, Schedule } from '@material-ui/icons';
import { addTask } from './tasksSlice';

const useStyles = makeStyles((theme) => ({
  root: {},
  addTask: {},
  addTaskButton: {
    fontSize: '0.9rem',
    justifyContent: 'flex-start',
    textTransform: 'initial',
    color: theme.palette.grey[600],
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
    },
    '&:hover  $addTaskButtonIcon': {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
      borderRadius: '50%',
    },
  },
  addTaskButtonIcon: {
    color: theme.palette.primary.main,
  },
  addTaskPanel: {
    margin: theme.spacing(1, 1),
    padding: theme.spacing(1, 2),
    boxSizing: 'border-box',
  },
  addTaskInput: {
    outline: 'none',
    '&:before, &:after': {
      display: 'none',
    },
  },
  addTaskOptions: {},
  addTaskOptionButton: {
    fontSize: '0.75rem',
    textTransform: 'capitalize',
    '& + $addTaskOptionButton': {
      marginLeft: theme.spacing(1),
    },
    '& $addTaskOptionIcons svg': {
      fontSize: '1rem',
    },
  },
  addTaskOptionIcons: {
    marginRight: theme.spacing(0.75),
    color: theme.palette.grey[600],
  },
  addTaskActions: {
    margin: theme.spacing(1, 1),
  },
  addTaskActionButton: {
    textTransform: 'inherit',
    fontWeight: '600',
    '& + $addTaskActionButton': {
      marginLeft: theme.spacing(1),
    },
  },
}));

export default function Tasks({ ...props }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Box {...props} className={classes.root}>
      <Container maxWidth='md'>
        <Tasks.AddTask />
      </Container>
    </Box>
  );
}

Tasks.AddTask = function TasksAddTask() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [addTaskActive, setAddTaskActive] = useState(false);
  const [formValid, setFormValid] = useState(false);

  return (
    <Box className={classes.addTask}>
      <Container maxWidth='md'>
        {!addTaskActive && (
          <Button
            classes={{
              root: classes.addTaskButton,
              startIcon: classes.addTaskButtonIcon,
            }}
            onClick={() => setAddTaskActive(true)}
            startIcon={<Add />}
            fullWidth={true}
            disableRipple>
            Add task
          </Button>
        )}
        {addTaskActive && (
          <>
            <Paper className={classes.addTaskPanel} variant='outlined'>
              <FormControl component='fieldset' fullWidth={true}>
                <Input
                  onChange={({ target }) => setFormValid(target.value.length > 2)}
                  className={classes.addTaskInput}
                  type='text'
                  placeholder='e.g. Designer meeting at  11am'
                />

                <FormGroup row={true} spacing={1}>
                  <Button
                    disableRipple
                    variant='outlined'
                    classes={{
                      root: classes.addTaskOptionButton,
                      startIcon: classes.addTaskOptionIcons,
                    }}
                    startIcon={<Schedule />}>
                    Schedule
                  </Button>
                  <Button
                    disableRipple
                    variant='outlined'
                    classes={{
                      root: classes.addTaskOptionButton,
                      startIcon: classes.addTaskOptionIcons,
                    }}
                    startIcon={<Inbox style={{ color: '#246fe0' }} />}>
                    Inbox
                  </Button>
                </FormGroup>
              </FormControl>
            </Paper>
            <FormControl className={classes.addTaskActions}>
              <FormGroup row={true}>
                <Button
                  disabled={!formValid}
                  className={classes.addTaskActionButton}
                  variant='contained'
                  color='primary'>
                  Add task
                </Button>
                <Button
                  size='small'
                  onClick={() => setAddTaskActive(false)}
                  className={classes.addTaskActionButton}
                  variant='outlined'>
                  Cancel
                </Button>
              </FormGroup>
            </FormControl>
          </>
        )}
      </Container>
    </Box>
  );
};
