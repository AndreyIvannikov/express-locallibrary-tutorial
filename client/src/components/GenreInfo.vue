<template>
  <h3 v-if="errors === 404">
    Жанр с таки <strong>ID</strong> {{ $route.params.id }} не найден
  </h3>
  <h3 v-else-if="genreInfo.length === 0">Список жанров пуст</h3>

  <div v-else class="flex flex-col items-center">
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
    <div class="flex flex-col items-center w-60">
      <ButtonDelete
        :linkDelete="`/catalog/genre/${$route.params.id}/delete`"
        buttonDeleteText="Delete genre"
      />
      <ButtonUpdate
        :linkUpdate="`/catalog/genre/${$route.params.id}/update`"
        buttonUpdateText="Update genre"
      />
    </div>
  </div>
</template>

<script>
import Genre from "../api/Genre";
import ButtonDelete from "../components/ButtonDelete.vue";
import ButtonUpdate from "../components/ButtonUpdate.vue";
export default {
  components: { ButtonDelete, ButtonUpdate },
  data() {
    return {
      genreInfo: [],
      errors: null,
    };
  },
  async mounted() {
    try {
      this.genreInfo = await Genre.getGenreDetail(this.$route.params.id);
      document.title = await `Жанр ${this.genreInfo.genre.name}`;
    } catch (error) {
      this.errors = error.response.status;
    }
  },
};
</script>

<style lang="scss" scoped></style>
