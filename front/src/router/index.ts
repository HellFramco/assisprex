import { createRouter, createWebHistory } from "vue-router";

import DashboardLayout from "../layouts/DashboardLayout.vue";

import DashboardView from "../views/DashboardView.vue";
import ProductView from "../views/ProductView.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      component: DashboardLayout,

      children: [
        {
          path: "",
          name: "dashboard",
          component: DashboardView,
        },
        {
          path: "products",
          name: "products",
          component: ProductView,
        },
        {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFound,
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: NotFound,
    },
  ],
});

export default router;