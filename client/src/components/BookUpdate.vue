<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="mb-7 text-3xl">Обновление книги</h1>
    <form class="w-full max-w-lg mb-6" @submit.prevent="addBook">
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

          <p class="text-red-500 text-xs italic error-msg" v-if="errorTitle">
            {{ errorTitle }}
          </p>
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
          {{ isbn }}
          <p class="text-red-500 text-xs italic error-msg" v-if="errorIsbn">
            {{ errorIsbn }}
          </p>
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
              v-for="g in genreList"
              :key="g._id"
            >
              <input
                type="checkbox"
                class="form-radio"
                name="accountType"
                :value="g._id"
                v-model="checkedGenre"
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
              :class="{ 'border-red-500': errorAuthor }"
              v-model="author"
              id="grid-state"
            >
              <option selected disabled value="">Selected author</option>
              <option v-for="a in authorList" :key="a._id" :value="a._id">
                {{ a.first_name }}
              </option>
            </select>
            <p class="text-red-500 text-xs italic error-msg" v-if="errorAuthor">
              {{ errorAuthor }}
            </p>
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
          <p class="text-red-500 text-xs italic error-msg" v-if="errorSummary">
            {{ errorSummary }}
          </p>
        </div>
      </div>
      <button class="btn btn-blue" type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
import FormInput from "../components/FormInput";
import axios from "axios";

export default {
  components: {
    FormInput,
  },
  data() {
    return {};
  },
  async mounted() {
    const url = `${process.env.VUE_APP_SERVER_URL}/catalog/book/${this.$route.params.id}/update`;

    const { data } = await axios.get(url);
    console.log(data);
  },
};
</script>

<style lang="scss" scoped></style>
