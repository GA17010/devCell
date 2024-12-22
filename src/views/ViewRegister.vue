<template>
  <v-row class="pa-0 ma-0" no-gutters>
    <v-col cols="12" class="container-register">
      <form class="form-container-register" @submit.prevent="register">
        <p class="title-register">{{ $t('viewRegister.register') }}</p>
        <p class="message">{{ $t('viewRegister.signupMessage') }}</p>
        <div class="flex-register">
          <label>
            <input
              v-model="firstname"
              :required="true"
              placeholder=""
              type="text"
              class="input"
              id="firstname"
              @input="filterInput"
            />
            <span>{{ $t('viewRegister.firstname') }}</span>
          </label>

          <label>
            <input
              v-model="lastname"
              required
              placeholder=""
              type="text"
              class="input"
              id="lastname"
              @input="filterInput"
            />
            <span>{{ $t('viewRegister.lastname') }}</span>
          </label>
        </div>

        <label>
          <input
            v-model="email"
            required
            placeholder=""
            type="email"
            class="input"
            id="email"
            autocomplete="email"
          />
          <span>{{ $t('viewRegister.email') }}</span>
        </label>

        <label>
          <input
            v-model="phoneNumber"
            required
            placeholder=""
            type="number"
            class="input"
            id="phoneNumber"
            @input="filterInputNumberPhone"
          />
          <span>{{ $t('viewRegister.phoneNumber') }}</span>
        </label>

        <label>
          <input
            v-model="password"
            required
            placeholder=""
            type="password"
            class="input"
            id="password"
            @input="filterInputPassword"
          />
          <span>{{ $t('viewRegister.password') }}</span>
        </label>
        <label>
          <input
            v-model="confirmPassword"
            required
            placeholder=""
            type="password"
            class="input"
            id="confirmPassword"
            @input="filterInputconfirmPassword"
          />
          <span>{{ $t('viewRegister.confirmPassword') }}</span>
        </label>
        <v-btn
          size="large"
          :loading="loading"
          class="submit-register text-none"
          type="submit"
          >{{ $t('viewRegister.submit') }}</v-btn
        >
        <p class="signin">
          {{ $t('viewRegister.alreadyHaveAccount') }}
          <p @click="this.$router.push('/login')" >{{ $t('viewRegister.signIn') }}</p>
        </p>
      </form>
    </v-col>
  </v-row>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  name: "ViewRegister",
  components: {},
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
      phoneNumber: "",
      loading: false,
    };
  },
  methods: {
    register() {
      this.loading = true;
      this.displayName = `${this.firstname} ${this.lastname}`;

      // validar el formulario
      if (
        this.firstname === "" ||
        this.lastname === "" ||
        this.email === "" ||
        this.password === "" ||
        this.confirmPassword === "" ||
        this.phoneNumber === ""
      ) {
        setTimeout(() => (this.loading = false), 2000);
        useToast().error(this.$t('viewRegister.allFieldsRequired'));
        return;
      }

      if (this.password.length < 6) {
        setTimeout(() => (this.loading = false), 2000);
        useToast().error(this.$t('viewRegister.passwordMinLength'));
        return;
      }

      this.$store
        .dispatch("register", {
          displayName: this.displayName,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phoneNumber: this.phoneNumber,
          password: this.password,
          confirmPassword: this.confirmPassword,
        })
        .then(() => {
          this.$router.push("/Account");
        })
        .catch(() => {
          setTimeout(() => (this.loading = false), 2000);
        });
    },
    filterInputNumberPhone(event) {
      const value = event.target.value;
      // permitir solo múmeros y máximo 10 caracteres
      event.target.value = value.replace(/[^0-9]/g, "").slice(0, 10);
    },
    filterInputPassword(event) {
      const value = event.target.value;
      event.target.value = value.replace(
        /[^a-zA-Z0-9@_.;:(){}\[\]!¡?¿=+*\/%$#&\\'`´~^_| !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
        ""
      ).slice(0, 25);
    },
    filterInputconfirmPassword(event) {
      const value = event.target.value;
      event.target.value = value.replace(
        /[^a-zA-Z0-9@_.;:(){}\[\]!¡?¿=+*\/%$#&\\'`´~^_| !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
        ""
      ).slice(0, 25);
    },
    filterInput(event) {
      const value = event.target.value;
      event.target.value = value.slice(0, 25);
    },
  },
};
</script>

<style>
@media (min-width: 768px) {
  .form-container-register {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 370px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    margin: 2rem;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
  }

  .container-register {
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: calc(100vh - var(--navbar-height)); */
  }
}

.container-register {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container-register {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 20px;
  position: relative;
  margin: 1.5rem;
  padding-block: 20px;
}

.title-register {
  font-size: 28px;
  color: royalblue;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.title-register::before,
.title-register::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: royalblue;
}

.title-register::before {
  width: 18px;
  height: 18px;
  background-color: royalblue;
}

.title-register::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.message,
.signin {
  color: rgba(88, 87, 87, 0.925);
  font-size: 14px;
}

.signin {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.signin p {
  color: royalblue;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  margin-left: 5px;
}

.signin p:hover {
  text-decoration: underline;
}

.flex-register {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form-container-register label {
  position: relative;
}

.form-container-register label .input {
  background: #fff;
  width: 100%;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form-container-register label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: rgba(88, 87, 87, 0.9);
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form-container-register label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form-container-register label .input:focus + span,
.form-container-register label .input:valid + span {
  top: 30px;
  font-size: 0.7em;
  font-weight: 600;
}

.form-container-register label .input:valid + span {
  color: green;
}

.submit-register {
  border: none;
  outline: none;
  background-color: royalblue;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  transform: 0.3s ease;
}

.submit-register:hover {
  background-color: rgb(56, 90, 194);
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>
