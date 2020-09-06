import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from 'react-router-dom';

import AppLayout from './layout/index';

function App() {
  return (
    <Router>
      <div className="App">
        <AppLayout />
      </div>
    </Router>
  );
}

export default App;
