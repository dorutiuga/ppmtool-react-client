import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ProjectItem from "../../common/project-item/project-item";
import { Project } from "../../models/project-model";
import { getAllProjects } from "../../service/project-service";
import { fetchAllProjects } from "./dashboard-slice";

const Dashboard = () => {
  const projects = useAppSelector((state) => state.dashboard.projects);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      const res: Project[] = await getAllProjects();
      dispatch(fetchAllProjects(res));
    };
    fetch();
  }, [dispatch]);
  return (
    <>
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />

              <Link to="/add" className="btn btn-lg btn-info">
                Create a Project
              </Link>
              <br />
              <hr />
              {projects.map((item: Project) => (
                <ProjectItem {...item} key={item.projectIdentifier} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
