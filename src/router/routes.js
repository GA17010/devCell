const routes = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/ViewHome.vue"),
      },
      // {
      //   path: "/validar_sitio/:idSitio",
      //   component: () => import("pages/ValidarSitios.vue"),
      // },
      { path: "/Account", component: () => import("@/views/ViewAccount.vue") },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/ViewLogin.vue")
      },
      {
        path: "/register",
        component: () => import("@/views/ViewRegister.vue"),
      },
      // { path: "/my_account", component: () => import("@/views/ViewAccount.vue") },
      { path: "/cart", component: () => import("@/views/ViewCart.vue") },
      {
        path: "/post-product",
        component: () => import("@/views/ViewPostProduct.vue"),
      },
      {
        name: "productDetail",
        path: "/product/:id",
        component: () => import("@/views/ViewProduct.vue"),
      },
      {
        path: "/forgot-password",
        component: ( ) => import("@/views/ViewForgotPassword.vue"),
      },
      {
        path: "/my-posts",
        component: () => import("@/views/ViewMyPosts.vue"),
      },
      {
        path: "/edit-post/:id",
        component: () => import("@/views/ViewEditPost.vue"),
      }
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("../views/ErrorNotFound.vue"),
  },
];


export default routes;
