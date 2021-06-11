<template>
  <h3 v-if="errors === 404">
    Жанр с таки <strong>ID</strong> {{ $route.params.id }} не найден
  </h3>
  <h3 v-else-if="genreInfo.length === 0">Список жанров пуст</h3>

  <div v-else class="">
    <h1 class="text-6xl">{{ genreInfo.genre.name }}</h1>
    <ul>
      <li
        v-for="genre in genreInfo.genreBooks"
        :key="genre._id"
        class="
          mb-10
          border-b-2 border-fuchsia-600
          pb-5
          flex flex-col
          items-center
        "
      >
        <h4 class="text-3xl mb-4">{{ genre.title }}</h4>
        <p class="w-2/5">{{ genre.summary }}</p>
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
      errors: null,
    };
  },
  async mounted() {
    try {
      this.genreInfo = await Genre.getGenreDetail(this.$route.params.id);
    } catch (error) {
      this.errors = error.response.status;
    }
  },
};
</script>

<style lang="scss" scoped></style>
