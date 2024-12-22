<template>
  <v-container class="container-search-group">
    <!-- input de la busqueda -->
    <v-row class="pb-4"no-gutters>
      <v-col cols="12" 
          class="container-search-input">
        <BarSearch />
        <v-btn
          class="btn-close-search"
          color="primary"
          @click="closeSearch"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!-- Resultados de la busqueda -->
    <v-row no-gutters>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span>Resultados de la busqueda</span>
          </v-card-title>
          <v-card-text>
            <CardsArticle :myPost="myPost" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BarSearch from "@components/BarSearch.vue";
import CardsArticle from "@components/CardsArticle.vue";

export default {
  name: "MenuSearch",
  components: {
    BarSearch,
    CardsArticle,
  },
};
</script>

<style scoped>

.container-search-group {
  background-color: #00b4d8;
  border-radius: 10px;
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  

}

.container-search-input {
  border: none;
  border-radius: 20px;
  padding: 10px;
  width: 100%;
}

.btn-close-search {
  position: absolute;
  right: 0;
  top: 0;
  margin: 10px;
}
</style>
