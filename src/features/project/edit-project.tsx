import classNames from "classnames";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Project } from "../../models/project-model";
import {
  createProject,
  getProjectByIdentifier,
} from "../../service/project-service";
import {
  fetchProjectByIdentifier,
  getErrors,
  updateFields,
} from "./project-slice";

const EditProject = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.project.project);
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.project.errorMessage);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProjectByIdentifier(
          params.projectIdentifier || ""
        );
        dispatch(fetchProjectByIdentifier(res));
      } catch (err: any) {
        dispatch(getErrors(err.response.data));
      }
    };
    fetch();
  }, [params, dispatch, navigate]);

  const handleSubmit = () => {
    try {
      const updateProject: Project = {
        id: project.id,
        projectName: project.projectName,
        projectIdentifier: project.projectIdentifier,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
      };
      createProject(updateProject);
      navigate("/dashboard");
    } catch (err: any) {
      dispatch(getErrors(err.response.data));
    }
  };
  return (
    project && (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Project form</h5>
              <hr />
              <form onSubmit={() => handleSubmit()}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className={classNames("form-control form-control-lg ", {
                      "is-invalid": error.projectName,
                    })}
                    placeholder="Project Name"
                    value={project.projectName}
                    onChange={(e) => {
                      dispatch(
                        updateFields({
                          ...project,
                          projectName: e.target.value,
                        })
                      );
                    }}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Project ID"
                    value={project.projectIdentifier}
                    disabled
                  />
                </div>
                <div className="form-group mb-3">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) => {
                      dispatch(
                        updateFields({
                          ...project,
                          description: e.target.value,
                        })
                      );
                    }}
                  />
                </div>
                <h6>Start Date</h6>
                <div className="form-group mb-3">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    value={project.startDate}
                    onChange={(e) => {
                      dispatch(
                        updateFields({
                          ...project,
                          startDate: e.target.value,
                        })
                      );
                    }}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group mb-3">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={project.endDate}
                    onChange={(e) => {
                      dispatch(
                        updateFields({
                          ...project,
                          endDate: e.target.value,
                        })
                      );
                    }}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditProject;
