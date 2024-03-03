import { ref, onMounted, onUnmounted, computed } from "vue";
import { filter } from "../utils/todoStorage";

const validHash = ["all", "active", "completed"];

export default function useFilter(todosRef) {
  const visibility = ref("all");
  const filteredTodos = computed(() =>
    filter(todosRef.value, visibility.value)
  );
  const remainingCount = computed(
    () => filter(todosRef.value, "active").length
  );
  const completedCount = computed(
    () => filter(todosRef.value, "completed").length
  );
  const onHashChange = () => {
    const hash = window.location.hash.replace(/#\/?/, "");
    if (validHash.includes(hash)) {
      visibility.value = hash;
    } else {
      location.hash = "";
      visibility.value = "all";
    }
  };
  onMounted(() => {
    window.addEventListener("hashchange", onHashChange);
  });
  onUnmounted(() => {
    window.removeEventListener("hashchange", onHashChange);
  });
  return {
    visibility,
    filteredTodos,
    remainingCount,
    completedCount,
  };
}
