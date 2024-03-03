import { ref } from "vue";
import { generateId } from "../utils/todoStorage";

export default function useNewTodo(todos) {
  const newTodoRef = ref("");
  const addTodo = () => {
    const value = newTodoRef.value?.trim() || "";
    if (!value) return;
    const todo = {
      id: generateId(),
      title: value,
      completed: false,
    };
    todos.value.unshift(todo);
    newTodoRef.value = "";
  };
  return {
    newTodoRef,
    addTodo,
  };
}
