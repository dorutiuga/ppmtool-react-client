import "./App.css";
import Header from "./common/header/header";
import Dashboard from "./features/dashboard/dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import AddProject from "./features/project/add-project";
import EditProject from "./features/project/edit-project";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddProject />} />
        <Route path="/dashboard/:projectIdentifier" element={<EditProject />} />
      </Routes>
    </div>
  );
}

export default App;
