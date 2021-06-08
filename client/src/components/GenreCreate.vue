<template>
  <div class="flex justify-center flex-col items-center">
    <h1 class="mb-7 text-3xl">Создание нового жанра</h1>

    <form class="w-full max-w-sm" @submit.prevent="addGenre">
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
          v-model="genres"
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
          Создать жанр
        </button>
      </div>
      <span v-if="error">{{ error }}</span>
    </form>
  </div>
</template>

<script>
import createGenre from "../api/createGenre";
export default {
  data() {
    return {
      genres: null,
      error: null,
    };
  },
  methods: {
    async addGenre() {
      this.error = await createGenre({ name: this.genres });
    },
  },
};
</script>

<style lang="scss" scoped></style>
