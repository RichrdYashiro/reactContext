import TaskAdd from "../services/TaskAdd";
import TasksService from "../services/TasksService";

const TaskSettings = () => {
	return (
		<>
			<TasksService />
			<TaskAdd />
		</>
	);
};

export default TaskSettings;
