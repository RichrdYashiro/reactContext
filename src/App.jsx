import { useEffect, useState } from "react";

import "./App.css";

function App() {
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [refreshTasksFlag, setRefreshTasksFlag] = useState(false);
	const [blockButton, setBlockButton] = useState(false);
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [searchPhrase, setSearchPhrase] = useState("");
	const [sortAlphabetically, setSortAlphabetically] = useState(false);
	const refreshTask = () => {
		setRefreshTasksFlag((prev) => !prev);
	};

	useEffect(() => {
		fetch("http://localhost:3000/todos")
			.then((response) => response.json())
			.then((loadTask) => {
				setTasks(loadTask);

				setFilteredTasks(loadTask);
				setIsLoading(false);
			})
			.catch((error) => console.error("Ошибка получения данных", error));
	}, [refreshTasksFlag]);

	useEffect(() => {
		fetch("http://localhost:3000/todos")
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
		fetch("http://localhost:3000/todos", {
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
		fetch(`http://localhost:3000/todos/${id}`, {
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
		fetch(`http://localhost:3000/todos/${id}`, {
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
	return (
		<>
			<h1>Список дела на React</h1>
			<div className="controls">
				<div className="search-task">
					<input
						type="text"
						value={searchPhrase}
						onChange={(e) => setSearchPhrase(e.target.value)}
						placeholder="Поиск задач..."
					/>
				</div>
				<button
					className={`sort-btn ${sortAlphabetically ? "active" : ""}`}
					onClick={() => setSortAlphabetically(!sortAlphabetically)}
				>
					{sortAlphabetically
						? "Отменить сортировку"
						: "Сортировать по алфавиту"}
				</button>
			</div>

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

			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				<div className="todo">
					{filteredTasks.length === 0 ? (
						<div>Ничего не найдено</div>
					) : (
						filteredTasks.map(({ id, title }) => (
							<div className="todo__item" key={id}>
								<span>#{id}</span>
								<div id={id}>{title}</div>
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
							</div>
						))
					)}
				</div>
			)}
		</>
	);
}

export default App;
