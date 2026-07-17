<template>
  <div class="layout">
    <Sidebar />

    <div class="main">
      <Navbar />

      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<style scoped>
.layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: var(--background);
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}
</style>
