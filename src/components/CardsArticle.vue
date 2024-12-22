<template>

  <!-- Display the list of articles -->
  <div class="container-articles">
    <v-list lines="one">

      <!-- Display each article in a card -->
      <v-list-item
        v-for="post in myPost"
        :key="post.id"
        v-bind="{
          title: post.title,
          subtitle: post.description,
          'prepend-avatar': post.urls[0],
        }"
      >
      
        <!-- Buttons to view, edit, and delete the article -->
        <template v-slot:append>
          <v-btn
            class="btn-view"
            size="small"
            color="primary"
            variant="text"
            @click="navigateToProduct(post.id)"
          >
            {{ $t("cardsArticle.view") }}
          </v-btn>
          <v-btn
            class="btn-edit"
            size="small"
            color="green"
            variant="text"
            @click="editPost(post.id)"
          >
            {{ $t("cardsArticle.edit") }}
          </v-btn>
          <v-btn
            class="btn-delete"
            :loading="loadingStates[post.id] || false"
            size="small"
            color="red"
            variant="text"
            @click="deletePost(post.id)"
          >
            {{ $t("cardsArticle.delete") }}
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "CardsArticle",
  props: {
    myPost: Array,
  },
  data() {
    return {
      loadingStates: {},
    };
  },
  methods: {
    // Navigate to the product page
    navigateToProduct(id) {
      this.$router.push(`/product/${id}`);
    },

    // Navigate to the edit post page
    editPost(id) {
      this.$router.push(`/edit-post/${id}`);
    },

    // Delete the article
    async deletePost(id) {
      this.setLoadingState(id, true);

      try {
        await this.$store.dispatch("deleteArticle", id);
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    },

    // Set the loading state for the article
    setLoadingState(id, state) {
      this.$data.loadingStates = { ...this.$data.loadingStates, [id]: state };
    },
  },
};
</script>

<style scoped>
.container-articles {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.v-list {
  width: 100%;
  margin: 0.5rem 0;
}

.v-list-item {
  width: 100%;
  margin: 0.5rem 0;
}

.btn-view {
  background-color: #caf0f8;
  margin: 0 0.2rem;
}

.btn-edit {
  background-color: #d4edda;
  margin: 0 0.2rem;
}

.btn-delete {
  background-color: #f8d7da;
  margin: 0 0.2rem;
}
</style>
