import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllTasks } from "../../service/task-service";
import { fetchTasks, getTaskErrors } from "./backlog-slice";
import ProjectTask from "./project-task";

const Backlog = () => {
  const dispatch = useAppDispatch();
  const projectTasks = useAppSelector((state) => state.backlog.projectTasks);
  const params = useParams();

  const tasks = projectTasks.map((task) => (
    <ProjectTask key={task.id} {...task} />
  ));

  let todoItems = [];
  let inProgressItems = [];
  let doneItems = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].props.status === "TO_DO") {
      todoItems.push(tasks[i]);
    }

    if (tasks[i].props.status === "IN_PROGRESS") {
      inProgressItems.push(tasks[i]);
    }

    if (tasks[i].props.status === "DONE") {
      doneItems.push(tasks[i]);
    }
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetchAllTasks(params.projectIdentifier || "");
        dispatch(fetchTasks(res));
      } catch (err: any) {
        dispatch(getTaskErrors(err.response.data));
      }
    };
    fetch();
  }, [dispatch, params]);

  console.log(projectTasks.length);

  return projectTasks.length > 0 ? (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-secondary text-white">
              <h3>TO DO</h3>
            </div>
          </div>
          {todoItems}
        </div>
        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-primary text-white">
              <h3>In Progress</h3>
            </div>
          </div>
          {inProgressItems}
        </div>
        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-success text-white">
              <h3>Done</h3>
            </div>
          </div>
          {doneItems}
        </div>
      </div>
    </div>
  ) : (
    <div className="alert alert-info text-center" role="alert">
      No Project Tasks on this board
    </div>
  );
};

export default Backlog;
