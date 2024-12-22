<template>

<!-- Menu for desktop -->
  <div class="card">
    <ul class="list">

      <!-- Home button -->
      <li class="element" @click="$router.push('/')">
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
          ></path>
        </svg>
        <p class="label">{{ $t("viewHome.home") }}</p>
      </li>

      <!-- My account button -->
      <li class="element" @click="$router.push('/account')">
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            fill-rule="evenodd"
          ></path>
        </svg>
        <p class="label">{{ $t("viewHome.myAccount") }}</p>
      </li>
    </ul>
    <div class="separator"></div>
    <ul class="list">

      <!-- Post product button -->
      <li class="element" @click="$router.push('/post-product')">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="svg">
          <path
            clip-rule="evenodd"
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z"
          ></path>
        </svg>
        <p class="label">{{ $t("viewHome.postProduct") }}</p>
      </li>

      <!-- My posts button -->
      <li class="element" @click="$router.push('/my-posts')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <p class="label">{{ $t("viewHome.myPosts") }}</p>
      </li>
    </ul>
    <div class="separator"></div>
    <ul class="list">

      <!-- Logout button -->
      <li class="element" @click="logout">
        <svg viewBox="0 0 512 512">
          <path
            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
          ></path>
        </svg>
        <p class="label">{{ $t("viewHome.logout") }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  name: "MenuDesktop",
  data() {
    return {};
  },
  methods: {
    // Logout the user
    logout() {
      this.$store.dispatch("logout").then(() => {
        useToast().info(this.$t("viewHome.logoutSuccessfully"));
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped>

.card {
  width: 200px;
  background-color: #ade8f4;
  background-image: linear-gradient(
    139deg,
    #ade8f4 0%,
    #ade8f4 0%,
    #ade8f4 100%
  );

  border-radius: 10px;
  padding: 15px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card .separator {
  border-top: 1.5px solid #42434a;
}

.card .list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0px 10px;
}

.card .list .element {
  display: flex;
  align-items: center;
  color: rgb(65, 67, 73);
  gap: 10px;
  transition: all 0.3s ease-out;
  padding: 4px 7px;
  border-radius: 6px;
  cursor: pointer;
}

.card .list .element svg {
  width: 19px;
  height: 19px;
  transition: all 0.3s ease-out;
  fill: #0077b6;
}

.card .list .element .label {
  font-weight: 600;
}

.card .list .element:hover {
  background-color: #0077b6;
  color: #ffffff;
  transform: translate(1px, -1px);
}
.card .list .delete:hover {
  background-color: #8e2a2a;
}

.card .list .element:active {
  transform: scale(0.99);
}

.card .list:not(:last-child) .element:hover svg {
  stroke: #ffffff;
}

.card .list:last-child svg {
  stroke: #bd89ff;
}
.card .list:last-child .element {
  color: rgb(65, 67, 73);
}

.card .list:last-child .element:hover {
  color: #ffffff;
}
.card .list:last-child .element:hover svg {
  fill: #ffffff;
}

.card .list:last-child .element:hover {
  background-color: #023e8a;
}
</style>
