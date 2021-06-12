<template>
  <atom-spinner
    class="text-left flex flex-col items-center"
    :animation-duration="1000"
    :size="60"
    :color="'#ff1d5e'"
    v-if="loading"
  />

  <h3 v-else-if="errors === 404">
    Книга с таки <strong>ID</strong> {{ $route.params.id }} не найдена
  </h3>

  <h3 v-else-if="book.length === 0">Список книг пуст</h3>
  <div v-else class="text-left flex flex-col items-center">
    <div class="w-2/5 text-left flex flex-col justify-start m-5">
      <h1 class="text-3xl mb-4">Title: {{ title }}</h1>
      <p><strong> Author: </strong>{{ book.author.first_name }}</p>
      <p><strong> Summary: </strong>{{ book.summary }}</p>
      <p><strong> ISBN: </strong>{{ book.isbn }}</p>
      <p>
        <strong> Genre: </strong>
        <span v-for="(book, index) in book.genre" :key="book._id"
          >{{ book.name }}{{ index >= isBookLength - 1 ? "." : "," }}
        </span>
      </p>
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

    <div class="flex flex-col items-center w-60">
      <button class="btn btn-blue w-full mb-3" @click="showModal">
        Delete book
      </button>
      <ButtonUpdate
        buttonUpdateText="Update book"
        :linkUpdate="`/catalog/book/${$route.params.id}/update`"
      />
    </div>

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
import ButtonUpdate from "./ButtonUpdate.vue";
import Book from "../api/Book";
export default {
  components: { ModalDelete, AtomSpinner, ButtonUpdate },
  data() {
    return {
      book: [],
      booksCopy: [],
      title: null,
      isModalVisible: false,
      loading: false,
      error: null,
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
  computed: {
    isBookLength() {
      return this.book.genre.length;
    },
  },
  async mounted() {
    try {
      this.loading = true;
      const data = await Book.getBookDetail(this.$route.params.id);
      this.book = data.book;
      this.booksCopy = data.bookCopy;
      this.title = data.title;
    } catch (error) {
      this.errors = error.response.status;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped></style>
