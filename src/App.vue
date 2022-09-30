<!--模板-->
<template>
  <div id="App"><!--template里面只能有一个根元素-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<!--行为-->
<script>
export default {
  name: 'App',
  data:function(){
    return {

    }
  },
  components:{

  },
  methods:{

  },
  mounted:function(){
  }
}
</script>

<!--样式-->
<style>

</style>
