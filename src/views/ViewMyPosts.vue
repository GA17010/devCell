<template>
  <div v-if="user" class="container-my-posts">
    <v-col cols="12" md="8" class="ma-0 pa-0">
      <v-card class="mb-4">
        <v-card-title>
          <h3>{{ $t("viewMyPosts.myPosts") }}</h3>
        </v-card-title>
        <v-card-text>
          <v-row v-if="loadingPosts" no-gutters>
            <v-col cols="12" style="display: static; min-height: 200px">
              <DisplayLoader />
            </v-col>
          </v-row>
          <v-row v-else-if="myPost && myPost.length" no-gutters>
            <CardsArticle :myPost="myPost" :key="myPost.length"/>
          </v-row>
          <!-- else if -->
          <v-row v-else no-gutters>
            <v-col cols="12" class="d-flex justify-center">
              <h3 class="pa-4">{{ $t("viewMyPosts.noPostsYet") }}</h3>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardsArticle from "@components/CardsArticle.vue";
import DisplayLoader from "@components/DisplayLoader.vue";

export default {
  name: "ViewMyPosts",
  components: {
    CardsArticle,
    DisplayLoader,
  },
  data() {
    return {
      loadingPosts: true,
      myPost: [],
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
    user() {
      return this.getUser;
    },
  },
  watch: {
    user(newUser) {
      if (!newUser) {
        this.$router.push("/login");
      }
    },
    "$store.state.articles": {
      immediate: true,
      handler(newArticles) {
        // this.articles = newArticles;

        if (!newArticles || !this.user) return [];
        // Update my posts
        this.myPost = newArticles.filter((article) => article.uid === this.user.uid);

        // Set loading state
        this.loadingPosts = !newArticles.length;
      },
    },
  },
  beforeCreate() {
    this.$store.dispatch("fetchUser");
  },
  methods: {
    createPost() {
      this.$router.push("/post-product");
    },
  },
};
</script>

<style scoped>
.container-my-posts {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-block: 1.5rem;
}

.v-card {
  width: 100%;
}

.v-card-title {
  background-color: #f5f5f5;
}
</style>
