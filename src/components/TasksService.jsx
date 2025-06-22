import { useContext } from "react";
import TasksContext from "../TasksContext";

const TasksService = () => {
	const {
		searchPhrase,
		sortAlphabetically,
		setSearchPhrase,
		setSortAlphabetically,
	} = useContext(TasksContext);
	return (
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
	);
};

export default TasksService;
