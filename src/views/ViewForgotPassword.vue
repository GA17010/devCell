<template>
  <div class="">
    <v-row class="container-row-ForgotPassword">
      <v-col cols="12" md="8" class="container-col-ForgotPassword">
        <div class="form-container">
          <div class="logo-container">
            {{ $t("viewForgotPassword.forgotPassword") }}
          </div>

          <form class="form" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="email">
                {{ $t("viewForgotPassword.enterEmail") }}
              </label>
              <input
                v-model="user.email"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                :placeholder="$t('viewForgotPassword.enterYourEmail')"
                required=""
              />
            </div>
            <v-btn
              size="large"
              :loading="loading"
              class="form-submit-btn text-none"
              type="submit"
            >
              {{ $t("viewForgotPassword.sendEmail") }}
            </v-btn>
          </form>

          <p class="signup-link">
            {{ $t("viewForgotPassword.dontHaveAccount") }}
            <span class="span-signup" to="/signup">
              <button
                class="btn-text-signup"
                @click="this.$router.push('/register')"
              >
                {{ $t("viewForgotPassword.signUpNow") }}
              </button>
            </span>
          </p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  name: "ViewForgotPassword",
  data() {
    return {
      user: {
        email: "",
      },
      loading: false,
    };
  },
  methods: {
    submitForm() {
      this.loading = true;
      this.$store
        .dispatch("forgotPassword", this.user.email)
        .then(() => {
          this.loading = false;
          const toast = useToast();
          toast.success(this.$t("viewForgotPassword.passwordResetEmailSent"));
          this.$router.push("/login");
        })
        .catch(() => {
          setTimeout(() => (this.loading = false), 2000);
        });
    },
  },
};
</script>

<style scoped>
.container-row-ForgotPassword {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
}

.container-col-ForgotPassword {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
}

@media (min-width: 768px) {
  .form-container {
    background-color: #fff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084),
      0px 2px 3px rgba(0, 0, 0, 0.168);
    max-width: 400px !important;
  }

  .form-container .logo-container {
    text-align: center;
  }
}

.form-container {
  max-width: 500px;
  /* background-color: #fff; */
  padding: 32px 24px;
  font-size: 14px;
  font-family: inherit;
  color: #212121;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  border-radius: 10px;
}

.form-container button:active {
  scale: 0.95;
}

.form-container .logo-container {
  /* text-align: left; */
  font-weight: 700;
  font-size: 22px;
  color: rgb(16, 137, 211);
}

.form-container .form {
  display: flex;
  flex-direction: column;
}

.form-container .form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form-container .form-group label {
  display: block;
  margin-bottom: 20px;
  color: rgba(88, 87, 87, 0.822);
  align-self: center;
  font-weight: 500;
}

.form-container .form-group input {
  background: #ffffff;
  color: #000;
  width: 100%;
  margin-block: 5px;
  padding: 12px 16px;
  border-radius: 6px;
  font-family: inherit;
  border: 1px solid #ccc;
}

.form-container .form-group input::placeholder {
  opacity: 0.5;
}

.form-container .form-group input:focus {
  outline: none;
  border-color: #1778f2;
}

.form-container .form-submit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  color: #fff;
  background-color: #1778f2;
  border: none;
  width: 100%;
  padding: 12px 16px;
  font-size: inherit;
  gap: 8px;
  margin: 12px 0;
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
}

.form-container .form-submit-btn:hover {
  background-color: #1981ff;
}

.form-container .link {
  color: #1778f2;
  text-decoration: none;
}

.form-container .signup-link {
  color: rgba(88, 87, 87, 0.822);
  align-self: center;
  font-weight: 500;
}

.form-container .signup-link .link {
  font-weight: 400;
}

.form-container .link:hover {
  text-decoration: underline;
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
</style>
