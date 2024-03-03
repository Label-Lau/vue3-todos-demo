export default function useRemoveTodo(todos) {
  const remove = (todo) => {
    const index = todos.value.indexOf(todo);
    todos.value.splice(index, 1);
  };

  const removeCompleted = () => {
    todos.value = todos.value.filter((it) => !it.completed);
  };

  return {
    remove,
    removeCompleted,
  };
}
