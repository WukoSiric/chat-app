<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
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
  <div>
    <input
      id="input"
      type="text"
      autocomplete="off"
      :value="internalValue"
      @input="updateValue"
      :placeholder="placeholder"
    />
  </div>
</template>

<style>
#input {
  margin: 20px;
  padding: 10px;
  width: 90%;
  border: 0px;
  border-radius: 10px;
  font-size: 15px;
  background-color: white;
}

#input::placeholder {
  color: #464646;
}

#input:focus {
  outline: 1px solid rgb(88, 88, 88);
}
</style>
