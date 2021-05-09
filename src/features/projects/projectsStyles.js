import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  listItemActive: {
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

export default useStyles;
