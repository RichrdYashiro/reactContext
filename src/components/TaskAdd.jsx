import { useContext } from "react";
import TasksContext from "../TasksContext";
const TaskAdd = () => {
	const { newTaskTitle, setNewTaskTitle, requestTask, blockButton } =
		useContext(TasksContext);

	return (
		<div className="add-task">
			<input
				type="text"
				value={newTaskTitle}
				onChange={(e) => setNewTaskTitle(e.target.value)}
				placeholder="Введите новую задачу"
			/>
			<button onClick={requestTask} disabled={blockButton}>
				Добавить задачу
			</button>
		</div>
	);
};
export default TaskAdd;
