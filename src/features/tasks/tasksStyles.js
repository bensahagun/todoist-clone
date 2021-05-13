import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    padding: theme.spacing(0, 8),
  },
  addTask: {},
  addTaskContainer: {
    padding: theme.spacing(1, 0),
  },
  addTaskForModal: {
    marginLeft: -theme.spacing(1),
    marginRight: -theme.spacing(1),
    '& $addTaskContainer': {
      padding: 0,
    },
  },
  addTaskButton: {
    fontSize: '0.9rem',
    justifyContent: 'flex-start',
    textTransform: 'initial',
    color: theme.palette.text.primary,
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
    padding: theme.spacing(0.5, 1),
    boxSizing: 'border-box',
  },
  addTaskInput: {
    outline: 'none',
    padding: theme.spacing(0.5, 1, 1),
    '&:before, &:after': {
      display: 'none',
    },
  },
  addTaskOptions: {},
  addTaskOptionToggle: {
    padding: 0,
    maxHeight: 27,
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}!important`,
      color: theme.palette.common.white,
    },
    '&$addTaskOptionToggleSelected': {
      backgroundColor: `${theme.palette.primary.main}!important`,
      color: `${theme.palette.common.white}!important`,
    },
  },
  addTaskOptionToggleSelected: {},
  addTaskOptionDate: {
    '& input': {
      maxHeight: 27,
      fontSize: '0.75rem',
      padding: '6.5px 10px',
    },
  },
  addTaskOptionDateInput: {
    maxWidth: 135,
  },
  addTaskOptionButton: {
    fontSize: '0.75rem',
    textTransform: 'capitalize',
    padding: theme.spacing(0.25, 1.5, 0.25),
    maxHeight: 27,
    boxSizing: 'border-box',
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
    boxShadow: 'none',
    '& + $addTaskActionButton': {
      marginLeft: theme.spacing(1),
    },
  },
  list: {
    padding: 0,
    boxSizing: 'border-box',
  },
  listItem: {
    padding: 0,
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    '&:hover, &:focus': {
      backgroundColor: 'transparent',
    },
    '&:hover + $listItemEdit': {
      display: 'block',
    },
  },
  listItemIcon: {
    minWidth: 30,
    color: theme.palette.grey[500],
    padding: theme.spacing(0.5),
  },
  listItemText: {
    color: theme.palette.text.primary,
    fontSize: '0.9rem',
  },
  listItemEdit: {
    display: 'none',
    '&:hover': {
      display: 'block',
    },
  },
  addTaskModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTaskModalToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  addTaskModalClose: {
    minWidth: 30,
  },
  addTaskModalPaper: {
    position: 'absolute',
    width: 550,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 3, 1),
    '&:focus': {
      outline: 'none',
    },
  },
}));

export default useStyles;
