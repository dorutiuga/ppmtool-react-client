import classNames from "classnames";
import { FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Task } from "../../models/task.model";
import { createTask, getProjectTask } from "../../service/task-service";
import { getTaskErrors, updateTaskFields } from "./backlog-slice";

const UpdateProjectTask = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const task = useAppSelector((state) => state.backlog.task);
  const err = useAppSelector((state) => state.backlog.errorMessage);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProjectTask(
          params.projectIdentifier || "",
          params.taskId || ""
        );
        dispatch(updateTaskFields(res));
        dispatch(getTaskErrors({ summary: "", projectNotFound: "" }));
      } catch (err: any) {
        navigate("/dashboard");
      }
    };
    fetch();
  }, [dispatch, params, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updateTask: Task = {
        id: task.id,
        summary: task.summary,
        acceptanceCriteria: task.acceptanceCriteria,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
        projectIdentifier: task.projectIdentifier,
        projectSequence: task.projectSequence,
      };
      await createTask(params.projectIdentifier || "", updateTask);
      navigate(`../dashboard/projectBoard/${task.projectIdentifier}`);
    } catch (err: any) {
      dispatch(getTaskErrors(err.response.data));
    }
  };
  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <button
              onClick={() =>
                navigate(`../dashboard/projectBoard/${task.projectIdentifier}`)
              }
              className="btn btn-light"
            >
              Back to Project Board
            </button>
            <h4 className="display-4 text-center">Update Project Task</h4>
            <p className="lead text-center">Project Name + Project Code</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className={classNames("form-control form-control-lg", {
                    "is-invalid": err.summary,
                  })}
                  name="summary"
                  placeholder="Project Task summary"
                  value={task.summary}
                  onChange={(e) =>
                    dispatch(
                      updateTaskFields({
                        ...task,
                        summary: e.target.value,
                      })
                    )
                  }
                />
                {err.summary && (
                  <div className="invalid-feedback">{err.summary}</div>
                )}
              </div>
              <div className="form-group mb-3">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={task.acceptanceCriteria}
                  onChange={(e) =>
                    dispatch(
                      updateTaskFields({
                        ...task,
                        acceptanceCriteria: e.target.value,
                      })
                    )
                  }
                ></textarea>
              </div>
              <h6>Due Date</h6>
              <div className="form-group mb-3">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={(e) =>
                    dispatch(
                      updateTaskFields({
                        ...task,
                        dueDate: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="form-group mb-3">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  value={task.priority}
                  onChange={(e) =>
                    dispatch(
                      updateTaskFields({
                        ...task,
                        priority: Number(e.target.value),
                      })
                    )
                  }
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <select
                  className="form-control form-control-lg"
                  value={task.status}
                  name="status"
                  onChange={(e) =>
                    dispatch(
                      updateTaskFields({
                        ...task,
                        status: e.target.value,
                      })
                    )
                  }
                >
                  <option value="">Select Status</option>
                  <option value="TO_DO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProjectTask;
