<template>
<div class="loadingHolder">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="157px" height="157px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <path d="M10 50A40 40 0 0 0 90 50A40 44.5 0 0 1 10 50" fill="#e0ca8f" stroke="none">
    <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 52.25;360 50 52.25"></animateTransform>
  </path>
  </svg>
</div>

</template>

<script>


export default {

}
</script>

<style lang="scss" scoped>

.loadingHolder{
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
}

</style>