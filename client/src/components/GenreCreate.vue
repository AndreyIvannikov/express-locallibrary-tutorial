<template>
  <div class="flex justify-center">
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
            text-sm
            border-4
            text-black
            py-1
            px-2
            rounded
          "
        >
          Создать жанр
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import createGenre from "../api/createGenre";
export default {
  data() {
    return {
      genres: null,
    };
  },
  methods: {
    async addGenre() {
      console.log(2);
      await createGenre({ name: this.genres });
    },
  },
};
</script>

<style lang="scss" scoped></style>
