import React, { useContext, useState, useEffect } from 'react';
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
import { Add, Inbox, CheckCircleOutlined, RadioButtonUncheckedOutlined, Schedule, Close, FiberManualRecord } from '@material-ui/icons';
import clsx from 'clsx';
import useStyles from './tasksStyles';
import { selectPendingTasks, selectUpcomingTasks,  selectPendingTasksToday , addTask, completeTask } from './tasksSlice';
import { ToggleButton } from '@material-ui/lab';
import { getDateToday, getServerDateTime } from '../../helpers';
import { selectProjects } from '../projects/projectsSlice';
import { taskFilters} from '../../app/fixtures';
import AppContext from '../../app/context';

export default function Tasks({ ...props }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Box {...props} className={classes.root}>
      <Container maxWidth='md' className={classes.container}>
        <Tasks.List />
        <Tasks.Add />
        <Tasks.AddModal />
      </Container>
    </Box>
  );
}

Tasks.List = function TasksList() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const { selectedTaskFilter } = useContext(AppContext);
  const tasks = useSelector(selectPendingTasks);
  const tasksToday = useSelector(selectPendingTasksToday);
  const tasksUpcoming = useSelector(selectUpcomingTasks);

  const getFilteredTasks = () => {
    switch(selectedTaskFilter){
      case 'TODAY':
        return tasksToday;

      case 'UPCOMING':
        return tasksUpcoming;

      default:
        return tasks.filter( (task) => task.projectId === selectedTaskFilter);
    }
  }


  const handleCompleteTask = (taskId) => {
    dispatch(completeTask(taskId));
  };


  return (
    <List className={classes.list}>
      {getFilteredTasks().map((task) => (
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

Tasks.AddModal = function TasksAddModal({ modalOpen = false, setModalOpen }) {
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
        <Tasks.Add forModal={true} setModalOpen={setModalOpen} />
      </Paper>
    </Modal>
  );
};

Tasks.Add = function TasksAdd({ forModal = false, setModalOpen }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const { addTaskActive, setAddTaskActive, selectedTaskFilter } = useContext(AppContext);

  const [inputValue, setInputValue] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleInput, setScheduleInput] = useState(getDateToday());

  const [assignedProject, setAssignedProject] = useState( 'INBOX' );
  const [openProjectDialog, setOpenProjectDialog] = useState(false);

  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  useEffect(() => {

  selectedTaskFilter === 'TODAY' || selectedTaskFilter === 'UPCOMING' ? setAssignedProject('INBOX') : 
    setAssignedProject(selectedTaskFilter);
    
  }, [selectedTaskFilter])

 
  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      title: inputValue,
      isCompleted: false,
      dueDate: scheduleInput,
      projectId: assignedProject,
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

  const handleDialogClose = () => {
     setOpenProjectDialog(false);
  }

  return (
    <Box className={clsx(classes.addTask, forModal && classes.addTaskForModal)}>
      <Container className={classes.addTaskContainer}>
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
                    startIcon={ assignedProject === 'INBOX' ? <Inbox style={{ color: '#246fe0' }} /> : <FiberManualRecord/>}>
                   
                    { assignedProject === 'INBOX' ? 'Inbox' : projects.find(project => project.id === assignedProject).name}
                  </Button>

                  <Dialog open={openProjectDialog} onClose={ handleDialogClose }>
                    <DialogTitle>Select assigned project</DialogTitle>
                    <DialogContent>
                      <Select
                        fullWidth
                        native
                        value={assignedProject}
                        onChange={({ target }) => setAssignedProject(target.value)}
                        input={<Input />}>
                        <option value='INBOX'>Inbox</option>
                        {projects.map((project) => (
                          <option value={project.id} > {project.name}</option>
                        ))}
                      </Select>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpenProjectDialog(false)}>Cancel</Button>
                      <Button onClick={() => setOpenProjectDialog(false)} color='primary'>
                        <strong>Select</strong>
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
