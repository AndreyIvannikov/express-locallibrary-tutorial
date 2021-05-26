<template>
  <h2 v-if="book.length === 0">Книги пока что нет...</h2>
  <div v-else class="text-left flex justify-center">
    <div class="w-2/5 text-left flex flex-col justify-start">
      <h1 class="text-3xl mb-4">Title: {{ title }}</h1>
      <p><strong> Author: </strong>{{ book.author.first_name }}</p>
      <p><strong> Summary: </strong>{{ book.summary }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      book: [],
      booksCopy: [],
      title: null,
    };
  },
  async mounted() {
    try {
      const url = `${process.env.VUE_APP_SERVER_URL}/catalog/book/${this.$route.params.id}`;
      const { data } = await axios.get(url);
      this.book = data.book;
      this.booksCopy = data.bookCopy;
      this.title = data.title;
      console.log(this.book);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style lang="scss" scoped></style>
