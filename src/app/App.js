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
  const projects = useSelector(selectProjects);

  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen, selectedTaskFilter, setSelectedTaskFilter }}>
      <div className='app' style={{ display: 'flex' }}>
        <Header setSidebarOpen={setSidebarOpen} />
        <Sidebar sidebarOpen={sidebarOpen} />
        <Content>
          <Content.Header title='Inbox' />
          <Content.Body>
            <Tasks projects={projects} />
          </Content.Body>
        </Content>
      </div>
    </AppContext.Provider>
  );
}

export default App;
