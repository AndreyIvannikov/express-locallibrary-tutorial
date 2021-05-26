<template>
  <h3 v-if="genreInfo.length === 0">Список жанров пуст</h3>
  <ul v-else>
    <li v-for="genre in genreInfo" :key="genre._id">
      <strong>
        <router-link :to="`/catalog/genre/${genre._id}`">
          {{ genre.name }}</router-link
        >
      </strong>
    </li>
  </ul>
</template>

<script>
import getGenreInfo from "../api/getGenreList";
export default {
  data() {
    return {
      genreInfo: [],
    };
  },
  async mounted() {
    this.genreInfo = await getGenreInfo();
  },
};
</script>

<style lang="scss" scoped></style>
