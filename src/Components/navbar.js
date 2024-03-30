import { ReactComponent as Logo } from '../logo.svg';

function Navbar() {
  return (
    <header className="masthead">
        <nav className="navbar navbar-expand-sm navbar-light">
            <div className="container-fluid ">
            <a className="navbar-brand " href="/">
            <Logo style={{height:48}}/>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">About</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">Log In</a>
            </li>
            </ul>		  
            </div>
            </div>
        </nav>
    </header>
  );
}

export default Navbar;