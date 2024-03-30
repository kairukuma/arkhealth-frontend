import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min'
import 'jquery/dist/jquery.min'

import HeroMain from './Components/hero';

// import Navbar from './Components/navbar';

function App() {
  return (
  <div className="cover-container text-center d-flex w-100 h-100 p-3 mx-auto flex-column">
    <main role="main" className="inner cover">
    <div
        className='px-5 text-center'
        style={{height:"100vh"}}
    >
      <HeroMain/>
    </div>
    </main>
  </div>
  );
}

export default App;
