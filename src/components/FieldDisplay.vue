<template>
  <!-- Display the field value -->
  <span
    class="field-displays"
    :class="getClass(value)"
    style="display: flex; padding-bottom: 1rem"
  >
    <span v-if="value">{{ prefix }}{{ value }}</span>
    <span v-else> {{ label }}</span>
  </span>
</template>

<script>
export default {
  name: "FieldDisplay",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    prefix: {
      type: String,
      default: "",
    },
    typeofField: {
      type: String,
      default: "",
    },
  },
  computed: {
    // Check if the field has a value
    hasValue() {
      return this.value !== "";
    },
  },

  methods: {
    // Get the class of the field
    getClass(value) {
      if (this.typeofField === "title") {
        return value
          ? "font-weight-bold text-h5 pa-0"
          : "text-disabled text-h5 pa-0";
      }

      if (this.typeofField === "price") {
        return value
          ? "font-weight-bold text-body-1 pa-0 pb-2"
          : "text-color-medium text-body-1 pa-0 pb-2";
      }

      return value
        ? "font-medium-bold2 text-body-2"
        : "text-color-medium text-body-2";
    },
  },
};
</script>

<style scoped>
.text-disabled {
  color: #bdbdbd;
}
.field-displays {
  word-break: break-word;
}

.text-color-medium {
  color: #888888;
}
</style>
