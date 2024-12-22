<template>
  <v-container class="container-details-product">
    <div class="master-container">
      <div class="card cart">
        <div class="title">{{ $t("viewCart.cart") }} ({{ myCart.length }})</div>
        <!-- Message if the cart is empty -->
        <div v-if="myCart.length === 0" class="products">
          <h4>{{ $t("viewCart.noItemsInCart") }}</h4>
        </div>
        <!-- Display the products in the cart -->
        <div v-for="product in myCart" :key="product.id" class="products">
          <div class="product">
            <div class="product-section-photo">
              <img :src="product.urls[0]" alt="product" />
            </div>
            <div>
              <span>{{ product.title }}</span>
              <p>{{ product.description }}</p>
            </div>
            <div class="price small">${{ product.price }}</div>
            <div class="remove-product">
              <button class="bin-button" @click="removeProductCart(product)">
                <svg
                  class="bin-top"
                  viewBox="0 0 39 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    y1="5"
                    x2="39"
                    y2="5"
                    stroke="white"
                    stroke-width="4"
                  ></line>
                  <line
                    x1="12"
                    y1="1.5"
                    x2="26.0357"
                    y2="1.5"
                    stroke="white"
                    stroke-width="3"
                  ></line>
                </svg>
                <svg
                  class="bin-bottom"
                  viewBox="0 0 33 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_8_19" fill="white">
                    <path
                      d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                    ></path>
                  </mask>
                  <path
                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                    fill="white"
                    mask="url(#path-1-inside-1_8_19)"
                  ></path>
                  <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                  <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                </svg>
              </button>
            </div>
          </div>
          <v-divider></v-divider>
        </div>
      </div>
      
      <!-- Display the total of the cart -->
      <div class="card checkout">
        <div class="title">
          {{ $t("viewCart.checkout") }}
        </div>
        <div class="details">
          <span> {{ $t("viewCart.yourCartSubtotal") }}:</span>
          <span>{{ totalCart }} $</span>
        </div>
        <div class="checkout--footer">
          <div class="price"><sup>$</sup> {{ totalCart }}</div>
          <button class="checkout-btn" @click="goToCheckout">
            {{ $t("viewCart.checkout") }}
          </button>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "ViewCart",
  components: {},
  data() {
    return {
      myCart: [],
      totalCart: 0,
    };
  },
  computed: {
    ...mapGetters(["getCart"]),
  },
  async mounted() {
    // Get the cart from the local storage
    if (localStorage.getItem("cart")) {
      this.myCart = JSON.parse(localStorage.getItem("cart"));
      this.calculateTotalCart();
    } else {
      this.myCart = [];
    }
  },
  methods: {
    // Set the cart in the store
    ...mapMutations(["setCart"]),
    // Add a product to the cart
    removeProductCart(product) {
      this.myCart = this.myCart.filter((p) => p.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(this.myCart));
      this.calculateTotalCart();

      // Update the cart in the store
      this.setCart(this.myCart);
    },
    // Calculate the total of the cart
    calculateTotalCart() {
      this.totalCart = this.myCart.reduce(
        (acc, product) => acc + Number(product.price),
        0
      );
    },
    // Go to the checkout page
    goToCheckout() {
      const toast = useToast();
      // Notify the user that the checkout is not implemented
      toast.error("The checkout is not implemented yet");

      // this.$router.push({ name: "Checkout" });
    },
  },
};
</script>

<style scoped>
.container-details-product {
  margin-top: 10px;
}

.master-container {
  display: grid;
  grid-template-columns: auto;
  gap: 5px;
}

@media screen and (min-width: 768px) {
  .master-container {
    grid-template-columns: 2fr 1fr;
  }
}

.card {
  background: #ffffff;
  box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
    0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09),
    0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
}

.title {
  width: 100%;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid #efeff3;
  font-weight: 700;
  /* font-size: 11px; */
  color: #63656b;
}

/* ____________________ Cart ________________________*/
.cart {
  border-radius: 19px 19px 7px 7px;
}

.cart .products {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.cart .products .product {
  display: grid;
  grid-template-columns: 60px 6fr 40px 1fr;
  gap: 10px;
}

.cart .products .product img {
  width: 60px;
  height: 60px;
  border-radius: 7px;
  padding: 5px;
}

.cart .products .product span {
  font-size: 15px;
  font-weight: 600;
  color: #47484b;
  margin-bottom: 8px;
  display: block;
}

.cart .products .product p {
  font-size: 12px;
  font-weight: 600;
  color: #7a7c81;
  padding-bottom: 5px;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 40px;
}

.card .small {
  font-size: 15px;
  margin: 0 0 auto auto;
}

.card .small sup {
  font-size: px;
}

/* Checkout */
.checkout {
  border-radius: 9px 9px 19px 19px;
}

.checkout .details {
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 10px;
  gap: 5px;
}

.checkout .details span {
  font-size: 13px;
  font-weight: 600;
}

.checkout .details span:nth-child(odd) {
  font-size: 12px;
  font-weight: 700;
  color: #707175;
  margin: auto auto auto 0;
}

.checkout .details span:nth-child(even) {
  font-size: 14px;
  font-weight: 600;
  color: #47484b;
  margin: auto 0 auto auto;
}

.checkout .checkout--footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 20px;
  background-color: #efeff3;
}

.price {
  position: relative;
  font-size: 23px;
  color: #2b2b2f;
  font-weight: 900;
}

.price sup {
  font-size: 14px;
}

.price sub {
  width: fit-content;
  position: absolute;
  font-size: 12px;
  color: #5f5d6b;
  bottom: 5px;
  display: inline-block;
}

.checkout .checkout-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 36px;
  background: linear-gradient(180deg, #4480ff 0%, #115dfc 50%, #0550ed 100%);
  box-shadow: 0px 0.5px 0.5px #efefef, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
  border-radius: 7px;
  border: 0;
  outline: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

/* ________________________ Remove product button ____________________________*/

.remove-product {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.bin-button {
  height: 30px;
  margin: auto;
  padding-inline: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 15px;
  background-color: rgb(255, 95, 95);
  cursor: pointer;
  border: 3px solid rgb(255, 201, 201);
  transition-duration: 0.3s;
}
.bin-bottom {
  width: 10px;
}
.bin-top {
  width: 12px;
  transform-origin: right;
  transition-duration: 0.3s;
}
.bin-button:hover .bin-top {
  transform: rotate(45deg);
}
.bin-button:hover {
  background-color: rgb(255, 0, 0);
}
.bin-button:active {
  transform: scale(0.9);
}
</style>
