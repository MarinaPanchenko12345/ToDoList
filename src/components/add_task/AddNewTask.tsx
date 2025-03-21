import React, { useCallback, useState } from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface AddTaskProps {
  onAdd: (title: string) => void;
}

const AddNewTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");

  const AddTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue]);

  return (
    <div className={styles.addTask}>
      <input
        type='text'
        placeholder='Add Your Task ...'
        className={styles.addTaskValue}
        value={inputValue}
        onChange={(evt) => {
          setInputValue(evt.target.value);
        }}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            AddTask();
          }
        }}
      />
      <button
        onClick={AddTask}
        aria-label='Add Task'
        className={styles.addTaskButton}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default AddNewTask;
