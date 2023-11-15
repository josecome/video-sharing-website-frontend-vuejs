<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <label id="lbl">
    {{ text }}
  </label>
</template>

<style scoped>
#lbl {
  width: 100%;
  border: 1px solid gray;
  border-radius: 6px;
  text-align: right;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 10px 12px;
  display: inline-block;
}
</style>
