import "./App.css";
import Header from "./common/header/header";
import Dashboard from "./features/dashboard/dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import AddProject from "./features/project/add-project";
import EditProject from "./features/project/edit-project";
import ProjectBoard from "./features/backlog/project-board";
import AddProjectTask from "./features/backlog/add-project-task";
import UpdateProjectTask from "./features/backlog/update-project-task";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddProject />} />
        <Route path="/dashboard/:projectIdentifier" element={<EditProject />} />
        <Route
          path="/dashboard/projectBoard/:projectIdentifier"
          element={<ProjectBoard />}
        />
        <Route
          path="/addProjectTask/:projectIdentifier"
          element={<AddProjectTask />}
        />
        <Route
          path="/updateProjectTask/:projectIdentifier/:taskId"
          element={<UpdateProjectTask />}
        />
      </Routes>
    </div>
  );
}

export default App;
