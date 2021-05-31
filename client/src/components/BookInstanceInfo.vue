<template>
  <h1 v-if="!bookListInstanceInfo">Empty</h1>
  <div class="m-5 flex justify-center" v-else>
    <div class="w-2/5 text-left">
      <h1 class="text-2xl">ID: {{ bookListInstanceInfo.bookinstance._id }}</h1>
      <p>
        <strong>Title:</strong
        ><router-link
          class="text-blue-600 text-lg underline"
          :to="`/catalog/book/${bookListInstanceInfo.bookinstance.book._id}`"
          >{{ bookListInstanceInfo.bookinstance.book.title }}</router-link
        >
      </p>
      <p>
        <strong>Imprint:</strong>{{ bookListInstanceInfo.bookinstance.imprint }}
      </p>
      <p>
        <strong>Status:</strong>{{ bookListInstanceInfo.bookinstance.status }}
      </p>
      <p>
        <strong>Due back: </strong
        >{{ dateConfig(bookListInstanceInfo.bookinstance.due_back) }}
      </p>
    </div>
  </div>
</template>

<script>
import getBookListInstanceInfo from "../api/getBookListInstanceInfo";
export default {
  data() {
    return {
      bookListInstanceInfo: null,
    };
  },

  async mounted() {
    this.bookListInstanceInfo = await getBookListInstanceInfo(
      this.$route.params.id
    );
  },

  methods: {
    dateConfig(date) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(date).toLocaleDateString("ru-RU", options);
    },
  },
};
</script>

<style lang="scss" scoped></style>
