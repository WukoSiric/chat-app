<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Enter text here",
      required: false,
    },
  },
  data() {
    return {
      internalValue: this.modelValue,
    };
  },
  watch: {
    modelValue(newValue) {
      this.internalValue = newValue;
    },
  },
  methods: {
    updateValue(event) {
      this.internalValue = event.target.value;
      this.$emit("update:modelValue", this.internalValue);
    },
  },
};
</script>

<template>
  <input
    id="search-box"
    type="text"
    autocomplete="off"
    :value="internalValue"
    @input="updateValue"
    :placeholder="placeholder"
  />
</template>

<style>
::placeholder {
  color: rgb(197, 197, 197);
  font-weight: 500;
}

#search-box {
  margin: 20px;
  padding: 10px;
  width: 70%;
  border: 3px solid white;
  color: white;
  border-radius: 10px;
  font-size: 15px;
  background-color: transparent;
  font-size: 12pt;
}

#search-box:focus {
  outline: 1px solid rgb(88, 88, 88);
}

#search-box::placeholder {
  color: rgb(192, 192, 192);
}

#search-box-container {
  margin: 0;
  padding: 0;
  width: 0;
}

#search-icon {
  fill: white;
  max-height: 40px;
}
</style>
