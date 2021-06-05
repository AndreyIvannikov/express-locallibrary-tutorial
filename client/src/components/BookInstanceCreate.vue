<template>
  <div class="flex justify-center">
    <form class="w-full max-w-lg mb-6" @submit.prevent="addBookInstance">
      <div class="flex flex-wrap -mx-3 mb-6 relative px-3">
        <div class="relative w-full">
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
            v-model="book"
            id="grid-state"
          >
            <option disabled value="">Selected book</option>
            <option v-for="a in bookList" :key="a._id" :value="a._id">
              {{ a.title }}
            </option>
          </select>
          <p class="text-red-500 text-xs italic error-msg">Ошибка</p>
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
            Imprint:
          </label>
          <!-- <input
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
              mb-3
              leading-tight
              focus:outline-none
              focus:bg-white
              focus:border-gray-500
            "
            id="grid-password"
            type="text"
            placeholder="imprint"
            v-model="imprint"
          /> -->
          <form-input :placeholder="'imprint'" v-model="imprint" />
          <p class="text-red-500 text-xs italic error-msg">Ошибка</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-3">
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
            Status:
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
              v-model="status"
              id="grid-state"
            >
              <option disabled value="">Selected status</option>
              <option value="Maintenance">Maintenance option</option>
              <option value="Available">Available option</option>
              <option value="Loaned">Loaned option</option>
              <option value="Reserved">Reserved</option>
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
            Date:
          </label>
          <input
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
            v-model="date"
            id="grid-zip"
            type="date"
            placeholder="90210"
          />
          <p class="text-red-500 text-xs italic error-msg">Ошибка</p>
        </div>
      </div>
      <button class="btn btn-blue" type="submit">Отправить</button>
    </form>
  </div>
  <!-- <p v-if="BookListInstance.length === 0">нет</p> -->
</template>

<script>
import getBookList from "../api/getBookList";
import createBookInstance from "../api/createBookInstance";
import FormInput from "../components/FormInput";
export default {
  components: { FormInput },
  data() {
    return {
      bookList: [],
      imprint: null,
      book: "",
      status: "",
      date: null,
    };
  },

  async mounted() {
    this.bookList = await getBookList();
  },

  methods: {
    async addBookInstance() {
      await createBookInstance({
        book: this.book,
        imprint: this.imprint,
        status: this.status,
        date: this.date,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
