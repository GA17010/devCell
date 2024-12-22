<template>
  <v-row class="container-row-login">
    <v-col cols="12" class="container-col-register">
      <div class="container-signIn">
        <div class="heading">{{ $t("viewLogin.signIn") }}</div>
        <form class="form-signIn" @submit.prevent="login">
          <input
            v-model="email"
            required
            class="input"
            type="email"
            name="email"
            id="email"
            :placeholder="$t('viewLogin.emailPlaceholder')"
            autocomplete="email"
          />
          <input
            v-model="password"
            required
            class="input"
            :type="visible ? 'text' : 'password'"
            name="password"
            id="password"
            :placeholder="$t('viewLogin.passwordPlaceholder')"
          />
          <div class="container-password">
            <v-checkbox
              class="checkbox-password"
              v-model="visible"
              color="primary"
              :label="$t('viewLogin.showPassword')"
              value="true"
              hide-details
            ></v-checkbox>

            <span
              class="forgot-password"
              @click="this.$router.push('/forgot-password')"
            >
              <p>{{ $t("viewLogin.forgotPassword") }}</p>
            </span>
          </div>
          <v-btn
            size="x-large"
            :loading="loading"
            class="login-button text-none"
            type="submit"
          >
            {{ $t("viewLogin.signIn") }}
          </v-btn>
        </form>
        <div class="social-account-container">
          <span class="title">
            {{ $t("viewLogin.dontHaveAccount") }}
            <span class="span-signup" to="/signup">
              <button
                class="btn-text-signup"
                @click="this.$router.push('/register')"
              >
                {{ $t("viewLogin.signUp") }}
              </button>
            </span>
          </span>

          <span class="title">{{ $t("viewLogin.orSignInWith") }}</span>
          <div class="container-btn-google">
            <v-btn
              size="x-large"
              :loading="loadingGoogle"
              class="btn-google text-none"
              @click="loginWithGoogle"
              label="goggogo"
              variant="text"
            >
              <svg
                version="1.1"
                width="20"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style="enable-background: new 0 0 512 512"
                xml:space="preserve"
              >
                <path
                  style="fill: #fbbb00"
                  d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
    c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
    C103.821,274.792,107.225,292.797,113.47,309.408z"
                ></path>
                <path
                  style="fill: #518ef8"
                  d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
    c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
    c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                ></path>
                <path
                  style="fill: #28b446"
                  d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
    c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
    c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                ></path>
                <path
                  style="fill: #f14336"
                  d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
    c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
    C318.115,0,375.068,22.126,419.404,58.936z"
                ></path>
              </svg>

              <span class="ml-2">{{ $t("viewLogin.signInWithGoogle") }}</span>
            </v-btn>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { useToast } from "vue-toastification";
import { auth, provider } from "@boot/database.js";
import { signInWithPopup } from "firebase/auth";

export default {
  name: "ViewLogin",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      loadingGoogle: false,
      visible: false,
    };
  },
  mounted() {
    localStorage.removeItem("user");
  },
  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          useToast().success(this.$t("viewLogin.loginSuccess"));
          this.$router.push("/Account");
        })
        .catch(() => {
          setTimeout(() => (this.loading = false), 2000);
        });
    },
    loginWithGoogle() {
      this.loadingGoogle = true;
      const toast = useToast();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          toast.success(this.$t("viewLogin.loginSuccess"));
          this.$router.push("/Account");
        })
        .catch((error) => {
          setTimeout(() => (this.loadingGoogle = false), 2000);
          toast.error(this.$t("viewLogin.loginFailed"));
        });
    },
  },
};
</script>

<style>
.container-row-login {
  margin: 0;
  padding: 0;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 768px) {
  .container-row-login {
    height: calc(100vh - var(--navbar-height));
  }

  .container-signIn {
    max-width: 370px;
    background: #f8f9fd;
    background: linear-gradient(
      0deg,
      rgb(255, 255, 255) 0%,
      rgb(244, 247, 251) 100%
    );
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
    margin: 20px;
  }
}

.container-signIn {
  border-radius: 40px;
  padding: 25px 25px;
}

.container-col-register {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0%;
}

.heading {
  text-align: center;
  font-weight: 900;
  font-size: 30px;
  color: rgb(16, 137, 211);
}

.form-signIn {
  margin-top: 20px;
}

.form-signIn .input {
  width: 100%;
  background: white;
  border: none;
  padding: 15px 20px;
  border-radius: 20px;
  margin-top: 15px;
  box-shadow: #cff0ff 0px 10px 10px -5px;
  border-inline: 2px solid transparent;
}

.form-signIn .input::-moz-placeholder {
  color: rgb(170, 170, 170);
}

.form-signIn .input::placeholder {
  color: rgb(170, 170, 170);
}

.form-signIn .input:focus {
  outline: none;
  border-inline: 2px solid #12b1d1;
}

.form-signIn .forgot-password {
  display: block;
  text-align: right;
  /* margin-top: 10px; */
  margin-right: 10px;
}

.form-signIn .forgot-password p {
  font-size: 13px;
  color: #0099ff;
  text-decoration: none;
  cursor: pointer;
}

.form-signIn .forgot-password p:hover {
  text-decoration: underline;
}

.form-signIn .login-button {
  display: block;
  width: 100%;
  font-weight: bold;
  background: linear-gradient(
    45deg,
    rgb(16, 137, 211) 0%,
    rgb(18, 177, 209) 100%
  );
  color: white;
  /* padding-block: 15px; */
  margin: 20px auto;
  border-radius: 20px;
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
  border: none;
  transition: all 0.2s ease-in-out;
}

.form-signIn .login-button:hover {
  transform: scale(1.03);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
}

.form-signIn .login-button:active {
  transform: scale(0.95);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
}

.social-account-container {
  margin-top: 15px;
}

.social-account-container .title {
  display: block;
  text-align: center;
  font-size: 14px;
  color: rgb(170, 170, 170);
}

.btn-text-signup {
  text-decoration: none;
  color: #0099ff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.btn-text-signup:hover {
  text-decoration: underline;
}

.social-account-container .social-accounts {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 5px;
}

.social-account-container .social-accounts .social-button {
  background: linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(112, 112, 112) 100%);
  border: 5px solid white;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  aspect-ratio: 1;
  display: grid;
  place-content: center;
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 12px 10px -8px;
  transition: all 0.2s ease-in-out;
}

.social-account-container .social-accounts .social-button .svg {
  fill: white;
  margin: auto;
}

.social-account-container .social-accounts .social-button:hover {
  transform: scale(1.2);
}

.social-account-container .social-accounts .social-button:active {
  transform: scale(0.9);
}

.agreement {
  display: block;
  text-align: center;
  margin-top: 15px;
}

.agreement a {
  text-decoration: none;
  color: #0099ff;
  font-size: 9px;
}

/* --------------------------------------------------------- */

.btn-google {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 10px;
  border: 1px solid #ededef;
  background-color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.btn-google span {
  color: #0099ff;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  text-align: center;
}

.btn-google:hover {
  border: 1px solid #2d79f3;
}

.container-btn-google {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.container-password {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;
}

.checkbox-password {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding: 0px;
  margin: 0px;
  color: rgb(99, 99, 99);
}

.checkbox-password label {
  font-size: 13px;
  margin: -5px;
  color: rgb(78, 78, 78);
}
</style>
