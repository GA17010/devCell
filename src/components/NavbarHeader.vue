<template>
  <!-- Navbar -->
  <nav class="navbar">
    <div class="container-fluid">
      <!-- Hamburger button for mobile -->
      <button
        ref="buttonHamburguer"
        class="hamburguer"
        @click="isOpen = !isOpen"
      >
        <svg
          fill="none"
          height="16"
          viewBox="0 0 24 18"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m0 0h24v3h-12-12zm0 7.5h24v3h-24zm0 7.5h24v3h-24z"
            fill="#fff"
          ></path>
        </svg>
      </button>

      <!-- Logo and title -->
      <router-link class="navbar-brand" to="/">
        <img class="logo" src="@/assets/logo.png" alt="Logo" />
        <span class="title-navbar" translate="no"> CellPhone </span>
      </router-link>

      <!-- Container for the search bar -->
      <div class="container-search">
        <BarSearch />
      </div>

      <!-- Container for the menu -->
      <div class="navbar-container" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item navbar-item-desktop">
            <router-link class="nav-link home" to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.6em"
                height="1.6em"
                viewBox="0 0 1024 1024"
                stroke-width="0"
                fill="currentColor"
                stroke="currentColor"
                class="icon"
              >
                <path
                  d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"
                ></path>
              </svg>
            </router-link>
          </li>
          <!-- search -->
          <li class="nav-item navbar-item-mobile">
            <v-btn
              class="py-5"
              size="x-small"
              variant="text"
              @click="openMenuSearch = !openMenuSearch"
            >
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                height="2.5em"
                width="2.5em"
              >
                <path
                  d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"
                  fill-rule="evenodd"
                  fill="#FFF"
                ></path>
              </svg>
            </v-btn>
          </li>
          <!-- Language -->
          <li class="nav-item">
            <v-btn
              id="menu-activator-language"
              class="py-5"
              size="x-small"
              variant="text"
            >
              <img src="@/assets/language.svg" alt="USA" />
            </v-btn>
            <v-menu activator="#menu-activator-language">
              <MenuLanguages />
            </v-menu>
          </li>
          <!-- Cart -->
          <li class="nav-item">
            <router-link class="nav-link pt-1" to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3em"
                height="1.3em"
                stroke-linejoin="round"
                stroke-linecap="round"
                viewBox="0 0 24 24"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
                class="icon"
              >
                <circle r="1" cy="21" cx="9"></circle>
                <circle r="1" cy="21" cx="20"></circle>
                <path
                  d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                ></path>
              </svg>
              <v-badge
                v-if="cart.length > 0"
                color="info"
                :content="cart.length"
                class="pb-5"
              ></v-badge>
            </router-link>
          </li>
          <!-- User -->
          <li class="nav-item navbar-item-desktop" v-if="auth">
            <v-btn
              id="menu-activator"
              class="text-none"
              style="display: block; width: 170px"
            >
              <svg
                height="32"
                width="32"
                viewBox="0 -8 22 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Layer_3" data-name="Layer 3">
                  <path
                    d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"
                  ></path>
                </g>
              </svg>
              <span class="navbar-displayName pr-1"
                >{{ user.displayName }}
              </span>
              <v-avatar v-if="user.photoURL" size="x-small">
                <v-img alt="John" :src="user.photoURL"></v-img>
              </v-avatar>
            </v-btn>
            <v-menu activator="#menu-activator">
              <MenuDesktop />
            </v-menu>
          </li>
          <li class="nav-item navbar-item-desktop item-login" v-if="!auth">
            <router-link class="nav-link" to="/login">
              <!-- <span class="material-symbols-outlined icon-login"> login </span> -->
              <div
                style="
                  width: 22px;
                  height: 22px;
                  transition: all 0.3s ease-out;
                  fill: white;
                  margin-right: 5px;
                "
              >
                <svg viewBox="0 0 512 512">
                  <path
                    d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                  ></path>
                </svg>
              </div>
              <span>{{ $t("viewHome.signIn") }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Menu for mobile -->
      <div ref="menuMobile" class="menu" :class="{ open: isOpen }">
        <!-- Close button -->
        <button class="hamburguer_closed" @click="isOpen = !isOpen">
          <span class="material-symbols-outlined"> close </span>
        </button>

        <!-- Menu items -->
        <ul class="navbar-mobile">
          <li class="navbar-mobile-item-user" v-if="auth">
            <router-link to="/Account" @click="isOpen = !isOpen">
              <!-- User photo -->
              <img
                v-if="user.photoURL"
                :src="user.photoURL"
                alt="User Photo"
                class="user-photo"
              />

              <!-- Placeholder image if there is no photo -->
              <img
                v-else
                src="@/assets/user.png"
                alt="User Photo"
                class="user-photo"
              />
            </router-link>
            <span class="user_displayName">{{ user.displayName }}</span>
            <div class="navbar-mobile-item2" v-if="auth">
              <router-link to="/Account" @click="isOpen = !isOpen">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 -9 12 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Layer_3" data-name="Layer 3">
                    <path
                      d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"
                    ></path>
                  </g>
                </svg>
                <span>{{ $t("viewHome.myAccount") }}</span>
              </router-link>
            </div>
          </li>
          <li v-else class="navbar-mobile-item-user">
            <router-link to="/login" @click="isOpen = !isOpen">
              <img
                src="@/assets/user.png"
                alt="User Photo"
                class="user-photo"
              />
            </router-link>
            <span>{{ $t("viewHome.guest") }}</span>
          </li>

          <li class="navbar-mobile-item">
            <router-link to="/" @click="isOpen = !isOpen">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.6em"
                height="1.6em"
                viewBox="0 0 1024 1024"
                stroke-width="0"
                fill="black"
                stroke="currentColor"
                class="icon"
              >
                <path
                  d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"
                ></path>
              </svg>
              <span>{{ $t("viewHome.home") }}</span>
            </router-link>
          </li>
          <li class="navbar-mobile-item" v-if="auth">
            <router-link to="/post-product" @click="isOpen = !isOpen">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path
                  d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                />
              </svg>
              <span>{{ $t("viewHome.postProduct") }}</span>
            </router-link>
          </li>
          <li class="navbar-mobile-item" v-if="auth">
            <router-link to="/my-posts" @click="isOpen = !isOpen">
              <svg
                class="lucide lucide-newspaper text-blue-400 dark:text-blue-600"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                stroke="#60A5FA"
                fill="none"
                viewBox="0 0 24 24"
                height="22"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"
                ></path>
                <path d="M18 14h-8"></path>
                <path d="M15 18h-5"></path>
                <path d="M10 6h8v4h-8V6Z"></path>
              </svg>
              <span>{{ $t("viewHome.myPosts") }}</span>
            </router-link>
          </li>
          <li class="navbar-mobile-item" v-if="!auth">
            <router-link to="/login" @click="isOpen = !isOpen">
              <svg viewBox="0 0 512 512" fill="#000000">
                <path
                  d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                ></path>
              </svg>
              <span>{{ $t("viewHome.signIn") }}</span>
            </router-link>
          </li>
          <li class="navbar-mobile-item" v-else>
            <router-link to="/" @click="logout">
              <svg viewBox="0 0 512 512">
                <path
                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                ></path>
              </svg>
              <span>{{ $t("viewHome.logout") }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Search bar Mobile-->
  <div class="menu-search" :class="{ open: openMenuSearch }">
    <BarSearchMobile />
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";
import MenuDesktop from "@components/MenuDesktop.vue";
import MenuLanguages from "@components/MenuLanguages.vue";
import BarSearchMobile from "@components/BarSearchMobile.vue";
import BarSearch from "@components/BarSearch.vue";

export default {
  name: "NavbarHeader",
  components: {
    MenuDesktop,
    MenuLanguages,
    BarSearch,
    BarSearchMobile,
  },
  data() {
    return {
      isOpen: ref(false),
      openMenuSearch: ref(false),
    };
  },
  computed: {
    // Get the user information from the store
    ...mapGetters(["getUser", "getIsAuthenticated", "getCart"]),

    // Check if the user is authenticated
    auth() {
      return this.getIsAuthenticated;
    },

    // Get the user information
    user() {
      return this.getUser;
    },

    cart() {
      return this.getCart;
    },
  },
  beforeCreate() {
    // Check if the user is authenticated
    this.$store.dispatch("checkUser");

    // Get the cart from the local storage
    if (localStorage.getItem("cart")) {
      this.$store.commit("setCart", JSON.parse(localStorage.getItem("cart")));
    }
  },

  mounted() {
    // Close the menu when the window is resized
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        this.isOpen = false;
        this.openMenuSearch = false;
      }
    });
    window.addEventListener("click", this.closeMenu);
  },

  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    window.removeEventListener("click", this.closeMenu);
  },
  methods: {
    // Close the menu when the user clicks outside of it
    closeMenu(event) {
      // Check if the user clicked on the hamburger button
      const buttonHamburguer = this.$refs.buttonHamburguer;
      if (buttonHamburguer.contains(event.target)) {
        return;
      }

      // Check if the user clicked on the menu
      const menuMobile = this.$refs.menuMobile;
      if (menuMobile.contains(event.target)) {
        return;
      }

      // Check if the menu is open
      if (this.isOpen) {
        this.isOpen = false;
      }
    },

    // Logout the user
    logout() {
      this.isOpen = false;
      this.$store.dispatch("logout").then(() => {
        useToast().info(this.$t("viewHome.logoutSuccessfully"));
      });
    },
  },
};
</script>

<style scoped>
/* ______________navbar______________ */

.navbar {
  background-color: var(--color-primary);
  flex-direction: column;
  display: flex;
  top: 0;
  width: 100%;
  height: var(--navbar-height);
  border-bottom: 1px solid var(--color-accent);
  box-shadow: 0px 12px 18px -6px rgba(0, 68, 255, 0.404);
  position: sticky;
  z-index: 1000;
}

.container-fluid {
  display: flex;
  align-items: center;
  height: 100%;
  /* justify-content: space-between; */
  width: 100%;
  padding: 0 1rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
  text-align: center;
  padding-left: 1rem;
  text-decoration: none;
  cursor: pointer;
}

.title-navbar {
  font-weight: 600;
  font-size: 1.5rem;
  color: white;
  width: max-content;
}

.logo {
  font-size: 2.6rem;
  padding-right: 1rem;
  color: white;
  height: 40px;
  width: auto;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  max-width: 100%;
  padding-right: 2rem;
}
nav ul.navbar-nav {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 8px;
}
nav ul li.nav-item {
  margin: 0 0px;
  list-style: none;
}

nav ul li.nav-item a {
  background-color: transparent;
  border: none;
  color: white;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  text-decoration: none;
}

nav ul li.nav-item a:hover {
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.678));
  transition: 0.2s ease-in;
}

nav ul li.nav-item .v-btn {
  /* background-color: transparent; */
  border: none;
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  text-decoration: none;
  border-radius: 20px;
}

nav ul li.nav-item .v-btn:hover {
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.678));
  transition: 0.3s;
}

nav ul li.nav-item .v-btn svg {
  fill: black;
}

/* ________________________Search bar__________________________ */

.container-search {
  /* display: flex; */
  place-content: center;
  /* place-items: center; */
  flex-direction: row;
  width: 100%;
  padding-inline: 1rem;
  justify-content: space-evenly;
}

/* _____________________________Menu_____________________________ */

.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: var(--color-background);
  padding: 15px;
  transform: translateX(-100%);
  transition: transform 0.2s ease-in;
  z-index: 1000;
}

.menu.open {
  transform: translateX(0);
  z-index: 1000;
  box-shadow: 0px 12px 18px -6px rgba(0, 68, 255, 0.404);
  position: fixed;
  top: 0;
  left: 0;
  width: 17rem;
  height: 100%;
  transition: transform 0.2s ease-in-out;
}

.navbar-mobile {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0;
  margin: 0;
  list-style: none;
  height: 100%;
  /* align-items: center; */
  justify-content: start;
  padding-top: 2rem;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 15px;
  /* background-color: var(--color-navbar); */
  transition: 0.3s;
}

li.navbar-mobile-item-user {
  /* border-radius: 100%; */
  width: 100%;

  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  cursor: pointer;
  margin-bottom: 2rem;
}

li.navbar-mobile-item-user img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  /* margin-right: 10px; */
}

li.navbar-mobile-item-user span {
  /* display: flex; */
  text-align: center;

  /* font-size: 1.1rem; */
  /* color: var(--color-secondary); */
}

div.navbar-mobile-item2 {
  margin: 0;
  padding: 0;
  width: 100%;
  /* font-size: 0.8rem; */
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
}

div.navbar-mobile-item2 a {
  color: var(--color-accent);
  text-decoration: none;
  /* font-size: 1rem; */
  /* padding: 10px; */
  /* width: 100%; */
  /* display: block; */
  border: none;
  /* transition: 0.3s; */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

div.navbar-mobile-item2 a:hover {
  /* background-color: var(--color-hover); */
  /* color: var(--color-secondary); */
  transition: 0.3s;
}

div.navbar-mobile-item2 a span {
  font-size: 0.8rem;
}

li.navbar-mobile-item svg {
  stroke: var(--color-text);
  width: 1.1rem;
  height: 1.1rem;
}

li.navbar-mobile-item {
  color: red;
}

div.navbar-mobile-item2 a span.material-symbols-outlined {
  padding-top: 3px;
  font-size: 1.1rem;
  /* color: var(--color-text); */
}

li.navbar-mobile-item {
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: start;
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid var(--color-accent);
  transition: 0.3s;
}

li.navbar-mobile-item a {
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.1rem;
  padding: 10px;
  width: 100%;
  display: block;
  border: none;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
}

li.navbar-mobile-item a:hover {
  background-color: var(--color-hover);
  color: var(--color-secondary);
  transition: 0.3s;
}

li.navbar-mobile-item a span {
  font-size: 1.1rem;
  color: var(--color-text);
}

li.navbar-mobile-item a span.material-symbols-outlined {
  padding-top: 3px;
  font-size: 1.1rem;
  color: var(--color-text);
}

/* _______________________Menu Search_______________________ */

.menu-search {
  display: none;
}

.menu-search.open {
  display: flex;
  background-color: var(--color-primary);
  /* border-bottom: 1px solid var(--color-primary); */
  position: fixed;
  /* top: var(--navbar-height); */
  width: 100%;
  transition: transform 0.5s ease-in-out;
  z-index: 100;
  left: 0;
  /* padding: 15px; */
  justify-content: center;
  align-items: center;
}

/* ________________________Responsive____________________ */

@media screen and (max-width: 768px) {
  .container-search {
    display: none;
  }

  .navbar-item-desktop {
    display: none;
  }

  .navbar-container {
    padding-right: 1rem;
  }

  .hamburguer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 100%;
    background-color: var(--color-primary);
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    /* padding-left: 15px; */
  }

  .hamburguer_closed {
    position: absolute;
    top: 16px;
    left: 9px;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    color: var(--color-text);
    font-size: 1.5rem;
    z-index: 1000;
    transform: scale(1.2);
    cursor: pointer;
  }
}

@media screen and (min-width: 769px) {
  .hamburguer {
    display: none;
  }
  .navbar-brand {
    padding-left: 1rem;
  }
  .container-search {
    padding-inline: 1rem;
  }

  .navbar-container {
    max-width: max-content;
  }

  .navbar-item-mobile {
    display: none;
  }
  nav ul.navbar-nav {
    gap: 16px;
  }
}

@media screen and (min-width: 1024px) {
  .hamburguer {
    display: none;
  }
  .navbar-brand {
    padding-left: 1rem;
  }
  .container-search {
    padding-inline: 5rem;
  }
}

/* ________________________User Display Name____________________ */

.user_displayName {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.navbar-displayName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-text);
}
</style>
