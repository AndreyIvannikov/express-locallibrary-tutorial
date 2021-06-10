<template>
  <atom-spinner
    class="text-left flex flex-col items-center"
    :animation-duration="1000"
    :size="60"
    :color="'#ff1d5e'"
    v-if="loading"
  />

  <h2 v-if="book.length === 0">Книги пока что нет...</h2>
  <div v-else class="text-left flex flex-col items-center">
    <div class="w-2/5 text-left flex flex-col justify-start m-5">
      <h1 class="text-3xl mb-4">Title: {{ title }}</h1>
      <p><strong> Author: </strong>{{ book.author.first_name }}</p>
      <p><strong> Summary: </strong>{{ book.summary }}</p>
      <p><strong> ISBN: </strong>{{ book.isbn }}</p>
      <hr />
    </div>
    <div class="w-2/5" v-if="booksCopy.length !== 0">
      <h3 class="text-2xl mb-3">Copies:</h3>
      <div class="mb-5" v-for="copy in booksCopy" :key="copy._id">
        <p><strong> Status: </strong>{{ copy.status }}</p>
        <p><strong> imprint: </strong>{{ copy.imprint }}</p>
        <p><strong> ID: </strong>{{ copy._id }}</p>
      </div>
    </div>

    <button class="btn btn-blue" @click="showModal">Delete book</button>
    <router-link :to="`/catalog/book/${$route.params.id}/update`"
      >Обнвоить book</router-link
    >
    <modal-delete v-show="isModalVisible" @close="closeModal">
      <template #header> Удаление книги {{ title }} ?</template>
      <template #body> Вы действительно хотите удалить кингу ?</template>
      <template #footer>
        <button @click.stop="deleteBook" class="btn btn-red">Да</button>
        <button @click.stop="closeModal" class="btn btn-blue">Отмена</button>
      </template>
    </modal-delete>
  </div>
</template>

<script>
import { AtomSpinner } from "epic-spinners";
import ModalDelete from "./ModalDelete";
import Book from "../api/Book";
export default {
  components: { ModalDelete, AtomSpinner },
  data() {
    return {
      book: [],
      booksCopy: [],
      title: null,
      isModalVisible: false,
      loading: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async deleteBook() {
      this.loading = true;
      Book.getBookDelete(this.$route.params.id);
      this.loading = false;
    },
  },
  async mounted() {
    try {
      this.loading = true;
      const bookInfo = await Book.getBookDetail(this.$route.params.id);
      this.book = bookInfo.book;
      this.booksCopy = bookInfo.bookCopy;
      this.title = bookInfo.title;
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped></style>
