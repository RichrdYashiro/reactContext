import { useContext } from "react";
import TasksContext from "../TasksContext";
import TaskButtons from "../components/TaskButtons";

const TaskItem = () => {
	const { filteredTasks } = useContext(TasksContext);
	return (
		<div className="todo">
			{filteredTasks.length === 0 ? (
				<div>Ничего не найдено</div>
			) : (
				filteredTasks.map(({ id, title }) => (
					<div className="todo__item" key={id}>
						<span>#{id}</span>
						<div id={id}>{title}</div>
						<TaskButtons id={id} />
					</div>
				))
			)}
		</div>
	);
};

export default TaskItem;
