<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: 'AjaxLoader',
}
</script>

<style lang="scss" scoped>
.loader {
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-left: 2px solid lightcoral;
  border-top: 2px solid lightcoral;
  border-right: 2px solid lightcoral;
  animation: anim-rotate 3s ease-in-out infinite;
}
@keyframes anim-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
