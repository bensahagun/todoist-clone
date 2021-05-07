import React, { useState } from 'react';
import Content from '../components/Content';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { taskFilters } from './constants';
import AppContext from './context';
import Tasks from '../features/tasks/Tasks';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTaskFilter, setSelectedTaskFilter] = useState(taskFilters[0].key);

  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen, selectedTaskFilter, setSelectedTaskFilter }}>
      <div className='app' style={{ display: 'flex' }}>
        <Header setSidebarOpen={setSidebarOpen} />
        <Sidebar sidebarOpen={sidebarOpen} />
        <Content>
          <Content.Header title='Inbox'></Content.Header>
          <Content.Body>
            <Tasks />
          </Content.Body>
        </Content>
      </div>
    </AppContext.Provider>
  );
}

export default App;
