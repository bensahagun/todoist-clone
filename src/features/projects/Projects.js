import React, { useState, useContext, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Grid,
  Collapse,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { FiberManualRecord, Add, KeyboardArrowRight, KeyboardArrowDown } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import { taskFilters } from '../../app/fixtures';
import { getServerDateTime } from '../../helpers';
import { addProject, selectProjects } from './projectsSlice';
import useStyles from './projectsStyles';
import AppContext from '../../app/context';
import { selectPendingTasks, selectPendingTasksToday, selectUpcomingTasks } from '../tasks/tasksSlice';
const ProjectsContext = createContext();

export default function Projects({ ...props }) {
  const [projectCollapsed, setProjectCollapsed] = useState(true);
  const {selectedTaskFilter, setSelectedTaskFilter} = useContext(AppContext);

  return (
    <ProjectsContext.Provider
      value={{ projectCollapsed, setProjectCollapsed, selectedTaskFilter, setSelectedTaskFilter }}>
      <Box {...props}>
        <Projects.Filters />
        <Projects.Add />
        <Projects.Listing />
      </Box>
    </ProjectsContext.Provider>
  );
}

Projects.Filters = function ProjectsFilter({ ...props }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { setAddTaskActive, setPageTitle, selectedTaskFilter, setSelectedTaskFilter } = useContext(AppContext);
  const tasks = useSelector(selectPendingTasks);
  const tasksToday = useSelector(selectPendingTasksToday);
  const tasksUpcoming = useSelector(selectUpcomingTasks);

  const handleFilterChange = (filter) => {
    setPageTitle(filter.name)
    setSelectedTaskFilter(filter.key);
    setAddTaskActive( false );
  }

  const getTaskCount = ({key}) => {
    switch(key){
      case 'INBOX':
        return tasks.filter(task=>task.projectId === 'INBOX').length;
      case 'TODAY':
        return tasksToday.length;
      case 'UPCOMING':
        return tasksUpcoming.length;
      default:
        return '';
    }
  }
  return (
    <List component='nav' className={classes.list} {...props}>
      {taskFilters.map((filter) => (
        <ListItem
          button
          key={filter.key}
          className={classes.listItem}
          onClick={() => handleFilterChange(filter)}
          selected={filter.key === selectedTaskFilter}>
          <ListItemAvatar className={classes.listItemAvatar} style={{ color: filter.color }}>
            {filter.icon}
          </ListItemAvatar>
          <ListItemText disableTypography className={classes.listItemText} primary={filter.name} />
          <ListItemSecondaryAction>
            <Typography className={classes.listItemSecondaryAction}>{ getTaskCount(filter)}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

Projects.Add = function ProjectsAdd({ ...props }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const { projectCollapsed, setProjectCollapsed } = useContext(ProjectsContext);

  const dispatch = useDispatch();

  


  const handleAddProject = () => {
    const project = {
      name: projectTitle,
      dateCreated: getServerDateTime(),
    };

    dispatch(addProject(project)).then(() => {
      setProjectTitle('');
    });
  };

  return (
    <Grid container {...props}>
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
      <Button onClick={() => setOpenAddDialog(true)} className={classes.addProjectButton}>
        <Add />
      </Button>
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add new project</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            onChange={({ target }) => setProjectTitle(target.value)}
            placeholder='Name of project'
            type='text'
            value={projectTitle}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddProject} color='primary'>
            <strong>Add</strong>
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

Projects.Listing = function ProjectsListing({ ...props }) {
  const projects = useSelector(selectProjects);
  const tasks = useSelector(selectPendingTasks);
  const theme = useTheme();
  const classes = useStyles(theme);
  const { setPageTitle,setAddTaskActive } = useContext(AppContext);
  const { projectCollapsed, selectedTaskFilter, setSelectedTaskFilter } = useContext(ProjectsContext);

  const projectTasksCount = (projId) => {
    return tasks.filter( task => task.projectId === projId ).length;
  }

  const handleFilterChange = ({id, name}) => {
    setSelectedTaskFilter(id);
    setPageTitle(name);
    setAddTaskActive( false );
  }

  return (
    <Collapse in={projectCollapsed} {...props}>
      <List component='nav'>
        {projects.map((project) => (
          <ListItem
            onClick={() => handleFilterChange(project)}
            key={project.name}
            button
            className={classes.listItem}
            selected={project.id === selectedTaskFilter}>
            <ListItemAvatar className={classes.listItemAvatar}>
              <FiberManualRecord style={{ fontSize: '1rem' }} />
            </ListItemAvatar>
            <ListItemText className={classes.listItemText} disableTypography primary={project.name} />
            <ListItemSecondaryAction>
              <Typography className={classes.listItemSecondaryAction}>
                { projectTasksCount(project.id) > 0 ? projectTasksCount(project.id) : '' }
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
};
