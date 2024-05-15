<script setup>
import {onMounted, ref} from "vue";
import {getMenuTree} from "@/net/admin/menu/index.js";
import MenuTree from "@/components/layout/MenuTree.vue";
import {useRoute} from "vue-router";

const MenuList = ref([])

const showMenu = ref(false)

// 从路由获取默认激活菜单
const defaultActive = ref('/admin')
const route = useRoute()

const handleGetMenuTree = () => {
  getMenuTree((data) => {
    MenuList.value = data
    showMenu.value = true
  })
}

const handleOpen = (index) => {
  console.log(index)
}

const handleClose = (index) => {
  console.log(index)
}

onMounted(() => {
  defaultActive.value = route.path
  handleGetMenuTree()
  console.log(MenuList.value)
})
</script>

<template>
  <div class="aside">
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        text-color="#fff"
        router
        @open="handleOpen"
        @close="handleClose"
    >
      <MenuTree v-if="showMenu" :menu-list="MenuList"/>
    </el-menu>
  </div>
</template>

<style scoped>
.aside{
  width: 250px;
  height: calc(100vh - 60px);
  background-color: #545c64;
}
</style>