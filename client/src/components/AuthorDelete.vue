<template>
  <p v-if="loading">Загрузка...</p>
  <h2 v-else-if="authorName === undefind">
    Автор с таким <strong>{{ $route.params.id }}</strong> ID не найден
  </h2>
  <div v-else>
    <h1 class="text-4xl m-5">
      Удаление автора
      <strong
        >{{ authorName.author.first_name }}
        {{ authorName.author.family_name }}</strong
      >
    </h1>
    <div class="flex flex-col items-center" v-if="authorName.book.length > 0">
      <h3>Вы не можете удалить автора, сначала удалите книги</h3>
      <ul class="w-1/2">
        <li v-for="book in authorName.book" :key="book._id" class="p-2">
          <router-link
            :to="`/catalog/book/${book._id}`"
            class="hover:text-gray-500 text-2xl text-blue-700"
          >
            {{ book.title }}
          </router-link>
          <p class="text-justify">{{ book.summary }}</p>
        </li>
      </ul>
    </div>

    <form v-else @submit.prevent="deleteAuthor">
      <input type="hidden" name="authorId" :value="$route.params.id" />
      <button class="btn btn-blue">Удалить</button>
    </form>
  </div>
</template>

<script>
import getInfoAuthorDelete from "../api/getAuthorAndBooksDelete";
import Author from "../api/Author";
export default {
  data() {
    return {
      loading: true,
      authorName: [],
    };
  },
  async mounted() {
    try {
      this.authorName = await getInfoAuthorDelete(this.$route.params.id);
      console.log(this.authorName);
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async deleteAuthor() {
      await Author.deleteAuthor(this.$route.params.id);
      this.$router.push({ name: "AuthorList" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
