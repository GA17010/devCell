<template>
  <v-row>
    <v-col class="column-filter" lg="2" md="3" sm="3" xs="1">
      <div class="filter-container">
        <FilterArticle :filters="filters" @filter-changed="updateFilters" @reset-filters="resetFilters" />
      </div>
    </v-col>
    <v-col lg="" md="" sm="" xs="12">
      <div class="container-home">
        <!-- display loader -->
        <div
          v-if="filteredArticles === null || filteredArticles.length === 0"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: calc(100vh - var(--navbar-height));
          "
        >
          <DisplayLoader />
        </div>

        <!-- display articles -->
        <div v-else class="container-articles">
          <div
            v-for="article in filteredArticles"
            :key="article.id"
            class="card"
          >
            <div class="card-section-photo">
              <img
                v-if="article.urls"
                :src="article.urls[0]"
                alt="Image"
                @click="goToDetail(article.id)"
              />
            </div>
            <div class="container-text">
              <span class="card-title">{{ article.title }}</span>
              <span class="card-price">$ {{ article.price }}</span>
            </div>
            <button @click="goToDetail(article.id)">
              <span>{{ $t("viewHome.seeMore") }}</span>
              <div class="arrow-wrapper">
                <div class="arrow"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import FilterArticle from "@/components/FilterArticle.vue";
import { ref, computed } from "vue";
import { mapActions, mapGetters } from "vuex";
import DisplayLoader from "@/components/DisplayLoader.vue";

export default {
  components: {
    FilterArticle,
    DisplayLoader,
  },
  data() {
    return {
      articles: ref([]),
      filters: ref([]),
      selectedFilters: ref([]),
      selectedButton: null,
    };
  },
  computed: {
    ...mapGetters(["getArticles", "getFilters"]),
    // Filter the articles based on the selected filters
    filteredArticles() {
      // If no filters are selected, return all the articles
      if (Object.keys(this.selectedFilters).length === 0) {
        return this.articles;
      }
      
      return this.articles.filter((article) => { 
        return Object.keys(this.selectedFilters).every((filterName) => { // Check if all the selected filters are present in the article
          return this.selectedFilters[filterName].some(
            (option) => article[filterName] === option // Check if the article has the selected filter
          );
        });
      });
    },
  },
  watch: {
    getArticles: {
      immediate: true,
      handler() {
        this.articles = this.getArticles;
      },
    },
    getFilters: {
      immediate: true,
      handler() {
        this.filters = this.getFilters;
      },
    },
  },
  methods: {
    ...mapActions(["allArticles", "fetchFilters"]),
    // Update the filters when a checkbox is checked or unchecked
    updateFilters({ filterName, option, checked }) {
      if (!this.selectedFilters[filterName]) {
        this.selectedFilters[filterName] = [];
      }
      if (checked) {
        this.selectedFilters[filterName].push(option);
      } else {
        const index = this.selectedFilters[filterName].indexOf(option);
        if (index > -1) {
          this.selectedFilters[filterName].splice(index, 1);
        }
        if (this.selectedFilters[filterName].length === 0) {
          delete this.selectedFilters[filterName];
        }
      }
      this.$store.dispatch("filterArticles", this.selectedFilters);
    },
    // Reset the filters
    resetFilters() {
      this.selectedFilters = {};
      this.$store.dispatch("filterArticles", this.selectedFilters);
    },
    // Go to the detail page of the article
    goToDetail(articleId) {
      this.$router.push({ name: "productDetail", params: { id: articleId } });
    },
  },
  async created() {
    await this.fetchFilters();
    await this.allArticles();
  },
};
</script>

<style scoped>
.v-row {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

/* _______________container for the filters_________________ */

@media screen and (max-width: 768px) {
  .column-filter {
    display: none;
  }
}
.filter-container {
  display: flex;
  place-content: center;
  place-items: center;
  flex-direction: column;
  gap: 10px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 0.5rem;
  width: auto;
  height: auto;
  /* border: rgb(0, 0, 255) 1px solid; */
}
.container-home {
  flex-grow: 1;
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 10px;
  padding-top: 1rem;
  padding-inline: 1rem;
  width: auto;
  height: 100%;
  /* border: rgb(0, 0, 255) 1px solid; */
}

/* ________________________Container for the article cards__________________________ */

.container-articles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
  place-content: center;
  place-items: center;
  gap: 1rem;
  width: auto;
}

.card {
  width: 10rem;
  border-radius: 10px;
  background: #fff;
  padding: 5px;
  overflow: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.card:hover {
  transform: scale(1.04);
  /* transform: translateY(-8px); */
}

.card-section-photo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  overflow: hidden;
  border-radius: 10px;
  padding-block: 2px;
  cursor: pointer;
}

.card-section-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.container-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 2px;
  cursor: default;
}

.card-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text);
  margin-top: 5px;
  text-align: center;
  white-space: nowrap;
  text-transform: capitalize;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-inline: 3px;
}

.card-price {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-primary);
  /* color: red; */
  margin: 5px 0;
  padding-left: 0.5rem;
}

.card button {
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  width: 100%;
  padding: 8px;
  border: none;
  box-sizing: border-box;
  border-radius: 10px;
  background: var(--color-hover);
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  font-weight: bold;
}

.card button:hover {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-primary);
}
.card button a {
  text-decoration: none;
  color: var(--color-text);
  padding-left: 1rem;
  font-size: 1rem;
  font-family: var(--font-family);
  margin-bottom: 4px;
}

/*_______________________Icon arrow_______________________ */

.card button .arrow-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card button .arrow {
  margin-top: 1px;
  width: var(--arrow-width);
  background: var(--color-hover);
  height: var(--arrow-stroke);
  position: relative;
  transition: 0.2s;
}

.card button .arrow::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  border: solid var(--color-text);
  border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
  display: inline-block;
  top: -3px;
  right: 3px;
  transition: 0.2s;
  padding: 3px;
  transform: rotate(-45deg);
}

button:hover .arrow {
  background: var(--color-text);
}

button:hover .arrow:before {
  right: 0;
}

/* _________________Responsive___________________ */

@media screen and (max-width: 768px) {
  .card {
    width: 10rem;
  }
}

@media screen and (max-width: 536px) {
  .order-by-container {
    display: none;
  }
}
</style>
