<template>
  <header class="border-b-2 border-blue-500 shadow-2xl">
    <div class="container mx-auto px-4">
      <nav>
        <ul class="flex justify-center flex-wrap">
          <li class="p-1.5"><router-link to="/"> Home</router-link></li>
          <li class="p-1.5">
            <router-link to="/catalog/books">All books</router-link>
          </li>
          <li class="p-1.5">
            <router-link to="/catalog/authors">All authors</router-link>
          </li>
          <li class="p-1.5">
            <router-link to="/catalog/genres">All genres</router-link>
          </li>
          <li class="p-1.5">
            <router-link to="/catalog/bookinstance"
              >All book-instance
            </router-link>
          </li>
          <li class="p-1.5">
            <router-link to="/catalog/author/create"
              >Create new author
            </router-link>
          </li>
          <li class="p-1.5">
            <router-link to="/catalog/genre/create"
              >Create new genre
            </router-link>
          </li>
          <li class="p-1.5">
            <router-link to="/catalog/book/create">
              Create new book
            </router-link>
          </li>
          <li class="p-1.5">
            <router-link to="/catalog/bookinstance/create">
              Create new book instance (copy)
            </router-link>
          </li>
          <li class="p-1.5">
            <router-link to="/sendmail"> Send Mail </router-link>
          </li>
          <li class="p-1.5">
            <router-link to="/users/auth"> Auth </router-link>
          </li>
          <li class="p-1.5">
            <button @click.stop="logout">logout</button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import User from "../api/User";
export default {
  data() {
    return {};
  },
  methods: {
    async logout() {
      await User.logout();
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 40px;
}
li {
  font-weight: 700;
  &:hover {
    color: gray;
  }
}
</style>
