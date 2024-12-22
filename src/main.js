import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import i18n from "./i18n/index";

// Import store and router
import store from "./store/store";
import router from "./router";

// Import the global css file
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  position: "top-right",
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  maxToasts: 10,
};

// Import vuetify
import vuetify from "./vuetify/vuetify";

// Create the app
const app = createApp(App);

app.use(vuetify);
app.use(store);
app.use(router);
app.use(Toast, options);
app.use(i18n);

app.mount("#app");
