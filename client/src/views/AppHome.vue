<template>
  <section class="home">
    <h2 v-if="!countElements">Книг пока нет...</h2>
    <div v-else>
      <h1>Local Library Home</h1>
      <ul>
        <li><strong>Books</strong> {{ countElements.book_count }}</li>
        <li>
          <strong>Copies :</strong> {{ countElements.book_instance_count }}
        </li>
        <li>
          <strong>Copies available</strong>
          {{ countElements.book_instance_available_count }}
        </li>
        <li><strong>Genres</strong> {{ countElements.genre_count }}</li>
        <li><strong>Authors:</strong> {{ countElements.author_count }}</li>
      </ul>
    </div>
  </section>
</template>

<script>
import getBooks from "../api/getCountElements";
export default {
  data() {
    return {
      name: null,
      countElements: null,
    };
  },
  async mounted() {
    this.countElements = await getBooks();
    console.log(this.countElements);
  },
};
</script>

<style lang="scss" scoped></style>
