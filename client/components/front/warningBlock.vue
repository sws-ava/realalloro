<template>
<div>
  <div class="shell">
    <div class="range">
      <div v-if="$t('static.showWarning') == 1" class="cell-12 ">
        <div class="mt-4 mb-4" style="margin: 50px auto 50px; width: 100%; ">
         {{$t('static.warning')}}
        </div>
      </div>
    </div>
  </div>
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