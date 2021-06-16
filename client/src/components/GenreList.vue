<template>
  <div class="flex justify-center items-center w-full" v-if="loading">
    <atom-spinner :animation-duration="1000" :size="60" :color="'#ff1d5e'" />
  </div>

  <h3 v-else-if="genreInfo.genreList.length === 0">{{ genreInfo.title }}</h3>
  <div class="" v-else>
    <h1 class="mb-7 text-3xl">Список жанров</h1>
    <ul>
      <li v-for="genre in genreInfo.genreList" :key="genre._id">
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
import { AtomSpinner } from "epic-spinners";

export default {
  components: { AtomSpinner },
  data() {
    return {
      genreInfo: [],
      loading: true,
    };
  },
  async mounted() {
    document.title = "Список жанров";
    this.genreInfo = await Genre.getGenresList();
    this.loading = await false;
  },
};
</script>

<style lang="scss" scoped></style>
