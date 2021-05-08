import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Button,
  Paper,
  FormGroup,
  Input,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Modal,
  Typography,
  Toolbar,
  TextField,
  Grid,
  Dialog,
  Select,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Add, Inbox, CheckCircleOutlined, RadioButtonUncheckedOutlined, Schedule, Close } from '@material-ui/icons';
import clsx from 'clsx';
import useStyles from './tasksStyles';
import { selectPendingTasks, addTask, completeTask } from './tasksSlice';
import { ToggleButton } from '@material-ui/lab';
import { getDateToday, getServerDateTime } from '../../helpers';

export default function Tasks({ ...props }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Box {...props} className={classes.root}>
      <Container maxWidth='md' className={classes.container}>
        <Tasks.List />
        <Tasks.AddTask />
        <Tasks.AddTasksModal />
      </Container>
    </Box>
  );
}

Tasks.List = function TasksList() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const tasks = useSelector(selectPendingTasks);
  const dispatch = useDispatch();

  const handleCompleteTask = (taskId) => {
    dispatch(completeTask(taskId));
  };

  return (
    <List className={classes.list}>
      {tasks.map((task) => (
        <ListItem className={classes.listItem} key={task.id} button disableRipple onClick={() => {}}>
          <ListItemIcon className={classes.listItemIcon}>
            <Checkbox
              onChange={({ target }) => target.checked && handleCompleteTask(task.id)}
              color='default'
              checkedIcon={<CheckCircleOutlined />}
              icon={<RadioButtonUncheckedOutlined />}
              edge='start'
              inputProps={{ 'aria-labelledby': task.id }}
            />
          </ListItemIcon>
          <ListItemText
            disableTypography
            className={classes.listItemText}
            id={task.id}
            primary={task.title}></ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

Tasks.AddTasksModal = function TasksAddTaskModal({ modalOpen = false, setModalOpen }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Modal className={classes.addTaskModal} open={modalOpen} aria-labelledby='Add task'>
      <Paper className={classes.addTaskModalPaper} elevation={1}>
        <Toolbar className={classes.addTaskModalToolbar} disableGutters={true}>
          <Typography>
            <strong>Quick Add Task</strong>
          </Typography>
          <Button onClick={() => setModalOpen(false)} className={classes.addTaskModalClose} size='small'>
            <Close />
          </Button>
        </Toolbar>
        <Tasks.AddTask forModal={true} setModalOpen={setModalOpen} />
      </Paper>
    </Modal>
  );
};

Tasks.AddTask = function TasksAddTask({ forModal = false, setModalOpen }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [addTaskActive, setAddTaskActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleInput, setScheduleInput] = useState('');
  const [assignedProject, setAssignedProject] = useState(1);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const dispatch = useDispatch();

  const handleSelectProject = () => {
    setOpenProjectDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      title: inputValue,
      isCompleted: false,
      dueDate: scheduleInput,
      projectId: 1,
      userId: 'BcwG2ysWo37vag',
      dateCreated: getServerDateTime(),
    };

    dispatch(addTask(task)).then(() => {
      setScheduleInput(getDateToday());
      setIsScheduled(false);
      setInputValue('');
    });
  };

  const handleCancel = () => {
    setAddTaskActive(false);
    forModal && setModalOpen(false);
  };

  return (
    <Box className={clsx(classes.addTask, forModal && classes.addTaskForModal)}>
      <Container className={classes.addTaskContainer} forModalmaxWidth='md'>
        {!addTaskActive && !forModal && (
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
        {(addTaskActive || forModal) && (
          <form onSubmit={handleSubmit}>
            <Paper className={classes.addTaskPanel} variant='outlined'>
              <Input
                autoFocus
                value={inputValue}
                onChange={({ target }) => {
                  setInputValue(target.value);
                }}
                className={classes.addTaskInput}
                type='text'
                placeholder='e.g. Meeting with Ben at 11am'
                fullWidth
              />
              <Grid container spacing={1}>
                <Grid item>
                  <ToggleButton
                    value='check'
                    classes={{
                      root: classes.addTaskOptionToggle,
                      selected: classes.addTaskOptionToggleSelected,
                    }}
                    selected={isScheduled}
                    onChange={() => setIsScheduled(!isScheduled)}>
                    <Schedule style={{ fontSize: '1rem' }} />
                  </ToggleButton>
                </Grid>
                {isScheduled && (
                  <Grid item>
                    <TextField
                      className={classes.addTaskOptionDate}
                      variant='outlined'
                      size='small'
                      autoFocus
                      type='date'
                      label='Due date'
                      InputProps={{
                        classes: {
                          root: classes.addTaskOptionDateInput,
                        },
                        min: getDateToday(),
                      }}
                      defaultValue={getDateToday()}
                      onChange={({ target }) => {
                        setScheduleInput(target.value);
                      }}
                    />
                  </Grid>
                )}
                <Grid item>
                  <Button
                    disableRipple
                    variant='outlined'
                    onClick={() => setOpenProjectDialog(true)}
                    classes={{
                      root: classes.addTaskOptionButton,
                      startIcon: classes.addTaskOptionIcons,
                    }}
                    startIcon={<Inbox style={{ color: '#246fe0' }} />}>
                    Inbox
                  </Button>
                  <Dialog open={openProjectDialog} onClose={() => setOpenProjectDialog(false)}>
                    <DialogTitle>Select assigned project</DialogTitle>
                    <DialogContent>
                      <Select
                        native
                        value={assignedProject}
                        onChange={({ target }) => setAssignedProject(target.value)}
                        input={<Input id='demo-dialog-native' />}>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                      </Select>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpenProjectDialog(false)} color='primary'>
                        Cancel
                      </Button>
                      <Button onClick={handleSelectProject} color='primary'>
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Paper>
            <FormControl className={classes.addTaskActions}>
              <FormGroup row={true}>
                <Button
                  type='submit'
                  disabled={inputValue.length < 2}
                  className={classes.addTaskActionButton}
                  variant='contained'
                  color='primary'>
                  Add task
                </Button>
                <Button size='small' onClick={handleCancel} className={classes.addTaskActionButton}>
                  Cancel
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        )}
      </Container>
    </Box>
  );
};
