import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Content from '../components/Content';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { taskFilters } from './fixtures';
import Tasks from '../features/tasks/Tasks';
import { selectProjects } from '../features/projects/projectsSlice';
import AppContext from './context';
import { themeSettings } from './theme';

function App() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(useMediaQuery('(prefers-color-scheme: dark)'));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const theme = useMemo(
    () =>
      createMuiTheme({
        ...themeSettings,
        palette: { ...themeSettings.palette, type: prefersDarkMode ? 'dark' : 'light' },
      }),
    [prefersDarkMode]
  );

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 600);
  const [selectedTaskFilter, setSelectedTaskFilter] = useState(taskFilters[0].key);
  const [addTaskActive, setAddTaskActive] = useState(false);
  const [pageTitle, setPageTitle] = useState(taskFilters[0].name);
  const projects = useSelector(selectProjects);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <AppContext.Provider
          value={{
            setPrefersDarkMode,
            addTaskActive,
            setAddTaskActive,
            setPageTitle,
            sidebarOpen,
            setSidebarOpen,
            selectedTaskFilter,
            setSelectedTaskFilter,
          }}>
          <CssBaseline />
          <div className='app' style={{ display: 'flex' }}>
            <Header setSidebarOpen={setSidebarOpen} />
            <Sidebar sidebarOpen={sidebarOpen} />
            <Content>
              <Content.Header title={pageTitle} />
              <Content.Body>
                <Tasks projects={projects} />
              </Content.Body>
            </Content>
          </div>
        </AppContext.Provider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
