import { createStore } from "vuex";
import { db } from "@boot/database.js";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import {
  getStorage,
  ref as refStorage,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useToast } from "vue-toastification";
import router from "../router";

const store = createStore({
  state: {
    themeDark: false,
    filters: [],
    articles: [],
    filteredArticles: [],
    user: null,
    isAuthenticated: null,
    isGoogleUser: null,
    emailVerified: null,
    cart: [],
  },
  getters: {
    themeDark(state) {
      return state.themeDark;
    },
    getFilters(state) {
      return state.filters;
    },
    getArticles(state) {
      return state.filteredArticles.length
        ? state.filteredArticles
        : state.articles;
    },
    getArticleById: (state) => (id) => {
      return state.articles.find((article) => article.id === id);
    },
    getUser: (state) => {
      return state.user;
    },
    getIsAuthenticated: (state) => {
      return state.isAuthenticated;
    },
    getIsGoogleUser: (state) => {
      return state.isGoogleUser;
    },
    getEmailVerified: (state) => {
      return state.emailVerified;
    },
    getCart: (state) => {
      return state.cart;
    },
  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
    },
    setFilteredArticles(state, articles) {
      state.filteredArticles = articles;
    },
    setFilters(state, filters) {
      state.filters = filters;
    },
    setThemeDark(state, name) {
      state.themeDark = name;
    },
    setUser(state, user) {
      state.user = user;
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setGoogleUser(state, isGoogleUser) {
      state.isGoogleUser = isGoogleUser;
    },
    setEmailVerified(state, emailVerified) {
      state.emailVerified = emailVerified;
    },
    setCart(state, cart) {
      state.cart = cart;
    },
  },
  actions: {
    // Change the theme mode
    changeMode({ commit }, name) {
      commit("setThemeDark", name);
    },
    // Register a new user
    async register(
      { commit },
      {
        displayName,
        firstname,
        lastname,
        email,
        phoneNumber,
        password,
        confirmPassword,
      }
    ) {
      try {
        if (password !== confirmPassword) {
          const toast = useToast();
          toast.error("Passwords do not match");
          throw new Error("Passwords do not match");
        }

        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        sendEmailVerification(userCredential.user);

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: displayName,
        });

        const userInfo = {
          displayName,
          firstname,
          lastname,
          email,
          phoneNumber,
          uid: user.uid, // Puedes agregar más campos si es necesario
        };
        // Guardar información adicional del usuario en Firestore
        await setDoc(doc(db, "users", user.uid), userInfo);

        commit("setUser", userInfo);

        return user;
      } catch (error) {
        const toast = useToast();
        if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address");
        } else if (error.code === "auth/weak-password") {
          toast.error("Weak password");
        } else if (error.code === "auth/email-already-in-use") {
          toast.error("Email already in use");
        } else {
          toast.error("Error registering user");
        }
        throw error;
      }
    },
    // Login an existing user
    async login({ commit }, { email, password }) {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        commit("setUser", user);

        return user;
      } catch (error) {
        const toast = useToast();
        if (error.code === "auth/user-not-found") {
          toast.error("User not found");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Wrong password");
        } else if (error.code === "auth/invalid-credential") {
          toast.error("Invalid credentials");
        } else {
          toast.error("Error logging in");
        }
        throw error;
      }
    },
    // Logout the current user
    async logout({ commit }) {
      const auth = getAuth();
      await auth.signOut().then(() => {
        commit("setUser", null);
        commit("setIsAuthenticated", false);
        commit("setGoogleUser", false);
        localStorage.removeItem("setUser");
      });
    },
    // Check if the user is authenticated
    checkUser({ commit }) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit("setUser", user);
          commit("setIsAuthenticated", true);

          commit("setEmailVerified", user.emailVerified);
          const GoogleUser = user.providerData[0].providerId === "google.com";
          commit("setGoogleUser", GoogleUser);

          if (!GoogleUser) {
            if (localStorage.getItem("setUser")) {
              const userInfo = JSON.parse(localStorage.getItem("setUser"));
              commit("setUser", userInfo);
            } else {
              const userRef = doc(db, "users", user.uid);

              getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                  const userInfo = {
                    displayName: docSnap.data().displayName,
                    email: docSnap.data().email,
                    phoneNumber: docSnap.data().phoneNumber,
                    uid: docSnap.data().uid,
                  };
                  localStorage.setItem("setUser", JSON.stringify(userInfo));
                  commit("setUser", userInfo);
                } else {
                  const toast = useToast();
                  toast.error("User not found");
                }
              });
            }
          }
        } else {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          commit("setGoogleUser", false);
        }
      });
    },
    // Fetch the user data
    fetchUser({ commit }) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const GoogleUser = user.providerData[0].providerId === "google.com";
          if (GoogleUser) {
            commit("setUser", user);
          }
        } else {
          router.push("/login");
          commit("setUser", null);
        }
      });
    },
    // Login with Google
    loginWithGoogle({ commit }, user) {
      commit("setUser", user);
    },
    // Forgot password
    async forgotPassword({ commit }, email) {
      try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email);
      } catch (error) {
        const toast = useToast();
        if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address");
        } else if (error.code === "auth/user-not-found") {
          toast.error("User not found");
        } else {
          toast.error("Error sending password reset email");
        }

        throw error;
      }
    },
    // Send email verification
    sendEmailVerification({ commit }) {
      const toast = useToast();
      const auth = getAuth();
      sendEmailVerification(auth.currentUser)
        .then(() => {
          toast.success(
            "Email verification sent, please check your inbox and spam folder"
          );
          commit("setEmailVerified", false);
        })
        .catch((error) => {
          if (error.code === "auth/too-many-requests") {
            toast.error("Too many requests");
          } else {
            toast.error("Error sending email verification");
          }
        });
    },
    // Update user password
    async updateUserPassword({ commit }, { password }) {
      const toast = useToast();
      const auth = getAuth();
      const currentUser = auth.currentUser;
      // Actualizar la contraseña del usuario
      await updatePassword(currentUser, password).catch((error) => {
        if (error.code === "auth/weak-password") {
          toast.error("Weak password");
        } else {
          toast.error("Error updating password");
        }
        throw error;
      });
    },
    // Update user data
    async updateUserData({ commit }, { displayName, phoneNumber, uid, email }) {
      const toast = useToast();
      try {
        // Verificar campos vacíos
        if (!displayName || !phoneNumber || !email || !uid) {
          toast.error("All fields are required");
          throw new Error("All fields are required");
        }

        await updateProfile(getAuth().currentUser, {
          displayName: displayName,
        });

        const userRef = doc(db, "users", uid);

        const user = {
          displayName: displayName,
          phoneNumber: phoneNumber,
          email: email,
          uid: uid,
        };

        await setDoc(userRef, user)
          .then(() => {
            localStorage.setItem("setUser", JSON.stringify(user));
            commit("setUser", user);
          })
          .then(() => {
            toast.success("User updated successfully");
          })
          .catch((error) => {
            toast.error("Error updating user in Firestore");
            throw error;
          });
      } catch (error) {
        toast.error("Error updating user data");
        throw error;
      }
    },
    // Fetch articles from Firestore
    async fetchArticles({ commit }) {
      const toast = useToast();
      const storage = getStorage();
    
      const retryFetchImages = async (listRef, retries = 3, delay = 2000) => {
        for (let i = 0; i < retries; i++) {
          const res = await listAll(listRef);
          if (res.items.length > 0) {
            // The images are fetched in parallel
            return Promise.all(
              res.items.map((item) =>
                getDownloadURL(refStorage(storage, item.fullPath)).catch(() => {
                  toast.error("Error getting images");
                  return null;
                })
              )
            );
          }
          // Delay between retries
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        return []; // If there are no images
      };
    
      try { // Fetch articles
        const articlesSnapshot = await getDocs(collection(db, "articulos"));
        const articlePromises = articlesSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          data.id = doc.id;
    
          const listRef = refStorage(storage, data.id);
          const urls = await retryFetchImages(listRef);
          
          // Filter null values
          if (urls.length > 0) {
            data.urls = urls.filter((url) => url !== null);
          } else {
            data.urls = [];
          }
          return data;
        });

        // Wait for all articles to be fetched
        const articles = await Promise.all(articlePromises);

        // Save articles in localStorage
        localStorage.setItem("articles", JSON.stringify(articles));
        commit("setArticles", articles);
      } catch (error) {
        toast.error("Error getting articles. Please try again later.");
      }
    },
    
    // Fetch filters from Firestore
    async fetchFilters({ commit }) {
      if (localStorage.getItem("filters")) {
        commit("setFilters", JSON.parse(localStorage.getItem("filters")));
        return;
      }

      const toast = useToast();
      try {
        const filtersSnapshot = await getDocs(collection(db, "filters"));
        const filters = filtersSnapshot.docs.map((doc) => doc.data());
        localStorage.setItem("filters", JSON.stringify(filters));
        commit("setFilters", filters);
      } catch (error) {
        toast.error("Error getting filters. Please try again later.");
      }
    },
    // Filter articles
    filterArticles({ commit, state }, selectedFilters) {
      if (Object.keys(selectedFilters).length === 0) {
        commit("setFilteredArticles", state.articles);
        return;
      }
      const filteredArticles = state.articles.filter((article) => {
        return Object.keys(selectedFilters).every((filterName) => {
          return selectedFilters[filterName].some(
            (option) => article[filterName] === option
          );
        });
      });

      const toast = useToast();
      if (filteredArticles.length === 0) {
        toast.info("No articles found with the selected filters");
      }
      commit("setFilteredArticles", filteredArticles);
    },
    // Fetch all articles
    async allArticles({ dispatch, commit }) {
      if (localStorage.getItem("articles")) {
        commit("setArticles", JSON.parse(localStorage.getItem("articles")));
        return;
      }
      await dispatch("fetchArticles");
      // await dispatch("fetchFilters");
    },
    // Listen for changes in the articles
    listenForArticleChanges({ dispatch, commit }) {
      let ifChange = false;
      onSnapshot(collection(db, "articulos"), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          ifChange = true;
          
          // If an article is removed from the store, update the cart
          if (change.type === "removed") {
            dispatch("updateCart", change.doc.id);
          }
        });
        
        if (ifChange) {
          dispatch("fetchArticles");
          ifChange = false;
        }
      });
    },
    // Get article by id
    async ArticleById({ commit, dispatch }, id) {
      const getArticlesFromLocalStorage = () => {
        const articles = localStorage.getItem("articles");
        return articles ? JSON.parse(articles) : null;
      };

      const findArticleById = (articles, id) => {
        return articles ? articles.find((article) => article.id === id) : null;
      };

      let articles = getArticlesFromLocalStorage();
      let article = findArticleById(articles, id);

      if (article) {
        if (!article.urls) {
          localStorage.removeItem("articles");
          await dispatch("fetchArticles");
          articles = getArticlesFromLocalStorage();
          article = findArticleById(articles, id);
        }
      } else {
        await dispatch("fetchArticles");
        articles = getArticlesFromLocalStorage();
        article = findArticleById(articles, id);
      }

      return article;
    },
    // Delete article
    deleteArticle({ commit }, id) {
      const toast = useToast();
      const storage = getStorage();
      const articleRef = doc(db, "articulos", id);

      deleteDoc(articleRef)
        .then(() => {
          const listRef = refStorage(storage, id);
          listAll(listRef)
            .then((res) => {
              res.items.forEach((item) => {
                deleteObject(item)
                  .catch((error) => {
                    console.error(`Error deleting ${item.fullPath}:`, error);
                  });
              });
            })
            .catch((error) => {
              console.error("Error listing items:", error);
            });

          toast.success("Article deleted successfully");
        })
        .catch((error) => {
          toast.error("Error deleting article");
          throw error;
        });
    },
    // Update Cart, if the article is removed from the store
    updateCart({ commit, state }, id) {
      const cart = state.cart.filter((article) => article.id !== id);
      commit("setCart", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    },
  },
});

export default store;
