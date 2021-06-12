<template>
  <div class="flex justify-center items-center w-full" v-if="loading">
    <atom-spinner :animation-duration="1000" :size="60" :color="'#ff1d5e'" />
  </div>

  <div class="flex justify-center flex-col items-center" v-else>
    <h1 class="mb-7 text-3xl">Удаление жанра</h1>
    <div class="" v-if="genreBooks.length != 0">
      <h2 class="mb-6">
        Для того что бы удалить жанр вначале нужно удалить книги:
      </h2>
      <ul>
        <li v-for="books in genreBooks" :key="books._id">
          <router-link
            class="text-3xl underline mb-3 text-blue-700"
            :to="`/catalog/book/${books._id}`"
          >
            {{ books.title }}</router-link
          >
        </li>
      </ul>
    </div>
    <div class="flex flex-col items-center w-60" v-else>
      <button class="btn btn-blue w-full mb-3" @click="showModal">
        Delete genre
      </button>
    </div>

    <modal-delete v-show="isModalVisible" @close="closeModal">
      <template #header> Удаление жанра {{ genre.name }}</template>
      <template #body> Вы действительно хотите удалить этот жанр ?</template>
      <template #footer>
        <button @click.stop="deleteBook" class="btn btn-red">Да</button>
        <button @click.stop="closeModal" class="btn btn-blue">Отмена</button>
      </template>
    </modal-delete>
  </div>
</template>

<script>
import ModalDelete from "./ModalDelete";
import Genre from "../api/Genre";
import { AtomSpinner } from "epic-spinners";

export default {
  components: { ModalDelete, AtomSpinner },
  data() {
    return {
      genres: null,
      error: null,
      loading: false,
      isModalVisible: false,
      genreBooks: [],
      genre: [],
    };
  },
  async mounted() {
    this.loading = true;
    const data = await Genre.getGenreDetail(this.$route.params.id);
    this.genreBooks = await data.genreBooks;
    this.genre = await data.genre;
    console.log(this.genre);
    this.loading = await false;
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async deleteBook() {
      await this.closeModal();
      await Genre.deleteGenre(this.$route.params.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
