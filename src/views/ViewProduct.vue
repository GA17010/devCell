<template>
  <!-- Main container to display a loading indicator if there is an error loading -->
  <div v-if="errorLoading" class="container_progress_circular">
    <DisplayLoader />
    <!-- Componente para mostrar un indicador de carga -->
  </div>

  <!-- Container to display the product information -->
  <div class="container-product" v-else-if="!error">
    <v-row class="px-4 ma-0" no-gutters>
      <!-- Column to display the product images -->
      <v-col cols="12" lg="6" md="6" sm="12" xs="12">
        <div class="container-photo-product">
          <!-- Carousel to display the images of the product -->
          <CarouselArticle
            v-if="article.urls"
            style="height: 100%; width: 450px; border-radius: 10px"
            :article="article"
          />
          <!-- Placeholder image if there are no images -->
          <div v-else>
            <img
              style="height: 100%; width: 100%"
              src="https://via.placeholder.com/500"
              alt="placeholder"
            />
          </div>
        </div>
      </v-col>

      <!-- Column to display the product information -->
      <v-col class="container-info-product px-6">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <p class="price">$ {{ article.price }}</p>
        <button @click="addProductCart(article)">
          {{ $t("viewProduct.addToCart") }}
        </button>
        <!-- Information about the seller -->
        <p class="seller">
          {{ $t("viewProduct.seller") }}: {{ article.seller }}
        </p>
      </v-col>
    </v-row>

    <!-- Container to display the product specifications -->
    <v-row class="container-details-product" no-gutters>
      <div>
        <h2>{{ $t("viewProduct.specifications") }}</h2>
      </div>
      <!-- Table row for each product specification -->
      <v-table class="table-product">
        <tbody>
          <tr>
            <th>{{ $t("viewProduct.brand") }}</th>
            <td>{{ article.brand }}</td>
          </tr>
          <tr>
            <th>{{ $t("viewProduct.model") }}</th>
            <td>{{ article.model }}</td>
          </tr>
          <tr>
            <th>{{ $t("viewProduct.system") }}</th>
            <td>{{ article.os }}</td>
          </tr>
          <tr>
            <th>{{ $t("viewProduct.ram") }}</th>
            <td>{{ article.ram }}</td>
          </tr>
          <tr>
            <th>{{ $t("viewProduct.storage") }}</th>
            <td>{{ article.storage }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-row>
  </div>

  <!-- Display a message if the product is not found -->
  <div v-else>
    <h1>{{ $t("viewProduct.productNotFound") }}</h1>
  </div>
</template>

<script>
import CarouselArticle from "@/components/CarouselArticle.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import DisplayLoader from "@/components/DisplayLoader.vue";
import { useToast } from "vue-toastification";

export default {
  name: "ViewPostProduct",
  components: {
    CarouselArticle,
    DisplayLoader,
  },
  data() {
    return {
      article: null,
      error: null,
      errorLoading: true,
      cart: [],
    };
  },
  created() {
    // Fetch the product information when the component is created
    this.getProduct();
  },
  watch: {
    // Observa cambios en el parámetro id de la ruta
    "$route.params.id": {
      immediate: true, // Llama al handler al cargar el componente
      handler(newId) {
        this.getProduct(newId); // Recarga los datos del producto
      },
    },
  },
  computed: {
    // Get the product information from the store
    ...mapGetters(["getArticles", "getCart"]),
  },
  methods: {
    // Fetch the product information from the store
    ...mapActions(["fetchArticles", "ArticleById"]),
    // Set the cart in the store
    ...mapMutations(["setCart"]),
    // Get the product information by the id
    async getProduct(id = this.$route.params.id) {
      this.errorLoading = true; // Set the loading indicator
      this.article = null; // Reset the product information
      try {
        this.article = await this.ArticleById(id);
        if (!this.article) {
          this.error = this.$t("viewProduct.productNotFound");
        } else {
          this.error = null; // Reset the error message
        }
      } catch (error) {
        this.error = this.$t("viewProduct.productNotFound");
      } finally {
        this.errorLoading = false; // Remove the loading indicator
      }
    },

    // Add the product to the cart
    addProductCart(article) {
      const toast = useToast();

      // get the cart from the localStorage
      this.cart = JSON.parse(localStorage.getItem("cart")) || [];

      // If the product is already in the cart, do nothing
      if (this.cart.some((item) => item.id === article.id)) {
        toast.error(this.$t("viewProduct.alreadyInCart"));
        return;
      }

      // Add the product to the cart
      this.cart.push(article);

      // set the cart in the store
      this.setCart(this.cart);

      // Show a success message
      toast.success(this.$t("viewProduct.addedToCart"));

      // Save the cart in localStorage
      localStorage.setItem("cart", JSON.stringify(this.cart));

      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Styles for the product view */

.container_progress_circular {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - var(--navbar-height));
}

.container-product {
  margin-inline: 0rem;
  padding-block: 2rem;
  background-color: #ffffff;
}

.container-photo-product {
  display: flex;
  justify-content: center;
  height: 27rem;
  max-width: 800px;
  border-radius: 10px;

  padding-inline: 1rem;
}

.container-info-product {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  flex-direction: column;
  width: 50%;
  padding: 1rem 4rem;
  margin-top: 1rem;
}

.container-info-product .seller {
  color: #333;
  font-size: 1em;
  margin-top: 1em;
  font-weight: bold;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  border-radius: 5px;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

h1 {
  color: #333;
  font-size: 2em;
  margin-bottom: 0.5em;
}

p {
  color: #666;
  font-size: 1em;
}

.price {
  font-weight: bold;
  font-size: 2em;
  color: #ff0000;
  margin: 1em 0;
}

.quantity {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.quantity button {
  border-radius: 5px;
  background-color: #f1f1f1;
  border: none;
  color: black;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.quantity button:hover {
  background-color: #ddd;
}

.quantity span {
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 0;
}

.container-details-product {
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1rem;
  border-radius: 10px;
  padding-inline: 2rem;
  padding-top: 2rem;
}

.container-details-product h2 {
  color: #333;
  margin-bottom: 0.5em;
  text-align: center;
  width: auto;
  /* border: 1px solid #ccc; */
  padding-inline: 4rem;
  padding-block: 0.4rem;
  background-color: var(--color-background);
  border-radius: 5px;
}

.container-details-product > div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
}

.table-product tbody tr:nth-child(even) {
  background-color: var(--color-background);
}

.table-product td {
  text-align: right;
}

/* Responsive */
@media (max-width: 699px) {
  .container-info-product {
    width: 100%;
  }

  .container-details-product {
    padding-inline: 1rem;
  }
}

@media (min-width: 700px) {
  .container-product {
    padding: 3rem;
    border-radius: 10px;
  }

  .container-photo-product {
    padding-inline: 3rem;
  }
}
</style>
