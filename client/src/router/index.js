import { createRouter, createWebHistory } from "vue-router";
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
    path: "/catalog/book/create",
    name: "BookCreate",
    component: () => import("../components/BookCreate.vue"),
  },
  {
    path: "/catalog/book/:id/update",
    name: "BookUpdate",
    component: () => import("../components/BookUpdate.vue"),
  },
  {
    path: "/catalog/bookinstance",
    name: "BookInstance",
    component: () => import("../components/BookInstance.vue"),
  },
  {
    path: "/catalog/bookinstance/create",
    name: "BookInstanceCreate",
    component: () => import("../components/BookInstanceCreate.vue"),
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
    path: "/catalog/author/:id/delete",
    name: "AuthorDelete",
    component: () => import("../components/AuthorDelete.vue"),
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
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("../components/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
