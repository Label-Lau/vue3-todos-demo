import { ref, computed, nextTick } from "vue";

export default function useEditTodo(todos, editInput) {
  const editingTodo = ref(null); // 当前正在修改的是哪一个todo
  let originTitle = null;
  const editTodo = (todo) => {
    originTitle = todo.title;
    editingTodo.value = todo;
    nextTick(() => {
      editInput.value[0].focus();
    });
  };
  const doneTodo = () => {
    editingTodo.value = null;
  };
  const cancelTodo = (todo) => {
    editingTodo.value = null;
    todo.title = originTitle;
  };
  const setAllChecked = (checked) => {
    todos.value.forEach((todo) => {
      todo.completed = checked;
    });
  };
  const isAllChecked = computed(() => {
    return todos.value.every((todo) => todo.completed);
  });
  return {
    editingTodo,
    editTodo,
    doneTodo,
    cancelTodo,
    setAllChecked,
    isAllChecked,
  };
}
