<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          :checked="isAllChecked"
          @input="($event) => setAllChecked($event.target.checked)"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            v-for="todo in filteredTodos"
            :key="todo.id"
            class="todo"
            :class="{
              completed: todo.completed,
              editing: todo === editingTodo,
            }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="remove(todo)"></button>
            </div>
            <input
              ref="editInput"
              v-if="todo === editingTodo"
              v-model="todo.title"
              @blur="doneTodo"
              @keyup.enter="doneTodo"
              @keyup.escape="cancelTodo(todo)"
              class="edit"
              type="text"
            />
          </li>
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ remainingCount }}</strong>
          <span>item{{ remainingCount === 1 ? "" : "s" }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibility === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibility === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          v-show="completedCount > 0"
          @click="removeCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useTodoList from "./hooks/useTodoList";
import useNewTodo from "./hooks/useNewTodo";
import useFilter from "./hooks/useFilter";
import useEditTodo from "./hooks/useEditTodo";
import useRemoveTodo from "./hooks/useRemoveTodo";

const editInput = ref(null);
const { todos } = useTodoList();
const { newTodoRef, addTodo } = useNewTodo(todos);
const { visibility, filteredTodos, remainingCount, completedCount } =
  useFilter(todos);
const {
  editingTodo,
  editTodo,
  doneTodo,
  cancelTodo,
  setAllChecked,
  isAllChecked,
} = useEditTodo(todos, editInput);

const { remove, removeCompleted } = useRemoveTodo(todos);
</script>
