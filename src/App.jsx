import "./App.css";
import TasksContext from "./context/TasksContext";
import TaskItem from "./components/TaskItem";
import TaskSettings from "./components/TaskSettings";
import useTasks from "./components/useTasks";
function App() {
	const taskData = useTasks();
	return (
		<TasksContext.Provider value={taskData}>
			<h1>Список дела на React</h1>
			<TaskSettings />
			{taskData.isLoading ? <div>Загрузка...</div> : <TaskItem />}
		</TasksContext.Provider>
	);
}

export default App;
