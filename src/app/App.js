import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Content from '../components/Content';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { taskFilters } from './fixtures';
import AppContext from './context';
import Tasks from '../features/tasks/Tasks';
import { selectProjects } from '../features/projects/projectsSlice';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTaskFilter, setSelectedTaskFilter] = useState(taskFilters[0].key);
  const [addTaskActive, setAddTaskActive] = useState(false);
  const [pageTitle, setPageTitle] = useState(taskFilters[0].name);
  const projects = useSelector(selectProjects);

  return (
    <AppContext.Provider value={{ addTaskActive, setAddTaskActive, setPageTitle, sidebarOpen, setSidebarOpen, selectedTaskFilter, setSelectedTaskFilter }}>
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
  );
}

export default App;
