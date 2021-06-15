<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="mb-7 text-3xl">Создание письма</h1>
    <form class="w-full max-w-lg mb-6" @submit.prevent="send">
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
            Title:
          </label>

          <form-input :placeholder="'Jane'" v-model="title" />
        </div>

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
            Name:
          </label>

          <form-input :placeholder="'Andrey'" v-model="name" />
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
            Message:
          </label>
          <form-input :placeholder="'message'" v-model="message" />
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
            Gendre:
          </label>
          <form-input :placeholder="'message'" v-model="gender" />
        </div>
      </div>
      <button class="btn btn-blue" type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
import FormInput from "./FormInput.vue";
import mail from "../api/Mail";
export default {
  components: {
    FormInput,
  },
  data() {
    return {
      title: "",
      message: "",
      name: "",
      gender: "",
    };
  },
  methods: {
    async send() {
      const data = await mail.sendMail({
        title: this.title,
        message: this.message,
        name: this.name,
        gender: this.gender,
      });
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
