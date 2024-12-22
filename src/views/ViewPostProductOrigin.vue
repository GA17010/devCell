<template>
  <v-row class="ViewContent ma-0">
    <v-col xl="4" lg="3" md="4" class="bg-white relative-col">
      <!-- <v-divider></v-divider> -->
      <v-row>
        <span class="text-h6 font-weight-bold">New Item for Sale</span>
        <div class="ViewForm__content">
          <v-form ref="form" v-model="isFormValid">
            <p class="text-small-emphasis">
              Photos · {{ photos.urls.length }}/8 - You can add a maximum of 8
              photos.
            </p>
            <!-- Agregar fotos o arrastrarlas y soltarlas -->
            <div v-if="photos.urls == 0" class="pb-5 px-1">
              <div
                :class="computedClass"
                class="drop-area file-upload-form"
                @dragenter.prevent="handleDragEnter"
                @dragover.prevent="handleDragOver"
                @dragleave.prevent="handleDragLeave"
                @drop.prevent="handleDrop"
              >
                <label
                  for="file"
                  class="file-upload-label"
                  :class="isDragOver ? 'opacity' : ''"
                >
                  <div class="file-upload-design">
                    <svg viewBox="0 0 640 512" height="1em">
                      <path
                        d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                      ></path>
                    </svg>
                    <p class="font-weight-bold">Add Photos</p>
                    <p class="text-medium-emphasis">or drag and drop them.</p>
                    <v-file-input
                      ref="urlsRef"
                      class="inputImage"
                      v-model="selectedFile"
                      @change="handleFileChange"
                      label="Add Photos"
                      multiple
                      accept="image/*"
                      show-size
                      chips
                      id="file"
                      variant="outlined"
                      :rules="[
                        () => !!photos.urls.length || 'Please add a photo',
                      ]"
                    ></v-file-input>
                  </div>
                  <!-- <v-file-input
                v-model="createArticle.image"
                id="file"
                type="file"
                multiple
                accept="image/*"
                /> -->
                </label>
                <span
                  :class="
                    !photoRequired ? 'photo-not-required' : 'photo-required'
                  "
                  >Required: At least one photo</span
                >
                <!-- Colocar este texto sobre el demas contenido con fondo opaco "Drop files here" -->
                <div v-if="isDragOver" class="drop-area-text">
                  Drop files here
                </div>
              </div>
            </div>
            <div
              v-else
              class="small-drop-area"
              :class="{ highlight: isDragOver }"
              @dragenter.prevent="handleDragEnter"
              @dragover.prevent="handleDragOver"
              @dragleave.prevent="handleDragLeave"
              @drop.prevent="handleDrop"
            >
              <v-row :class="isDragOver ? 'opacity' : ''">
                <div
                  class="image-container"
                  v-for="(image, index) in photos.urls"
                  :key="index"
                >
                  <img
                    class="smallImage"
                    :src="image"
                    :alt="'product ' + index"
                  />
                  <v-btn
                    class="delete-btn"
                    icon
                    small
                    @click="removeImage(index)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
                <div v-show="photos.urls.length < 8" class="uploadImageSmall">
                  <label for="file" class="file-upload-label-small">
                    <div class="file-upload-design-small">
                      <svg viewBox="0 0 640 512" height="1em">
                        <path
                          d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                        ></path>
                      </svg>
                      <p>Add Photos</p>
                    </div>
                    <v-file-input
                      ref="urlsRef"
                      v-model="selectedFile"
                      class="inputImage-small"
                      @change="handleFileChange"
                      label="Add Photos"
                      multiple
                      accept="image/*"
                      show-size
                      chips
                      id="file"
                      variant="outlined"
                      :rules="[
                        () => !!photos.urls.length || 'Please add a photo',
                      ]"
                    ></v-file-input>
                  </label>
                </div>
              </v-row>
              <div v-if="isDragOver" class="drop-area-text">
                Drop files here
              </div>
            </div>

            <v-text-field
              ref="titleRef"
              v-model="createArticle.title"
              :class="
                isSumbmitted && !createArticle.title
                  ? 'required'
                  : 'not-required'
              "
              :rules="isSumbmitted ? [rules.required] : []"
              label="Title"
              variant="outlined"
              required
              @input="capitalizeFirstLetterTitle"
            >
            </v-text-field>

            <v-text-field
              ref="priceRef"
              v-model="createArticle.price"
              :class="
                (isSumbmitted && !createArticle.price) ||
                isNaN(createArticle.price)
                  ? 'required'
                  : 'not-required'
              "
              :rules="isSumbmitted ? [rules.required, rules.price] : []"
              label="Price"
              variant="outlined"
              prefix="$"
              required
              @input="filterInput"
            ></v-text-field>
            <v-textarea
              ref="descriptionRef"
              v-model="createArticle.description"
              :class="
                isSumbmitted && !createArticle.description
                  ? 'required'
                  : 'not-required'
              "
              :rules="isSumbmitted ? [rules.required] : []"
              label="Product Description"
              variant="outlined"
              required
              @input="capitalizeFirstLetterDescription"
              rows="3"
              no-resize
            ></v-textarea>
            <v-text-field
              ref="modelRef"
              v-model="createArticle.model"
              :class="
                isSumbmitted && !createArticle.model
                  ? 'required'
                  : 'not-required'
              "
              :rules="isSumbmitted ? [rules.required] : []"
              label="Model"
              variant="outlined"
              required
              @input="capitalizeFirstLetterModel"
            ></v-text-field>

            <v-select
              v-for="(filter, index) in filters"
              :key="index"
              v-model="createArticle[filter.name.toLowerCase()]"
              :class="
                isSumbmitted && !createArticle[filter.name.toLowerCase()]
                  ? 'required'
                  : 'not-required'
              "
              :rules="isSumbmitted ? [rules.required] : []"
              :ref="filter.name.toLowerCase() + 'Ref' + index"
              :items="filter.options"
              :label="filter.name"
              variant="outlined"
              required
            ></v-select>
            <div class="container-button-postproduct">
              <!-- post product -->
              <v-btn :loading="loading" color="primary" @click="submitForm">
                Post Product
              </v-btn>
              <v-btn color="error" @click="() => $router.go(-1)">Cancel</v-btn>
            </div>
          </v-form>
        </div>
      </v-row>
    </v-col>

    <v-col cols="12" xl="" lg="" md="" sm="" class="d-none d-md-block pa-10">
      <v-row class="pa-0 ContentPreview bg-white">
        <v-row class="pt-1 pb-0 pl-4">
          <h4>View Preview</h4>
        </v-row>
        <v-row class="ma-4" style="border: 1px solid #ccc; border-radius: 10px">
          <v-col
            cols="12"
            md="6"
            sm="12"
            xs="12"
            class="pa-0"
            style="border-right: 1px solid #ccc"
          >
            <div class="container-imagePreview">
              <div
                v-if="photos.urls.length == 0"
                :class="photos.urls.length ? 'd-none' : 'text-h5'"
                style="
                  padding: 1rem;
                  height: 100%;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <v-row
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <span class="text-body-1"> Preview of your publication</span>
                  <span class="text-small-emphasis"
                    >The images will be displayed here.</span
                  >
                </v-row>
              </div>

              <CarouselArticle
                style="height: 400px; width: 100%"
                v-else
                :article="photos"
                :currentImageIndex.sync="currentImageIndex"
              />
            </div>
          </v-col>
          <v-col md="" sm="12" xs="12" class="pb-0">
            <v-row style="width: 100%; display: flex; flex-direction: column">
              <div style="width: 100%; display: flex; flex-direction: column">
                <FieldDisplay
                  style="width: 100%"
                  :value="createArticle.title"
                  :typeofField="'title'"
                  label="Title"
                />
                <FieldDisplay
                  style="width: 100%; display: flex"
                  :value="createArticle.price"
                  :typeofField="'price'"
                  :label="`Price`"
                  prefix="$ "
                />
                <FieldDisplay
                  style="width: 100%; display: flex"
                  :value="createArticle.description"
                  label="Description of the product"
                />
              </div>
              <div style="width: 100%; display: flex; flex-direction: column">
                <!-- <v-divider></v-divider> -->
                <v-row class="pt-2">
                  <span
                    :class="
                      getClass(
                        createArticle.model ||
                          createArticle.brand ||
                          createArticle.os ||
                          createArticle.ram ||
                          createArticle.storage,

                        'font-weight-bold'
                      )
                    "
                    style="
                      display: flex;
                      flex-direction: row;
                      padding-bottom: 0.4rem;
                      width: 100%;
                    "
                  >
                    Details
                  </span>
                  <FieldDisplay
                    style="width: 100%; display: flex; flex-direction: column"
                    :value="createArticle.model"
                    :label="`Model`"
                  />
                </v-row>
              </div>
              <v-row>
                <v-col class="py-0" cols="12" md="6" sm="12" xs="12">
                  <FieldDisplay :value="createArticle.brand" :label="`Brand`" />
                  <FieldDisplay :value="createArticle.os" :label="`System`" />
                </v-col>
                <v-col class="py-0" cols="12" md="6" sm="12" xs="12">
                  <FieldDisplay :value="createArticle.ram" :label="`RAM`" />
                  <FieldDisplay
                    :value="createArticle.storage"
                    :label="`Storage`"
                  />
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <!-- information of the seller -->
              <v-row
                class="pt-3"
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: start;
                  justify-content: center;
                  width: 100%;
                "
              >
                <span class="info-seller text-disabled">
                  Information of the seller</span
                >
                <div class="info-seller-item py-2" v-if="auth">
                  <img
                    v-if="user.photoURL"
                    :src="user.photoURL"
                    alt="User Photo"
                    class="user-photo mr-2"
                  />
                  <img
                    v-else
                    src="@/assets/user.png"
                    alt="User Photo"
                    class="user-photo mr-2"
                  />
                  <span class="text-disabled">{{ user.displayName }} </span>
                </div>
              </v-row>
            </v-row>
          </v-col>
        </v-row>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { ref } from "vue";
import ViewProduct from "./ViewProduct.vue";
import CarouselArticle from "@/components/CarouselArticle.vue";
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "@boot/database.js";
import { getStorage, ref as ref2, uploadBytes } from "firebase/storage";
import FieldDisplay from "@/components/FieldDisplay.vue";
import { useToast } from "vue-toastification";
import { mapGetters } from "vuex";
import Compressor from "compressorjs";

export default {
  name: "ViewPostProduct",
  components: {
    ViewProduct,
    CarouselArticle,
    FieldDisplay,
  },
  data() {
    return {
      loading: false,
      currentImageIndex: 0,
      dragCounter: 0,
      countImages: 0,
      idArticle: "",
      photoRequired: false,
      isFormValid: false,
      isSumbmitted: false,
      isDragOver: false,
      selectedFile: null,
      selectedImages: ref([]),
      createArticle: {
        seller: null,
        uid: null,
        title: null,
        date: new Date().toISOString().substr(0, 10),
        // phone: "",
        description: null,
        price: null,
        model: null,
        os: null,
        brand: null,
        ram: null,
        storage: null,
      },
      photos: {
        urls: [],
      },
      titleRef: ref(false),
      priceRef: ref(null),
      descriptionRef: ref(null),
      modelRef: ref(null),
      brandRef: ref(null),
      osRef: ref(null),
      colorRef: ref(null),
      ramRef: ref(null),
      storageRef: ref(null),
      urlsRef: false,

      rules: {
        required: (value) => !!value || "Required.",
        // requiredTitle: (value) => !!value || "Title is required",
        // price: (value) => {!isNaN(value) || "Price must be a number."},
      },
      filters: ref([]),
    };
  },
  computed: {
    ...mapGetters(["getUser", "getIsAuthenticated"]),
    user() {
      return this.getUser;
    },
    auth() {
      return this.getIsAuthenticated;
    },
    computedClass() {
      return {
        highlight: this.isDragOver,
        "drop-area-required": this.photoRequired,
      };
    },
  },
  beforeCreate() {
    // this.$store.dispatch("checkUser");
  },
  created() {
    this.$store.dispatch("allArticles");
    this.filters = this.$store.getters.getFilters;
    // this.user = {
    //   displayName: "User",
    //   email: "",
    //   phone: "",
    // };
  },
  mounted() {},
  watch: {
    "createArticle.title"(newVal) {
      this.updateValidation("titleRef", newVal);
    },
    "createArticle.price"(newVal) {
      this.updateValidation("priceRef", newVal);
    },
    "createArticle.description"(newVal) {
      this.updateValidation("descriptionRef", newVal);
    },
    "createArticle.model"(newVal) {
      this.updateValidation("modelRef", newVal);
    },
    "createArticle.brand"(newVal) {
      this.updateValidation("brandRef", newVal);
    },
    "createArticle.os"(newVal) {
      this.updateValidation("osRef", newVal);
    },
    "createArticle.color"(newVal) {
      this.updateValidation("colorRef", newVal);
    },
    "createArticle.ram"(newVal) {
      this.updateValidation("ramRef", newVal);
    },
    "createArticle.storage"(newVal) {
      this.updateValidation("storageRef", newVal);
    },
    // user(newUser) {
    //   if (!newUser) {
    //     this.$router.push("/login");
    //   } else {
    //     this.uid = newUser.uid;
    //   }
    // },
  },
  methods: {
    handleFileChange(e) {
      const toast = useToast();
      const newFiles = e.target.files || e.dataTransfer.files;
      const totalFilesAfterAdding =
        this.selectedImages.length + newFiles.length; // Total files after adding new files

      if (totalFilesAfterAdding > 8) {
        toast.error("You can only add a maximum of 8 images.");
        return;
      }
      const newFilesArray = Array.from(newFiles);

      this.selectedImages = [...this.selectedImages, ...newFilesArray];

      this.photos.urls = this.selectedImages.map((file) =>
        URL.createObjectURL(file)
      );
    },
    removeImage(index) {
      this.photos.urls.splice(index, 1);
      this.selectedImages.splice(index, 1);
      if (this.currentImageIndex <= this.photos.urls.length) {
        this.currentImageIndex = this.photos.urls.length - 1;
      }
    },
    handleDragEnter() {
      this.dragCounter++;
      this.isDragOver = true;
    },
    handleDragOver(e) {
      this.isDragOver = true;
      e.preventDefault();
    },
    handleDragLeave(e) {
      this.dragCounter--;
      if (this.dragCounter === 0) {
        this.isDragOver = false;
      }
      e.preventDefault();
    },
    handleDrop(e) {
      const toast = useToast();
      this.dragCounter = 0;
      this.isDragOver = false;
      e.preventDefault();
      const newFiles = e.dataTransfer.files;
      const totalFilesAfterAdding =
        this.selectedImages.length + newFiles.length; // Total files after adding new files

      if (totalFilesAfterAdding > 8) {
        toast.error("You can only add a maximum of 8 images.");
        return;
      }
      const newFilesArray = Array.from(newFiles);

      this.selectedImages = [...this.selectedImages, ...newFilesArray];

      this.photos.urls = this.selectedImages.map((file) =>
        URL.createObjectURL(file)
      );
    },
    updateValidation(refName, value) {
      if (this.$refs[refName]) {
        this.$refs[refName].validate();
      }
    },
    // submit the form
    submitForm() {
      this.loading = true;

      this.isSumbmitted = true;
      this.$refs.form.validate().then((valid) => {
        if (valid.valid) {
          this.addArticle();
        } else {
          setTimeout(() => (this.loading = false), 3000);

          this.$refs.urlsRef.validate().then((valid) => {
            if (valid) {
              this.photoRequired = true;
            }
          });
        }
      }).catch(() => {
        setTimeout(() => (this.loading = false), 3000);
      });
    },
    // methods to add a new article
    async addArticle() {
      this.createArticle.seller = this.user.displayName;
      this.createArticle.uid = this.user.uid;
      // console.log(this.createArticle);
      try {
        const docRef = await addDoc(collection(db, "articulos"), {
          ...this.createArticle,
        });
        // console.log("Document written with ID: ", docRef.id);
        this.idArticle = docRef.id;

        // add images to the article
        this.addImage();
      } catch (e) {
        this.loading = false;
      }
    },
    addImage() {
      const storage = getStorage();

      this.selectedImages.forEach((file) => {
        new Compressor(file, {
          quality: 0.4, // Ajusta la calidad de la compresión (0.6 es un buen punto de partida)
          success: (compressedFile) => {
            const storageRef = ref2(
              storage,
              this.idArticle + "/" + compressedFile.name
            );
            uploadBytes(storageRef, compressedFile).then((snapshot) => {
              this.countImages++;

              // add the url of the image to the article
              this.lastImage();
            });
          },
          error(err) {
            console.error(err.message);
          },
        });
      });
    },
    // add images to the article
    // addImage() {
    //   const storage = getStorage();

    //   this.selectedImages.forEach((file) => {
    //     const storageRef = ref2(storage, this.idArticle + "/" + file.name);
    //     uploadBytes(storageRef, file).then((snapshot) => {
    //       this.countImages++;

    //       // add the url of the image to the article
    //       this.lastImage();
    //     });
    //   });
    // },
    lastImage() {
      const toast = useToast();
      if (this.countImages == this.photos.urls.length) {
        // notify the user that the article was added
        this.$store.dispatch("allArticles");
        toast.success("The article was added successfully");
        this.$router.push("/product/" + this.idArticle);
      }
    },
    // get the class for the text
    getClass(value, baseClass) {
      return value
        ? `font-weight-bold ${baseClass}`
        : `text-disabled ${baseClass}`;
    },
    // filter the input to allow only numbers
    filterInput(event) {
      let value = event.target.value;
      let filteredValue = value
        .replace(/[^0-9]/g, "") // Permitir solo números y puntos
        .replace(/^0+(?!\.|$)/, ""); // Eliminar ceros a la izquierda

      // Limitar el número total de dígitos a 10
      if (filteredValue.length > 9) {
        filteredValue = filteredValue.slice(0, 9);
      }

      // agregar comas como separadores de miles
      filteredValue = filteredValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.createArticle.price = filteredValue;
    },
    // capitalize the first letter of each word
    capitalizeAndFilter(value) {
      return (
        value
          // Allow only letters, numbers and spaces
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .replace(/^\w/, (char) => char.toUpperCase())
      ); // Capitalize the first letter
    },
    // capitalize the first letter of the title
    capitalizeFirstLetterTitle(event) {
      // Allow a maximum of 40 characters
      let value = event.target.value;
      let filteredValue = value;

      if (filteredValue.length > 40) {
        filteredValue = filteredValue.slice(0, 40);
      }

      this.createArticle.title = this.capitalizeAndFilter(filteredValue);
    },
    // capitalize the first letter of the model
    capitalizeFirstLetterModel(event) {
      // Allow a maximum of 40 characters
      let value = event.target.value;
      let filteredValue = value;

      if (filteredValue.length > 40) {
        filteredValue = filteredValue.slice(0, 40);
      }

      this.createArticle.model = this.capitalizeAndFilter(filteredValue);
    },
    // capitalize the first letter of the description
    capitalizeFirstLetterDescription(event) {
      // Allow a maximum of 130 characters
      let value = event.target.value;
      let filteredValue = value;

      if (filteredValue.length > 130) {
        filteredValue = filteredValue.slice(0, 130);
      }
      // this.createArticle.description = filteredValue;

      this.createArticle.description = this.capitalizeAndFilter(filteredValue);
    },
  },
};
</script>

<style scoped>

.container-button-postproduct {
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
}

.photo-required {
  display: flex;
  color: red;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}

.photo-not-required {
  display: none;
}

.required {
  margin-bottom: 0.5rem;
}

.not-required .v-input__details {
  display: none;
}

.v-row {
  margin: 0;
  padding: 0;
  width: 100%;
}

.relative-col {
  border-right: 1px solid #ccc;
  position: relative;
  top: 0;
  min-height: calc(100vh - var(--navbar-height));
  overflow-y: auto;
  /* padding-right: 5px; */
  /* padding-left: 1rem; */
  padding-top: 1rem;
  /* padding: 0.2rem; */
}

@media (max-width: 960px) and (min-width: 600px) {
  .relative-col {
    height: 100%;
    overflow: visible;
  }
}

.ContentPreview {
  border: 1px solid #ccc;
  /* box-shadow: 0 0 2px rgba(0, 0, 0, 0.897); */
  border-radius: 10px;
  /* padding: 30rem; */
  /* padding: 0.5rem 1rem; */
  /* margin: 0; */
}

.ViewPreview__content {
  display: flex;
  flex-direction: row;
}

.container-imagePreview {
  /* padding: 2rem; */
  /* padding: 0rem 1rem 0rem 1rem; Añade padding dentro del div */
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 400px;
  width: auto;
}

.small-image-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0;
}

.ViewForm__content {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* gap: 1rem; */
  padding: 0.5rem;

  height: 80vh; /* 100% viewport height minus the height of the navbar */
  overflow-y: scroll;

  /* scrollbar-color: #15ee4b #e61010; */
  &::-webkit-scrollbar {
    width: 15px; /* Ancho de la barra de desplazamiento */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Color de fondo de la pista de la barra de desplazamiento */
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* Color de la barra de desplazamiento */
    border-radius: 15px; /* Bordes redondeados para la barra de desplazamiento */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Color de la barra de desplazamiento al pasar el mouse */
  }
  /* Personalización de la barra de desplazamiento para Firefox */
  scrollbar-width: thin; /* "auto" o "thin" */
  /* scrollbar-color: #35adfd #f1f1f1; */
}

.text-small-emphasis {
  color: rgb(161, 170, 170);
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}

/* --------------------------- Style for the file upload -----------------------*/
.drop-area {
  margin-bottom: 0.8rem;
  border: 1px solid #7ca5fc;
  border-radius: 10px;
  cursor: pointer;
  background-color: #ffffff;
  /* padding: 20px; */
  text-align: center;
  transition: background-color 0.3s ease;
}

.drop-area-required {
  border: 1px solid red;
}

.small-drop-area {
  margin-bottom: 0.7rem;
  border: 2px solid #7ca4fc00;
  border-radius: 10px;
  cursor: pointer;
  background-color: #ffffff;
  /* padding: 20px; */
  text-align: center;
  transition: background-color 0.3s ease;
}

.highlight {
  position: relative;
  border: 2px dashed #7ca5fc;
  background-color: #fdfdfdb7;
  opacity: 0.7;
  /* margin-left: -2px; */
  margin-bottom: 0.7rem;
}

.file-upload-form {
  /* width: fit-content;
  height: fit-content; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 0.5rem;
}

.file-upload-design .inputImage {
  display: none;
}

.file-upload-label svg {
  /* cursor: pointer; */
  height: 50px;
  fill: rgb(160, 190, 255);
  margin-top: 1rem;
}
/* .file-upload-label {
  cursor: pointer;
  background-color: #ddd;
  padding: 30px 70px;
  border-radius: 40px;
  border: 2px dashed rgb(82, 82, 82);
  box-shadow: 0px 0px 200px -50px rgba(0, 0, 0, 0.719);
} */
.file-upload-design {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* gap: 0px; */
  padding-bottom: 1rem;
}
.browse-button {
  background-color: #7ca5fc;
  padding: 5px 15px;
  border-radius: 10px;
  color: white;
  transition: all 0.3s;
}
.browse-button:hover {
  background-color: rgba(39, 63, 196, 0.726);
}

/* resaltar cuando tenga un archivo encima del drop area para soltar */

/* ------------------------------------------------------------------- */
.image-container {
  position: relative;
  display: inline-block; /* O flex, dependiendo de tu diseño */
  margin-right: 0; /* Ajusta el margen según sea necesario */
}

.smallImage {
  width: 100px;
  height: 100px;
  /* margin: 5px; */
  padding: 5px;
  border-radius: 10px;
  /* padding-bottom: 3px; */
}

.delete-btn {
  position: absolute;
  top: 0;
  right: 0;
  transform: scale(0.5);

  background-color: rgba(
    255,
    255,
    255,
    0.938
  ); /* Opcional: mejora la visibilidad del botón */
}

.delete-btn .v-icon {
  font-size: 2.2rem;
  /* Opcional: mejora la visibilidad del botón */
  background-color: rgba(255, 255, 255, 0.938);
  border-radius: 50%;
  padding: 0.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.uploadImageSmall {
  width: 100px;
  height: 100px;
  padding: 4px;
  /* margin-bottom: 0.5rem; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #ccc; */
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
}

.file-upload-label-small .inputImage-small {
  display: none;
}

.file-upload-label-small svg {
  height: 1.3rem;
  fill: rgb(100, 100, 100);
  /* margin-top: 5px; */
}

.file-upload-label-small {
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding-inline: 7px; */
  border-radius: 5px;
  /* border: 2px dashed rgb(82, 82, 82); */
  box-shadow: 0px 0px 200px -50px rgba(0, 0, 0, 0.719);
}

.file-upload-design-small {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
}

.file-upload-design-small p {
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
}

.browse-button-small {
  background-color: none;
  padding: 0px 0.7rem;
  margin-bottom: 4px;
  font-size: 0.7rem;
  border-radius: none;
  color: white;
  transition: all 0.3s;
}

.browse-button-small:hover {
  background-color: rgb(49, 49, 49);
}

.drop-area-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  color: #3673f8;
  font-weight: bold;
}

.opacity {
  opacity: 0.2;
}

/* ------------------------------------------------------------------- */

/* ________________________Information user________________________*/
div.info-seller-item {
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

div.info-seller-item img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  opacity: 0.5;
  cursor: context-menu;
}

div.info-seller-item span,
.info-seller {
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-text);
  text-decoration: none;

  cursor: context-menu;
}

/* -------------------------------------------------------- */
</style>
