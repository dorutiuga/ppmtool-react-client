import classNames from "classnames";
import { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Task } from "../../models/task.model";
import { createTask } from "../../service/task-service";
import {
  getTaskErrors,
  resetTaskFields,
  updateTaskFields,
} from "./backlog-slice";

const AddProjectTask = () => {
  const params = useParams();
  const task = useAppSelector((state) => state.backlog.task);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.backlog.errorMessage);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: Task = {
      id: task.id,
      projectSequence: task.projectSequence,
      summary: task.summary,
      acceptanceCriteria: task.acceptanceCriteria,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      projectIdentifier: params.projectIdentifier || "",
    };
    try {
      await createTask(params.projectIdentifier || "", newTask);
      dispatch(resetTaskFields());
      navigate(`/dashboard/projectBoard/${params.projectIdentifier}`);
    } catch (err: any) {
      dispatch(getTaskErrors(err.response.data));
    }
  };

  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link
              to={`/dashboard/projectBoard/${params.projectIdentifier}`}
              className="btn btn-light"
            >
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Add Project Task</h4>
            <p className="lead text-center">Project Name + Project Code</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group mb-3 ">
                <input
                  type="text"
                  className={classNames("form-control form-control-lg", {
                    "is-invalid": error.summary,
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
                {error.summary && (
                  <div className="invalid-feedback">{error.summary}</div>
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
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg mb-2"
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
              <div className="form-group">
                <select
                  className="form-control form-control-lg mb-2"
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

              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="status"
                  value={task.status}
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

export default AddProjectTask;
