import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { updateProjects } from "../../features/dashboard/dashboard-slice";
import { deleteProjectByIdentifier } from "../../service/project-service";

interface ProjectProps {
  projectName: string;
  projectIdentifier: string;
  description: string;
}

const ProjectItem: FC<ProjectProps> = ({
  projectName,
  projectIdentifier,
  description,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this project and its related data? "
      )
    ) {
      await deleteProjectByIdentifier(projectIdentifier);
      dispatch(updateProjects(projectIdentifier));
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{projectIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{projectName}</h3>
              <p>{description}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <li className="list-group-item board">
                  <i className="fa fa-flag-checkered pr-1"> Project Board</i>
                </li>

                <li
                  className="list-group-item update"
                  onClick={() => {
                    navigate(`${projectIdentifier}`);
                  }}
                >
                  <i className="fa fa-edit pr-1"> Update Project Info</i>
                </li>

                <li
                  className="list-group-item delete"
                  onClick={() => handleDelete()}
                >
                  <i className="fa fa-minus-circle pr-1">Delete Project</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectItem;
