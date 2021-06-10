<template>
  <atom-spinner
    class="text-left flex flex-col items-center"
    :animation-duration="1000"
    :size="60"
    :color="'#ff1d5e'"
    v-if="loading"
  />
  <div v-else class="flex flex-col justify-center items-center">
    <h1 class="mb-7 text-3xl">Обновление книги</h1>
    <form class="w-full max-w-lg mb-6" @submit.prevent="update">
      <div class="flex flex-wrap -mx-3 mb-6 relative">
        <div class="w-full md:w-1/2 px-3 md:mb-0">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-gray-700 text-xs
              font-bold
              mb-2
            "
            for="grid-first-name"
          >
            Title
          </label>

          <form-input :placeholder="'Jane'" v-model="title" />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3 relative">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-gray-700 text-xs
              font-bold
              mb-2
            "
            for="grid-password"
          >
            ISBN:
          </label>

          <form-input :placeholder="'ISBN'" v-model="isbn" />
<<<<<<< HEAD
<<<<<<< HEAD
=======
          {{ isbn }}
>>>>>>> 1b31d1d2e2f5102e4e3bf3b583af7f21ae2d5ea8
          <p class="text-red-500 text-xs italic error-msg" v-if="errorIsbn">
            {{ errorIsbn }}
          </p>
=======
>>>>>>> origin/home
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="mt-4 px-3 w-full mb-6 relative">
          <span
            class="
              text-center
              block
              uppercase
              tracking-wide
              text-gray-700 text-xs
              font-bold
              mb-2
            "
            >GENRE:</span
          >
          <div class="mt-2">
            <label
              class="inline-flex items-center ml-6"
<<<<<<< HEAD
<<<<<<< HEAD
              v-for="g in checkbox.genres"
=======
              v-for="g in genreList"
>>>>>>> 1b31d1d2e2f5102e4e3bf3b583af7f21ae2d5ea8
=======
              v-for="g in book.genres"
>>>>>>> origin/home
              :key="g._id"
            >
              <input
                type="checkbox"
                class="form-radio"
                name="accountType"
                :value="g._id"
<<<<<<< HEAD
                v-model="checkedGenre"
<<<<<<< HEAD
                :checked="g.checked"
=======
>>>>>>> 1b31d1d2e2f5102e4e3bf3b583af7f21ae2d5ea8
=======
                v-model="genre"
>>>>>>> origin/home
              />
              <span class="ml-2">{{ g.name }}</span>
            </label>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 relative">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-gray-700 text-xs
              font-bold
              mb-2
            "
            for="grid-state"
          >
            Author:
          </label>
          <div class="relative">
            <select
              class="
                block
                appearance-none
                w-full
                bg-gray-200
                border border-gray-200
                text-gray-700
                py-3
                px-4
                pr-8
                rounded
                leading-tight
                focus:outline-none
                focus:bg-white
                focus:border-gray-500
              "
              v-model="author"
              id="grid-state"
            >
<<<<<<< HEAD
<<<<<<< HEAD
              <option v-for="a in checkbox.authors" :key="a._id" :value="a._id">
=======
              <option selected disabled value="">Selected author</option>
              <option v-for="a in authorList" :key="a._id" :value="a._id">
>>>>>>> 1b31d1d2e2f5102e4e3bf3b583af7f21ae2d5ea8
=======
              <!-- <option selected disabled value="">Selected author</option> -->
              <option v-for="a in book.authors" :key="a._id" :value="a._id">
>>>>>>> origin/home
                {{ a.first_name }}
              </option>
            </select>
            <div
              class="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                flex
                items-center
                px-2
                text-gray-700
              "
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 relative">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-gray-700 text-xs
              font-bold
              mb-2
            "
            for="grid-zip"
          >
            SUMMARY:
          </label>

          <form-input :placeholder="'902101'" v-model="summary" />
        </div>
      </div>
      <button class="btn btn-blue" type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
<<<<<<< HEAD
import axios from "axios";
import FormInput from "../components/FormInput";
=======
import FormInput from "../components/FormInput";
import updateBook from "../api/updateBook";
import { AtomSpinner } from "epic-spinners";

import axios from "axios";
>>>>>>> 1b31d1d2e2f5102e4e3bf3b583af7f21ae2d5ea8

export default {
  components: {
    FormInput,
    AtomSpinner,
  },
  data() {
<<<<<<< HEAD
<<<<<<< HEAD
    return {
      checkbox: null,
      author: "",
      title: "",
      summary: "",
      isbn: "",
    };
  },
  async mounted() {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/book/${this.$route.params.id}/update`;
    const { data } = await axios.get(url);

    await data.genres.forEach((genre) => {
      return data.book.genre.forEach((genreBook) => {
        if (genre._id === genreBook._id) {
          genre.checked = true;
        }
      });
    });

    this.checkbox = await data;
    this.author = data.book.author._id;
    this.title = data.book.title;
    this.summary = data.book.summary;
    this.isbn = data.book.isbn;
=======
    return {};
=======
    return {
      loading: true,
      book: null,

      summary: "",
      title: "",
      isbn: "",
      author: "",
      genre: [],
    };
>>>>>>> origin/home
  },
  async mounted() {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/book/${this.$route.params.id}/update`;

    const { data } = await axios.get(url);
<<<<<<< HEAD
    console.log(data);
>>>>>>> 1b31d1d2e2f5102e4e3bf3b583af7f21ae2d5ea8
=======
    data.book.genre.forEach((books) => {
      data.genres.forEach((genre) => {
        if (books._id === genre._id) {
          this.genre.push(genre._id);
        }
      });
    });

    this.book = data;
    this.loading = false;
  },
  methods: {
    async update() {
      const book = {
        summary: this.summary,
        title: this.title,
        isbn: this.isbn,
        author: this.author,
        genre: this.genre,
      };
      console.log(book);
      await updateBook(this.$route.params.id, {
        ...book,
        id: this.$route.params.id,
      });
    },
>>>>>>> origin/home
  },
};
</script>

<style lang="scss" scoped></style>
