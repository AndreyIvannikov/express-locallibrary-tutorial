<template>
  <h3 v-if="genreInfo.length === 0">Список жанров пуст</h3>
  <div class="" v-else>
    <h1 class="mb-7 text-3xl">Список жанров</h1>
    <ul>
      <li v-for="genre in genreInfo" :key="genre._id">
        <strong>
          <router-link :to="`/catalog/genre/${genre._id}`">
            {{ genre.name }}</router-link
          >
        </strong>
      </li>
    </ul>
  </div>
</template>

<script>
import Genre from "../api/Genre";
export default {
  data() {
    return {
      genreInfo: [],
    };
  },
  async mounted() {
    this.genreInfo = await Genre.getGenreDetail();
  },
};
</script>

<style lang="scss" scoped></style>
