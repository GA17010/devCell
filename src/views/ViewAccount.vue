<template>

  <!-- My account -->
  <div v-if="user" class="container-my-account">
    <v-col cols="12" md="8" class="ma-0 pa-0">

      <!-- My account card -->
      <v-card class="mb-4">

        <!-- My account title -->
        <v-card-title>
          <h3>{{ $t('viewAccount.myAccount') }}</h3>
        </v-card-title>

        <!-- Display the user's basic information -->
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6" class="d-flex justify-center">
              <v-avatar size="100">

                <!-- Display the user's profile picture -->
                <img
                  v-if="user.photoURL"
                  :src="user.photoURL"
                  alt="profile picture"
                />

                <!-- Display the default profile picture if the user does not have a profile picture -->
                <img v-else src="@/assets/user.png" alt="profile picture" />
              </v-avatar>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="d-flex flex-column align-center justify-center"
            >
              <h4>
                {{ user.displayName }}

                <!-- Display the Google icon if the user is a Google user -->
                <v-icon v-if="GoogleUser" color="red">mdi-google</v-icon>

                <!-- Display the email verification icon if the email is verified -->
                <v-icon class="mx-1" v-if="emailVerified" color="green"
                  >mdi-check-circle</v-icon
                >
              </h4>
              <p>{{ user.email }}</p>

              <!-- Display the email verification button if the user is not a Google user and the email is not verified -->
              <v-btn
                v-if="!GoogleUser && !emailVerified"
                color="primary"
                @click="sendEmailVerification"
                :disabled="emailVerified"
                prepend-icon="mdi-email"
                size="small"
                class="mt-2"
                outlined
              >
                {{ $t('viewAccount.verifyEmail') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="8" class="ma-0 pa-0">

      <!-- Basic information card -->
      <v-card>
        <v-card-title>
          <h3>{{ $t('viewAccount.basicInformation') }}</h3>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                ref="displayName"
                v-model="user.displayName"
                :class="
                  isSubmitted && !user.displayName ? 'required' : 'not-required'
                "
                :rules="isSubmitted ? [rules.required] : []"
                :label="$t('viewAccount.name')"
                hide-details="auto"
                :disabled="GoogleUser"
                variant="outlined"
                density="comfortable"
                @input="filterInput"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                ref="phoneNumber"
                v-model="user.phoneNumber"
                :label="$t('viewAccount.phoneNumber')"
                outlined
                hide-details="auto"
                :disabled="GoogleUser"
                variant="outlined"
                density="comfortable"
                @input="filterInputNumberPhone"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" v-if="!GoogleUser">
              <v-text-field
                v-model="user.password"
                :label="$t('viewAccount.password')"
                outlined
                type="password"
                hide-details="auto"
                variant="outlined"
                density="comfortable"
                @input="filterInputPassword"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" v-if="!GoogleUser">
              <v-text-field
                v-model="user.confirmPassword"
                :label="$t('viewAccount.confirmPassword')"
                outlined
                type="password"
                hide-details="auto"
                variant="outlined"
                density="comfortable"
                @input="filterInputconfirmPassword"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn
                :loading="loading"
                color="primary"
                prepend-icon="mdi-content-save"
                @click="submitForm"
                :disabled="GoogleUser"
              >
                {{ $t('viewAccount.saveChanges') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "ViewAccount",
  data() {
    return {
      isSubmitted: false,
      isFormValid: false,
      rules: {
        required: (value) => !!value || this.$t('viewAccount.required'),
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters([
      "getUser",
      "getIsAuthenticated",
      "getIsGoogleUser",
      "getEmailVerified",
    ]),
    user() {
      return this.getUser;
    },
    auth() {
      return this.getIsAuthenticated;
    },
    GoogleUser() {
      return this.getIsGoogleUser;
    },
    emailVerified() {
      return this.getEmailVerified;
    },
  },
  watch: {
    // Redirect to login page if the user is not logged in
    user(newUser) {
      if (!newUser) {
        this.$router.push("/login");
      }
    },
  },
  beforeCreate() {
    // Fetch the user's data
    this.$store.dispatch("fetchUser");
  },
  methods: {

    // Update the user's data
    async submitForm() {
      this.isSubmitted = true;
      this.loading = true;

      // Validate the form
      if (this.user.displayName === "" || this.user.phoneNumber === "") {
        setTimeout(() => (this.loading = false), 2000);
        useToast().error(this.$t('viewAccount.allFieldsRequired'));
        return;
      }

      // Validate the password
      if (this.user.password && this.user.confirmPassword) {
        if (this.user.password.length < 6) {
          setTimeout(() => (this.loading = false), 2000);
          useToast().error(this.$t('viewAccount.passwordMinLength'));
          return;
        }

        if (this.user.password !== this.user.confirmPassword) {
          setTimeout(() => (this.loading = false), 2000);
          useToast().error(this.$t('viewAccount.passwordsDoNotMatch'));
          return;
        }
      }

      // Update the user's data
      try {

        // Update the user's password
        await this.$store.dispatch("updateUserPassword", {
          password: this.user.password
        });

        // Update the user's data
        await this.$store.dispatch("updateUserData", {
          displayName: this.user.displayName,
          phoneNumber: this.user.phoneNumber,
          uid: this.user.uid,
          email: this.user.email,
        });

        setTimeout(() => (this.loading = false), 2000);
      } catch (error) {
        setTimeout(() => (this.loading = false), 2000);
      }
    },

    // Send an email verification
    sendEmailVerification() {
      this.$store.dispatch("sendEmailVerification");
    },

    // Filter the input fields
    filterInputNumberPhone(event) {
      const value = event.target.value;
      event.target.value = value.replace(/[^0-9]/g, "").slice(0, 10);
    },

    // Filter the input fields
    filterInputPassword(event) {
      const value = event.target.value;
      event.target.value = value
        .replace(
          /[^a-zA-Z0-9@_.;:(){}\[\]!¡?¿=+*\/%$#&\\'`´~^_| !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
          ""
        )
        .slice(0, 25);
    },

    // Filter the input fields
    filterInputconfirmPassword(event) {
      const value = event.target.value;
      event.target.value = value
        .replace(
          /[^a-zA-Z0-9@_.;:(){}\[\]!¡?¿=+*\/%$#&\\'`´~^_| !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
          ""
        )
        .slice(0, 25);
    },

    // Filter the input fields
    filterInput(event) {
      const value = event.target.value;
      event.target.value = value.slice(0, 35);
      if (event.target.value.length > 35) {
        this.$refs.displayName.validate();
      }
    },
  },
};
</script>

<style scoped>
.container-my-account {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem;
}

.v-avatar {
  margin: 0 auto;
}

.v-avatar img {
  width: 100%;
  height: 100%;
}

.v-card {
  width: 100%;
}

.v-card-title {
  background-color: #f5f5f5;
}

.v-card-text {
  padding: 1rem;
}

.v-text-field {
  width: 100%;
}

.v-btn {
  margin-top: 0rem;
}

@media (min-width: 600px) {
  .container-my-account {
    max-width: 40rem;
    margin-block: 0rem;
    padding: 1.5rem;
  }
}

@media (min-width: 960px) {
  .container-my-account {
    max-width: 60rem;
    margin-block: 2rem;
    padding: 0rem;
  }
}

@media (min-width: 1264px) {
  .container-my-account {
    max-width: 80rem;
  }
}

@media (min-width: 1904px) {
  .container-my-account {
    max-width: 100rem;
  }
}

</style>
