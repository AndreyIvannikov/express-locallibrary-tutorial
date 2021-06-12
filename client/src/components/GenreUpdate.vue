<template>
  <h1 v-if="loading">Загрузка...</h1>
  <div v-else class="flex justify-center flex-col items-center">
    <h1 class="mb-7 text-3xl">Обновление жанра</h1>

    <form class="w-full max-w-sm" @submit.prevent="updateGenre">
      <div class="flex items-center border-b border-teal-500 py-2">
        <input
          class="
            appearance-none
            bg-transparent
            border-none
            w-full
            text-gray-700
            mr-3
            py-1
            px-2
            leading-tight
            focus:outline-none
          "
          v-model="newGenreName"
          type="text"
          placeholder="Jane Doe"
          aria-label="Full name"
        />
        <button
          type="submit"
          class="
            flex-shrink-0
            bg-teal-500
            hover:bg-teal-700
            border-teal-500
            hover:border-teal-700
            text-sm text-black
            py-1
            px-2
            rounded
            btn btn-blue
          "
        >
          Обновить жанр
        </button>
      </div>
      <span v-if="error">{{ error }}</span>
    </form>
  </div>
</template>

<script>
import Genre from "../api/Genre";
export default {
  data() {
    return {
      newGenreName: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    async updateGenre() {
      this.error = await Genre.genreUpdate(
        { name: this.newGenreName },
        this.$route.params.id
      );
    },
  },
  async mounted() {
    this.loading = true;
    const response = await Genre.getGenreDetail(this.$route.params.id);
    this.newGenreName = response.genre.name;
    this.loading = await false;
  },
};
</script>

<style lang="scss" scoped></style>
