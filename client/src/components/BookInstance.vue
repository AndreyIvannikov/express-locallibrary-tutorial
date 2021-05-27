<template>
  <p v-if="BookListInstance.length === 0">нет</p>
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
        <span> {{ book.book.title }} # {{ book.status }}</span>
        <span v-if="book.status != 'Available'">
          Due:{{ dateConfig(book.due_back) }}
        </span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import getBookListInstance from "../api/getBookListInstance";
export default {
  data() {
    return {
      BookListInstance: [],
    };
  },

  async mounted() {
    this.BookListInstance = await getBookListInstance();
  },

  methods: {
    dateConfig(date) {
      return new Date(date).toLocaleDateString("ru");
    },
  },
};
</script>

<style lang="scss" scoped></style>
