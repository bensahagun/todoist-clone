import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '@fontsource/roboto';
import { store } from './app/store';
import { fetchTasks } from './features/tasks/tasksSlice';
import { fetchProjects } from './features/projects/projectsSlice';
import App from './app/App';

store.dispatch(fetchProjects());
store.dispatch(fetchTasks());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
