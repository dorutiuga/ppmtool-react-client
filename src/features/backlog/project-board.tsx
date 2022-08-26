import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { SummaryValidation } from "../../models/task-validation";
import Backlog from "./backlog";

const ProjectBoard = () => {
  const params = useParams();
  const errors = useAppSelector((state) => state.backlog.errorMessage);

  let BoardContent;

  const boardAlgorithm = (errors: SummaryValidation) => {
    if (errors.projectNotFound) {
      return (
        <div className="alert alert-danger text-center" role="alert">
          {errors.projectNotFound}
        </div>
      );
    } else {
      return <Backlog />;
    }
  };

  BoardContent = boardAlgorithm(errors);

  return (
    <div className="container">
      <Link
        to={`/addProjectTask/${params.projectIdentifier}`}
        className="btn btn-primary mb-3"
      >
        <i className="fas fa-plus-circle"> Create Project Task</i>
      </Link>
      <br />
      <hr />
      {BoardContent}
    </div>
  );
};

export default ProjectBoard;
