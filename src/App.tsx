import "./App.css";
import Header from "./common/header/header";
import Dashboard from "./features/dashboard/dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import AddProject from "./features/project/add-project";
import EditProject from "./features/project/edit-project";
import ProjectBoard from "./features/backlog/project-board";
import AddProjectTask from "./features/backlog/add-project-task";
import UpdateProjectTask from "./features/backlog/update-project-task";
import LandingPage from "./features/landing-page/landing-page";
import Login from "./features/auth/login";
import Register from "./features/auth/register";
import { setJWTToken } from "./helpers/security";
import jwtDecode from "jwt-decode";
import { useAppDispatch } from "./app/hooks";
import { setCurrentUser } from "./features/auth/user.slice";
import { User } from "./models/user-model";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (jwtToken) {
      setJWTToken(jwtToken);
      const decode: User = jwtDecode(jwtToken);
      dispatch(setCurrentUser(decode));
    }
  }, [dispatch, jwtToken]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={!jwtToken ? <Navigate to={"/"} /> : <Dashboard />}
        />
        <Route
          path="/add"
          element={!jwtToken ? <Navigate to={"/"} /> : <AddProject />}
        />
        <Route
          path="/dashboard/:projectIdentifier"
          element={!jwtToken ? <Navigate to={"/"} /> : <EditProject />}
        />
        <Route
          path="/dashboard/projectBoard/:projectIdentifier"
          element={!jwtToken ? <Navigate to={"/"} /> : <ProjectBoard />}
        />
        <Route
          path="/addProjectTask/:projectIdentifier"
          element={!jwtToken ? <Navigate to={"/"} /> : <AddProjectTask />}
        />
        <Route
          path="/updateProjectTask/:projectIdentifier/:taskId"
          element={!jwtToken ? <Navigate to={"/"} /> : <UpdateProjectTask />}
        />
      </Routes>
    </div>
  );
}

export default App;
