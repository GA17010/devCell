<template>
  <!-- Main layout -->
  <div class="container">
    <!-- Navbar -->
    <NavbarHeader />

    <!-- Router view -->
    <div class="container-router">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavbarHeader from "@/components/NavbarHeader.vue";
export default {
  name: "MainLayout",
  components: {
    NavbarHeader,
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.container-router {
  /* display: flex; */
  width: 100%;
  height: 100%;
}
</style>
