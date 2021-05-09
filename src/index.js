import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import '@fontsource/roboto';
import { store } from './app/store';
import { fetchTasks } from './features/tasks/tasksSlice';
import { fetchProjects } from './features/projects/projectsSlice';
import { theme } from './app/theme';
import App from './app/App';

store.dispatch(fetchProjects());
store.dispatch(fetchTasks());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StylesProvider injectFirst>
          <App />
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
