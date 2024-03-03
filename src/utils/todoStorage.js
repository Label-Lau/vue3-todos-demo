const LOCAL_KEY = "todo-demo";

/**
 * description 获取目前所有任务
 */
export function fetch() {
  const result = localStorage.getItem(LOCAL_KEY);
  // 返回查询结果作为JSON对象.
  if (result) {
    try {
      return JSON.parse(result);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  return [];
}

/**
 * description 保存所有任务
 */
export function save(data) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}

/**
 * description 生成一个任务的唯一编号，时间戳+4位随机数
 */
export function generateId() {
  return Date.now() + Math.random().toString(16).substring(2, 4);
}

/**
 * description 过滤所有任务
 */
export function filter(todos, visibility = "all") {
  if (visibility === "all") {
    return todos;
  } else if (visibility === "active") {
    return todos.filter((todo) => !todo.completed);
  } else if (visibility === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  return [];
}
