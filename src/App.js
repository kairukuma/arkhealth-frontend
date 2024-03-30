import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min'
import 'jquery/dist/jquery.min'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './Pages/home.js';
import Questionnaire from './Pages/questionnaire';
import Navbar from './Components/navbar';

function App() {
  return (
    <div className="cover-container text-center d-flex w-100 vh-100 mx-auto flex-column">
      <main role="main" className="inner d-flex flex-column cover flex-fill">
        <Navbar/>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/get-started" element={<Questionnaire />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
