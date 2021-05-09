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

const ProjectsContext = createContext();

export default function Projects({ ...props }) {
  const [projectCollapsed, setProjectCollapsed] = useState(true);
  const [selectedTaskFilter, setSelectedTaskFilter] = useState(taskFilters[0].name);

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
  const { selectedTaskFilter, setSelectedTaskFilter } = useContext(ProjectsContext);

  return (
    <List component='nav' className={classes.list} {...props}>
      {taskFilters.map((filter) => (
        <ListItem
          button
          key={filter.key}
          className={classes.listItem}
          onClick={() => setSelectedTaskFilter(filter.key)}
          selected={filter.key === selectedTaskFilter}>
          <ListItemAvatar className={classes.listItemAvatar} style={{ color: filter.color }}>
            {filter.icon}
          </ListItemAvatar>
          <ListItemText disableTypography className={classes.listItemText} primary={filter.name} />
          <ListItemSecondaryAction>
            <Typography className={classes.listItemSecondaryAction}>1</Typography>
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

  const theme = useTheme();
  const classes = useStyles(theme);
  const { projectCollapsed, selectedTaskFilter, setSelectedTaskFilter } = useContext(ProjectsContext);

  return (
    <Collapse in={projectCollapsed} {...props}>
      <List component='nav'>
        {projects.map((project) => (
          <ListItem
            onClick={() => setSelectedTaskFilter(project.id)}
            key={project.name}
            button
            className={classes.listItem}
            selected={project.id === selectedTaskFilter}>
            <ListItemAvatar className={classes.listItemAvatar}>
              <FiberManualRecord style={{ fontSize: '1rem' }} />
            </ListItemAvatar>
            <ListItemText className={classes.listItemText} disableTypography primary={project.name} />
            <ListItemSecondaryAction>
              <Typography className={classes.listItemSecondaryAction}>1</Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
};