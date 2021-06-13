<template>
  <div class="flex justify-center items-center w-full" v-if="loading">
    <atom-spinner :animation-duration="1000" :size="60" :color="'#ff1d5e'" />
  </div>

  <p v-else-if="bookList.bookList.length === 0">{{ bookList.title }}</p>
  <ul v-else>
    <li v-for="book in bookList.bookList" :key="book._id" class="p-2">
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
import { AtomSpinner } from "epic-spinners";

export default {
  components: { AtomSpinner },
  data() {
    return {
      bookList: [],
      loading: true,
    };
  },
  async mounted() {
    this.bookList = await Book.getBookList();
    this.loading = await false;
    console.log(this.bookList);
  },
};
</script>

<style lang="scss" scoped></style>
