<script setup>
import {onMounted} from "vue";

const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})

onMounted(() => {
  console.log(props.menuList)
})
</script>

<template>
  <div>
    <template v-for="item in menuList" :key="item.id">
      <!--有子菜单的-->
      <el-sub-menu :index="item.path" v-if="item.menuType === 'M'">
        <template #title>
          <span>{{ item.menuName }}</span>
        </template>
        <MenuTree :menu-list="item.children"/>
      </el-sub-menu>
      <!--没有子菜单的-->
      <el-menu-item :index="item.path" v-else>
        <span>{{ item.menuName }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<style scoped>

</style>