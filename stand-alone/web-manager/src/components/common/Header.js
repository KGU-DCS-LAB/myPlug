import { Link } from "react-router-dom";
function Header(){
    return (
        <>
          <nav class="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
            <div class="container-fluid">
              <Link
              className="navbar-brand"
              to="/"
              >
                MDMS
              </Link>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
  
              <div class="collapse navbar-collapse" id="navbarsExample04">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                  <li class="nav-item">
                    <Link
                    className="nav-link active"
                    to="/main"
                    >
                      Home
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                    className="nav-link"
                    to="/main"
                    >
                      Link
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                    className="nav-link disabled"
                    to="/main"
                    >
                      Disabled
                    </Link>
                  </li>
                  <li class="nav-item dropdown">
                    <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    id="dropdown04" data-bs-toggle="dropdown" aria-expanded="false"
                    >
                      Dropdown
                    </Link>
                    {/* <a class="nav-link dropdown-toggle" href="#" id="dropdown04" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a> */}
                    <ul class="dropdown-menu" aria-labelledby="dropdown04">
                      <li>
                        <Link
                        className="dropdown-item"
                        to="/main"
                        >
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link
                        className="dropdown-item"
                        to="/main"
                        >
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link
                        className="dropdown-item"
                        to="/main"
                        >
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <form>
                  <input class="form-control" type="text" placeholder="Search" aria-label="Search"/>
                </form>
              </div>
            </div>
          </nav>
        </>
      );
}

export default Header;

