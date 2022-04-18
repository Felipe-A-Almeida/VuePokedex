<template>
  <h1
    :class="classes"
  >
    {{ text }}
  </h1>
</template>

<script>
export default {
  name: 'Title',

  props: {
    classes: {
      type: 'String',
      default: '',
    },

    text: {
      type: 'String',
      required: true,
    }
  }
}
</script>