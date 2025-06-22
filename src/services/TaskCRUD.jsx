import { useEffect, useState } from "react";

const TaskCRUD = () => {
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [refreshTasksFlag, setRefreshTasksFlag] = useState(false);
	const [blockButton, setBlockButton] = useState(false);
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [searchPhrase, setSearchPhrase] = useState("");
	const [sortAlphabetically, setSortAlphabetically] = useState(false);
	const TODO_URL = "http://localhost:3000/todos";
	const refreshTask = () => {
		setRefreshTasksFlag((prev) => !prev);
	};

	useEffect(() => {
		fetch(TODO_URL)
			.then((response) => response.json())
			.then((loadTask) => {
				setTasks(loadTask);

				setFilteredTasks(loadTask);
				setIsLoading(false);
			})
			.catch((error) => console.error("Ошибка получения данных", error));
	}, [refreshTasksFlag]);

	useEffect(() => {
		let result = [...tasks];

		if (searchPhrase.trim() !== "") {
			result = result.filter((task) =>
				task.title.toLowerCase().includes(searchPhrase.toLowerCase())
			);
		}

		if (sortAlphabetically) {
			result.sort((a, b) => a.title.localeCompare(b.title));
		}

		setFilteredTasks(result);
	}, [searchPhrase, tasks, sortAlphabetically]);

	const requestTask = () => {
		if (!newTaskTitle.trim()) return;
		setBlockButton(true);
		fetch(TODO_URL, {
			method: "POST",
			headers: { "Content-type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: newTaskTitle,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				refreshTask();
				setNewTaskTitle("");
			})
			.finally(() => setBlockButton(false));
	};

	const deleteTask = (id) => {
		setBlockButton(true);
		fetch(`${TODO_URL}/${id}`, {
			method: "DELETE",
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				refreshTask();
			})
			.finally(() => setBlockButton(false));
	};
	const reworkBtn = (id) => {
		setBlockButton(true);
		fetch(`${TODO_URL}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: "fdsdf",
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				refreshTask();
			})
			.finally(() => setBlockButton(false));
	};

	return {
		tasks,
		filteredTasks,
		blockButton,
		newTaskTitle,
		searchPhrase,
		sortAlphabetically,
		setNewTaskTitle,
		setSearchPhrase,
		setSortAlphabetically,
		requestTask,
		deleteTask,
		reworkBtn,
		refreshTask,
		isLoading,
	};
};
export default TaskCRUD;
