import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentUser } from "../../features/auth/user.slice";
import { setJWTToken } from "../../helpers/security";

const Header = () => {
  const dispatch = useAppDispatch();
  const validToken = useAppSelector((state) => state.user.validToken);
  const user = useAppSelector((state) => state.user.user);
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch(
      setCurrentUser({
        username: "",
        fullName: "",
        confirmPassword: "",
        password: "",
      })
    );
  };

  const userIsAuthenticated = (
    <div
      className="collapse navbar-collapse justify-content-end "
      id="mobile-nav"
    >
      <ul className="navbar-nav mr-auto ">
        <li className="nav-item">
          <Link to={"/dashboard"} className="nav-link">
            Dashboard
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav mr-auto ">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-user-circle m-1" />
            {user.fullName}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );

  const userIsNotAuthenticated = (
    <div
      className="collapse navbar-collapse justify-content-end"
      id="mobile-nav"
    >
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );

  let headerLinks;

  if (validToken && user) {
    headerLinks = userIsAuthenticated;
  } else {
    headerLinks = userIsNotAuthenticated;
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to={"/dashboard"} className="navbar-brand">
            Personal Project Management Tool
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {headerLinks}
        </div>
      </nav>
    </>
  );
};

export default Header;
