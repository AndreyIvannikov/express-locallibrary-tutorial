<template>
  <atom-spinner
    class="text-left flex flex-col items-center"
    :animation-duration="1000"
    :size="60"
    :color="'#ff1d5e'"
    v-if="loading"
  />
  <div v-else class="flex flex-col justify-center items-center">
    <h1 class="mb-7 text-3xl">Обновление Автора</h1>
    <form class="w-full max-w-lg" @submit.prevent="update">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
            First Name
          </label>
          <input
            v-model="firstName"
            class="
              appearance-none
              block
              w-full
              bg-gray-200
              text-gray-700
              border border-red-500
              rounded
              py-3
              px-4
              mb-3
              leading-tight
              focus:outline-none
              focus:bg-white
            "
            id="grid-first-name"
            type="text"
            placeholder="Jane"
          />
          <p class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-gray-700 text-xs
              font-bold
              mb-2
            "
            for="grid-last-name"
          >
            Last Name
          </label>
          <input
            v-model="lastName"
            class="
              appearance-none
              block
              w-full
              bg-gray-200
              text-gray-700
              border border-gray-200
              rounded
              py-3
              px-4
              leading-tight
              focus:outline-none
              focus:bg-white
              focus:border-gray-500
            "
            id="grid-last-name"
            type="text"
            placeholder="Doe"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6"></div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
            Date of birth:
          </label>
          <input
            v-model="dateOfBirth"
            class="
              appearance-none
              block
              w-full
              bg-gray-200
              text-gray-700
              border border-gray-200
              rounded
              py-3
              px-4
              leading-tight
              focus:outline-none
              focus:bg-white
              focus:border-gray-500
            "
            id="grid-zip"
            type="date"
            placeholder="90210"
          />
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
            Date of death:
          </label>
          <input
            v-model="dateOfDeath"
            class="
              appearance-none
              block
              w-full
              bg-gray-200
              text-gray-700
              border border-gray-200
              rounded
              py-3
              px-4
              leading-tight
              focus:outline-none
              focus:bg-white
              focus:border-gray-500
            "
            id="grid-zip"
            type="date"
            placeholder="90210"
          />
        </div>
      </div>
      <button class="btn btn-blue" type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { AtomSpinner } from "epic-spinners";
import Author from "../api/Author";
import axios from "axios";

export default {
  components: {
    AtomSpinner,
  },
  data() {
    return {
      loading: true,
      book: null,
      author: null,
      lastName: "",
      firstName: "",
      dateOfBirth: "",
      dateOfDeath: "",
    };
  },
  async mounted() {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/author/${this.$route.params.id}`;
    const { data } = await axios.get(url);
    this.author = data.author;
    this.loading = false;
    this.firstName = this.author.first_name;
    this.lastName = this.author.family_name;
    this.dateOfBirth = this.author.date_of_birth;
    this.dateOfDeath = this.author.date_of_death;
    console.log(this.dateOfBirth);
  },
  methods: {
    async update() {
      const author = {
        lastName: this.lastName,
        firstName: this.firstName,
        dateOfBirth: this.dateOfBirth,
        dateOfDeath: this.dateOfDeath,
      };
      Author.updatedAuthor(this.$route.params.id, author);
    },
  },
};
</script>

<style lang="scss" scoped></style>
