import { createRouter, createWebHashHistory } from "vue-router";
import AppHome from "../views/AppHome.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: AppHome,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/catalog/books",
    name: "BOOK",
    component: () => import("../components/BookList.vue"),
  },
  {
    path: "/catalog/book/:id",
    name: "BookInfo",
    component: () => import("../components/BookInfo.vue"),
  },
  {
    path: "/catalog/bookinstances",
    name: "BookInstance",
    component: () => import("../components/BookInstance.vue"),
  },
  {
    path: "/catalog/bookinstance/:id",
    name: "BookInstanceInfo",
    component: () => import("../components/BookInstanceInfo.vue"),
  },
  {
    path: "/catalog/authors",
    name: "AuthorList",
    component: () => import("../components/AuthorList.vue"),
  },
  {
    path: "/catalog/author/create",
    name: "AuthorCreate",
    component: () => import("../components/AuthorCreate.vue"),
  },
  {
    path: "/catalog/author/:id",
    name: "AuthorInfo",
    component: () => import("../components/AuthorInfo.vue"),
  },
  {
    path: "/catalog/genres",
    name: "GenreList",
    component: () => import("../components/GenreList.vue"),
  },
  {
    path: "/catalog/genre/create",
    name: "GenreCreate",
    component: () => import("../components/GenreCreate.vue"),
  },
  {
    path: "/catalog/genre/:id",
    name: "GenreInfo",
    component: () => import("../components/GenreInfo.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
