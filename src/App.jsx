import "./App.css";
import TasksContext from "./TasksContext";
import TaskItem from "./components/TaskItem";
import TaskSettings from "./services/TaskSettings";
import TaskCRUD from "./services/TaskCRUD";
function App() {
	const taskData = TaskCRUD();
	return (
		<TasksContext.Provider value={taskData}>
			<h1>Список дела на React</h1>
			<TaskSettings />
			{taskData.isLoading ? <div>Загрузка...</div> : <TaskItem />}
		</TasksContext.Provider>
	);
}

export default App;
