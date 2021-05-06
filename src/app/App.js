import React, { useState } from 'react';
import Content from '../components/Content';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AppContext from './context';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTask, setSelectedTask] = useState('INBOX');

  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen, selectedTask, setSelectedTask }}>
      <div className='app'>
        <Header setSidebarOpen={setSidebarOpen} />
        <Sidebar siebarOpen={sidebarOpen} />
        <Content />
      </div>
    </AppContext.Provider>
  );
}

export default App;
