<template>
  <p v-if="bookList.length === 0"></p>
  <ul v-else>
    <li v-for="book in bookList" :key="book._id" class="p-2">
      <router-link
        :to="`book/${book._id}`"
        class="hover:text-gray-500 text-2xl"
      >
        {{ book.title }} -
      </router-link>
      <strong>{{ book.author.first_name }}</strong>
    </li>
  </ul>
</template>

<script>
import Book from "../api/Book";
export default {
  data() {
    return {
      bookList: [],
    };
  },
  async mounted() {
    this.bookList = await Book.getBookList();
    console.log(this.bookList);
  },
};
</script>

<style lang="scss" scoped></style>
