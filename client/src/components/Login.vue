<template>
  <div class="w-full flex justify-center flex-col items-center">
    <h1>Авторизация</h1>
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xs"
      @submit.prevent="login"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none
            focus:shadow-outline
          "
          v-model="email"
          id="username"
          type="email"
          placeholder="email"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="
            shadow
            appearance-none
            border border-red-500
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            mb-3
            leading-tight
            focus:outline-none
            focus:shadow-outline
          "
          autocomplete="off"
          id="password"
          type="password"
          v-model="password"
          placeholder="******************"
        />
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
            focus:outline-none
            focus:shadow-outline
          "
          type="submit"
        >
          Sign In
        </button>
        <a
          class="
            inline-block
            align-baseline
            font-bold
            text-sm text-blue-500
            hover:text-blue-800
          "
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2020 Acme Corp. All rights reserved.
    </p>
  </div>
</template>

<script>
import User from "../api/User";
export default {
  data() {
    return {
      password: "",
      email: "",
    };
  },
  methods: {
    async login() {
      const response = await User.login({
        password: this.password,
        email: this.email,
      });
      console.log(response);
    },
  },
};
</script>

<style lang="scss" scoped></style>
