<script setup>
import AdminHeader from "@/components/layout/AdminHeader.vue";
import AdminAside from "@/components/layout/AdminAside.vue";
</script>

<template>
  <div style="width: 100vw;height: 100vh">
    <AdminHeader></AdminHeader>
    <AdminAside></AdminAside>
    <div class="admin-main">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in-linear" mode="out-in">
          <component :is="Component" style="height: 100%"/>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.admin-main{
  width: calc(100vw - 250px);
  height: calc(100vh - 60px);
  background-color: #f5f7fa;
  position: absolute;
  left: 250px;
  top: 60px;
  padding: 5px 0 0 5px;
}
</style>