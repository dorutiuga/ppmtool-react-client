import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { deleteProjectTask } from "../../service/task-service";
import { deleteProjectTaskFromBacklog } from "./backlog-slice";

interface TaskProps {
  priority: number;
  summary: string;
  acceptanceCriteria: string;
  projectSequence: string;
  projectIdentifier: string;
}

const ProjectTask: FC<TaskProps> = ({
  priority,
  projectSequence,
  projectIdentifier,
  summary,
  acceptanceCriteria,
}) => {
  let priorityString;
  let priorityClass;
  const dispatch = useAppDispatch();

  if (priority === 1) {
    priorityClass = "bg-danger text-light";
    priorityString = "HIGH";
  }

  if (priority === 2) {
    priorityClass = "bg-warning text-light";
    priorityString = "MEDIUM";
  }

  if (priority === 3) {
    priorityClass = "bg-info text-light";
    priorityString = "LOW";
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task? ")) {
      await deleteProjectTask(projectIdentifier, projectSequence);
      dispatch(deleteProjectTaskFromBacklog(projectSequence));
    }
  };

  return (
    <div className="card mb-1 bg-light">
      <div className={`card-header text-primary ${priorityClass}`}>
        ID: {projectSequence} -- Priority: {priorityString}
      </div>
      <div className="card-body bg-light">
        <h5 className="card-title">{summary}</h5>
        <p className="card-text text-truncate ">{acceptanceCriteria}</p>
        <Link
          to={`/updateProjectTask/${projectIdentifier}/${projectSequence}`}
          className="btn btn-primary"
        >
          View / Update
        </Link>
        <button className="btn btn-danger m-2" onClick={() => handleDelete()}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectTask;
