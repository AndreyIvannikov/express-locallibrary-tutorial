<template>
  <div class="flex justify-center items-center w-full" v-if="loading">
    <atom-spinner :animation-duration="1000" :size="60" :color="'#ff1d5e'" />
  </div>
  <p v-else-if="BookListInstance.length === 0">Не найдено</p>
  <ul v-else>
    <li v-for="book in BookListInstance" :key="book._id" class="p-2">
      <router-link
        :to="`bookinstance/${book._id}`"
        class="hover:text-gray-500 text-2xl"
        :class="{
          'text-red-600': book.status === 'Maintenance',
          'text-blue-500': book.status === 'Available',
          'text-yellow-500':
            book.status != 'Available' && book.status != 'Maintenance',
        }"
      >
        <span> {{ book.book.title }} - {{ book.status }}</span>
        <span v-if="book.status != 'Available'">
          Due:{{ dateConfig(book.due_back) }}
        </span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import BookInstance from "../api/BookInstance";
import { AtomSpinner } from "epic-spinners";

export default {
  components: {
    AtomSpinner,
  },
  data() {
    return {
      loading: true,
      BookListInstance: [],
    };
  },

  async mounted() {
    this.BookListInstance = await BookInstance.getBookInstanceList();
    this.loading = await false;
  },

  methods: {
    dateConfig(date) {
      return new Date(date).toLocaleDateString("ru");
    },
  },
};
</script>

<style lang="scss" scoped></style>
