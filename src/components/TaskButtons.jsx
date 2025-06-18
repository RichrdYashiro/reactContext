import { useContext } from "react";
import TasksContext from "../TasksContext";

const TaskButtons = ({ id }) => {
	const { reworkBtn, deleteTask, blockButton, tasks } =
		useContext(TasksContext);

	return (
		<>
			<button
				className="reworkBtn"
				onClick={() => reworkBtn(id)}
				disabled={blockButton}
			>
				R
			</button>
			<button
				className="deleteBtn"
				onClick={() => deleteTask(id)}
				disabled={blockButton || tasks.length === 0}
			>
				X
			</button>
		</>
	);
};

export default TaskButtons;
