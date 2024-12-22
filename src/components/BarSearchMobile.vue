<template>
  <div ref="searchContainer" class="search-container">
    <v-container>
      <!-- Input de búsqueda -->
      <div class="container-search-group">
        <svg
          class="container-search-icon"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <g>
            <path
              d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
            ></path>
          </g>
        </svg>

        <label for="search-input-mobile" class="sr-only">Search</label>

        <input
          v-model="searchQuery"
          @focus="showList = true"
          id="search-input-mobile"
          class="container-search-input"
          :placeholder="$t('viewHome.searchPlaceholder')"
          type="search"
          aria-label="Search"
          autocomplete="off"
        />
      </div>
      
      <!-- List of search results -->
      <v-list v-if="showList && searchQuery.length > 0" class="search-list">
        <v-list-item
          v-for="(article, index) in filteredArticles"
          :key="index"
          @click="goToDetail(article.id)"
          :prepend-avatar="article.urls[0]"
          :subtitle="article.description"
          :title="article.title"
          class="py-2"
        >
          <v-divider></v-divider>
        </v-list-item>
      
        <!-- Message when no results are found -->
        <v-list-item
          v-if="filteredArticles.length === 0"
          :title="$t('viewHome.noResults')"
          class="text-center message-no-results"
          disabled
        >
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BarSearchMobile",
  data() {
    return {
      searchQuery: "",
      showList: false,
    };
  },
  computed: {
    ...mapGetters(["getArticles"]),
    filteredArticles() {
      const query = this.searchQuery.toLowerCase();
      return this.getArticles.filter((article) =>
        article.title.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    goToDetail(articleId) {
      this.$router.push({ name: "productDetail", params: { id: articleId } });
      this.showList = false;
    },
    handleClickOutside(event) {
      if (
        this.$refs.searchContainer &&
        !this.$refs.searchContainer.contains(event.target)
      ) {
        this.showList = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.search-container {
  /* position: sticky; */
  width: 100%;
}

.search-list {
  margin-inline: 1rem;
  position: fixed;
  /* top: 100%; */
  left: 0;
  width: calc(100% - 2rem);
  max-height: auto;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 1100;
}

/* .search-list .message-no-results {
  width: 300px;
} */

.container-search-group {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  width: 100%;
}

.container-search-input {
  width: 100%;
  height: auto;
  line-height: 28px;
  padding: 0 1rem;
  padding-left: 2.5rem;
  border: 2px solid transparent;
  border-radius: 5px;
  outline: none;
  background-color: #f3f3f4;
  color: #0d0c22;
  transition: 0.3s ease;
}

.container-search-input::placeholder {
  color: #9e9ea7;
}

.container-search-input:focus,
input:hover {
  outline: none;
  border-color: #f3f3f4;
  background-color: #fff;
  box-shadow: 0 0 0 4px rgba(0, 0, 255, 0.1);
}

.container-search-icon {
  position: absolute;
  left: 1rem;
  fill: #9e9ea7;
  width: 1rem;
  height: 1rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
