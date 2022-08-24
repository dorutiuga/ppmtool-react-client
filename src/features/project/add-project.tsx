import classNames from "classnames";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Project } from "../../models/project-model";
import { createProject } from "../../service/project-service";
import { getErrors, resetFields, updateFields } from "./project-slice";

const AddProject = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.project.project);
  const error = useAppSelector((state) => state.project.errorMessage);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProject: Project = {
      projectName: project.projectName,
      projectIdentifier: project.projectIdentifier,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
    };
    try {
      await createProject(newProject);
      dispatch(resetFields());
      navigate("/dashboard");
    } catch (err: any) {
      dispatch(getErrors(err.response.data));
    }
  };

  return (
    <>
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project form</h5>
              <hr />
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className={classNames("form-control form-control-lg ", {
                      "is-invalid": error.projectName,
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={project.projectName}
                    onChange={(e) =>
                      dispatch(
                        updateFields({
                          ...project,
                          projectName: e.target.value,
                        })
                      )
                    }
                  />
                  {error.projectName && (
                    <div className="invalid-feedback">{error.projectName}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className={classNames("form-control form-control-lg ", {
                      "is-invalid": error.projectIdentifier,
                    })}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={project.projectIdentifier}
                    // disabled
                    onChange={(e) =>
                      dispatch(
                        updateFields({
                          ...project,
                          projectIdentifier: e.target.value,
                        })
                      )
                    }
                  />
                  {error.projectIdentifier && (
                    <div className="invalid-feedback">
                      {error.projectIdentifier}
                    </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <textarea
                    className={classNames("form-control form-control-lg ", {
                      "is-invalid": error.description,
                    })}
                    placeholder="Project Description"
                    name="description"
                    value={project.description}
                    onChange={(e) =>
                      dispatch(
                        updateFields({
                          ...project,
                          description: e.target.value,
                        })
                      )
                    }
                  ></textarea>
                  {error.description && (
                    <div className="invalid-feedback">{error.description}</div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group mb-3">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="startDate"
                    value={project.startDate}
                    onChange={(e) =>
                      dispatch(
                        updateFields({
                          ...project,
                          startDate: e.target.value,
                        })
                      )
                    }
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group mb-3">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="endDate"
                    value={project.endDate}
                    onChange={(e) =>
                      dispatch(
                        updateFields({
                          ...project,
                          endDate: e.target.value,
                        })
                      )
                    }
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
    </>
  );
};

export default AddProject;
