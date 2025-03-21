import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faCheck,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { showAlertDelete } from '../../helpers/Alert';

interface ControlTaskProps {
  id: string;
  title: string;
  isCompleted: boolean;
  onDone: (id: string) => void;
  onEdit: (id: string, value: string) => void;
  onRemove: (id: string) => void;
}

const ControlTask: React.FC<ControlTaskProps> = ({
  id,
  title,
  isCompleted,
  onDone,
  onEdit,
  onRemove,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEdit]);

  return (
    
    <div className={styles.controlTask}>
      <label className={styles.controlTaskLabel}>
        <input
          type='checkbox'
          disabled={isEdit}
          checked={isCompleted}
          className={styles.controlTaskCheckbox}
          onChange={() => onDone(id)}
        />
        {isEdit ? (
          <input
            value={value}
            ref={editTitleInputRef}
            onChange={(evt) => {
              setValue(evt.target.value);
            }}
            onKeyDown={(evt) => {
              if (evt.key === "Enter") {
                onEdit(id, value);
                setIsEdit(false);
              }
            }}
            className={styles.controlTaskEditTitle}
          />
        ) : (
          <p>{title}</p>
        )}
      </label>
      {isEdit ? (
        <button
          area-label='Save'
          className={styles.controlTaskSave}
          onClick={() => {
            onEdit(id, value);
            setIsEdit(false);
          }}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      ) : (
        <button
          area-label='Edit'
          className={styles.controlTaskEdit}
          onClick={() => {
            setIsEdit(true);
          }}
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
      )}

      <button
        className={styles.controlTaskRemove}
        onClick={async () => {
          const result = await showAlertDelete();
          if (result?.isConfirmed) {
            onRemove(id);
          }
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  );
};

export default ControlTask;
