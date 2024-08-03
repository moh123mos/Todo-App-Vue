import { createRouter, createWebHistory } from "vue-router";
import MyMain from "@/views/MyMain.vue";
import ShowTasks from "@/views/ShowTasks.vue";
const routes = [
  {
    name: "home",
    path: "/",
    component: MyMain,
    meta: {
      title: "Home",
    },
  },
  {
    name: "showTasks",
    path: "/show-tasks",
    component: ShowTasks,
    meta: {
      title: "Show Tasks",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});
export default router;
