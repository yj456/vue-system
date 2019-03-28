<template>
  <div class="echarts-contanier">
    <radar></radar>
  </div>
</template>

<script>
import Radar from './components/radar'
export default {
  data () {
    return {}
  },
  components: {
    Radar
  },
  methods: {},
  mounted () {}
}
</script>

<style scoped>
.echarts-contanier{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
}
</style>
