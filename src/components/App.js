import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import TopNav from './Nav/top-nav';
import Content from './Content/content.js';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div id="app">
        <TopNav/>
        <Content/>
      </div>
    </Router>
  );
}

export default App;
