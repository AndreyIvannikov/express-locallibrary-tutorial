<template>
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
      mb-3
      leading-tight
      focus:outline-none
      focus:bg-white
      focus:border-gray-500
    "
    v-bind:value="modelValue"
    v-on:input="$emit('update:modelValue', $event.target.value)"
    id="grid-password"
    type="text"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  props: ["modelValue", "placeholder"],
  emits: ["update:modelValue"],
  //   props: {
  //     placeholder: {
  //       type: String,
  //     },
  //     value: {
  //       type: String,
  //     },
  //   },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
