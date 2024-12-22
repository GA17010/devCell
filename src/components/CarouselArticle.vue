<template>
  <!-- Carousel component -->
  <v-carousel
    :value="currentImageIndex"
    @input="updateCurrentImageIndex"
    show-arrows="hover"
  >

    <!-- Carousel items -->
    <v-carousel-item
      v-for="(item, i) in article.urls"
      :key="i"
      class="carousel-item"
      v-bind="{ src: item, alt: 'carousel image' }"
    >
    
      <!-- Background blur effect -->
      <div
        class="background-blur"
        :style="{ backgroundImage: `url(${item})` }"
      ></div>

      <!-- Main image -->
      <div class="main-container-image">
        <img :src="item" class="main-image" alt="carousel image" />
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
    currentImageIndex: {
      type: Number,
      required: false,
    },
  },
  watch: {
    // Watch for changes in the current image index
    currentImageIndex(newIndex) {
      console.log("currentImageIndex changed:", newIndex);
      this.updateCurrentImageIndex(newIndex);
    },
  },
  methods: {
    // Update the current image index
    updateCurrentImageIndex(newIndex) {
      console.log("newIndex", newIndex);
      this.$emit("update:currentImageIndex", newIndex);
    },
  },
};
</script>

<style scoped>
.v-carousel {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
}

.carousel-item {
  background-color: rgb(19, 129, 34);
  position: relative;
  width: 100%;
  height: 100%;
  /* min-height: 300px; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.background-blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  z-index: 1;
}

.main-container-image {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-image {
  position: relative;
  margin: auto;
  height: auto;

  max-width: 100%;
  max-height: 100%;
  object-fit: contain;

  display: block;
}

.v-image {
  width: 100%;
  height: 100%;
}
</style>
