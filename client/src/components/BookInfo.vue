<template>
  <h2 v-if="book.length === 0">Книги пока что нет...</h2>
  <div v-else class="text-left flex flex-col items-center">
    <div class="w-2/5 text-left flex flex-col justify-start m-5">
      <h1 class="text-3xl mb-4">Title: {{ title }}</h1>
      <p><strong> Author: </strong>{{ book.author.first_name }}</p>
      <p><strong> Summary: </strong>{{ book.summary }}</p>
      <p><strong> ISBN: </strong>{{ book.isbn }}</p>
      <hr />
    </div>
    <div class="w-2/5" v-if="booksCopy.length !== 0">
      <h3 class="text-2xl mb-3">Copies:</h3>
      <div class="mb-5" v-for="copy in booksCopy" :key="copy._id">
        <p><strong> Status: </strong>{{ copy.status }}</p>
        <p><strong> imprint: </strong>{{ copy.imprint }}</p>
        <p><strong> ID: </strong>{{ copy._id }}</p>
      </div>
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
      console.log(this.booksCopy);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style lang="scss" scoped></style>
