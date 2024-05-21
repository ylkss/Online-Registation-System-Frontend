<script setup>
const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
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
      <el-menu-item v-if="item.menuType === 'C'" :index="item.path">
        <span>{{ item.menuName }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<style scoped>

</style>