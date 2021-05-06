import React, { useState } from 'react';
import Content from '../components/Content';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AppContext from './context';
import Tasks from '../features/tasks/Tasks';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTask, setSelectedTask] = useState('INBOX');

  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen, selectedTask, setSelectedTask }}>
      <div className='app' style={{ display: 'flex' }}>
        <Header setSidebarOpen={setSidebarOpen} />
        <Sidebar sidebarOpen={sidebarOpen} />
        <Content>
          <Tasks />
        </Content>
      </div>
    </AppContext.Provider>
  );
}

export default App;
