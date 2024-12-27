<template>
  <div v-if="user" class="ViewContent">
    <v-row class="ma-0">
      <v-col xl="4" lg="3" md="4" class="bg-white relative-col">
        <!-- <v-divider></v-divider> -->
        <div class="fixed-col">
          <div class="container--post-product-a">
            <span class="text-h6 font-weight-bold">
              {{ $t("viewPostProduct.newItemForSale") }}
            </span>
          </div>
          <div class="container--post-product-b ViewForm__content">
            <v-form ref="form" v-model="isFormValid">
              <p class="text-small-emphasis">
                {{ $t("viewPostProduct.photos") }} · {{ photos.urls.length }}/8
                - {{ $t("viewPostProduct.canAddMaxPhotos") }}
              </p>
              <!-- Add photos or drag and drop -->
              <div v-if="photos.urls == 0" class="pb-5 px-1">
                <div
                  :class="computedClass"
                  class="drop-area file-upload-form"
                  @dragenter.prevent="handleDragEnter"
                  @dragover.prevent="handleDragOver"
                  @dragleave.prevent="handleDragLeave"
                  @drop.prevent="handleDrop"
                  @click="triggerFileInput"
                >
                  <label
                    for="file"
                    class="file-upload-label"
                    :class="isDragOver ? 'opacity' : ''"
                  >
                    <div class="file-upload-design" @click.stop>
                      <svg viewBox="0 0 640 512" height="1em">
                        <path
                          d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                        ></path>
                      </svg>
                      <p class="font-weight-bold">
                        {{ $t("viewPostProduct.addPhotos") }}
                      </p>
                      <p class="text-medium-emphasis">
                        {{ $t("viewPostProduct.orDragAndDrop") }}
                      </p>
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
                  </label>
                  <span
                    :class="
                      !photoRequired ? 'photo-not-required' : 'photo-required'
                    "
                  >
                    {{ $t("viewPostProduct.requiredAtLeastOnePhoto") }}
                  </span>
                  <div v-if="isDragOver" class="drop-area-text">
                    {{ $t("viewPostProduct.dropFilesHere") }}
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
                <v-row
                  :class="isDragOver ? 'opacity ma-0' : 'ma-0'"
                  no-grutters
                >
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
                        <p>{{ $t("viewPostProduct.addPhotos") }}</p>
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
                  {{ $t("viewPostProduct.dropFilesHere") }}
                </div>
              </div>

              <!-- Form fields -->
              <v-text-field
                ref="titleRef"
                v-model="createArticle.title"
                :class="
                  isSumbmitted && !createArticle.title
                    ? 'required'
                    : 'not-required'
                "
                :rules="isSumbmitted ? [rules.required] : []"
                :label="$t('viewPostProduct.title')"
                variant="outlined"
                required
                @input="capitalizeFirstLetterTitle"
              >
              </v-text-field>

              <v-text-field
                ref="priceRef"
                v-model="createArticle.price"
                :class="
                  isSumbmitted && !createArticle.price
                    ? 'required'
                    : 'not-required'
                "
                :rules="isSumbmitted ? [rules.required] : []"
                :label="$t('viewPostProduct.price')"
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
                :label="$t('viewPostProduct.productDescription')"
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
                :label="$t('viewPostProduct.model')"
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
            </v-form>
          </div>
          <div class="container--post-product-c container-button-postproduct">
            <v-btn :loading="loading" color="primary" @click="submitForm">
              {{ $t("viewPostProduct.postProduct") }}
            </v-btn>
          </div>
        </div>
      </v-col>

      <v-col
        cols="12"
        xl=""
        lg=""
        md=""
        sm=""
        class="d-none d-md-block px-7 py-8 relative-col"
      >
        <v-row
          no-gutters
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          "
        >
          <ViewpreviewProduct
            :photos="photos"
            :createArticle="createArticle"
            :user="user"
            :auth="auth"
          />
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref } from "vue";
import ViewProduct from "./ViewProduct.vue";
import CarouselArticle from "@/components/CarouselArticle.vue";
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "@boot/database.js";
import {
  getStorage,
  ref as ref2,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import FieldDisplay from "@/components/FieldDisplay.vue";
import { useToast } from "vue-toastification";
import { mapGetters } from "vuex";
import Compressor from "compressorjs";
import ViewpreviewProduct from "../components/ViewpreviewProduct.vue";

export default {
  name: "ViewPostProduct",
  components: {
    ViewProduct,
    CarouselArticle,
    FieldDisplay,
    ViewpreviewProduct,
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
    this.$store.dispatch("fetchUser");
  },
  created() {
    this.filters = this.$store.getters.getFilters;
    if (this.filters.length == 0) {
      this.$store.dispatch("fetchFilters");
    }
  },
  mounted() {
    this.filters = this.$store.getters.getFilters;
  },
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
    user(newUser) {
      if (!newUser) {
        this.$router.push("/login");
      }
    },
  },
  methods: {
    triggerFileInput() {
      this.$refs.urlsRef.$el.click();
    },
    handleFileChange(e) {
      const toast = useToast();
      const newFiles = e.target.files || e.dataTransfer.files;

      // Total files after adding new files
      const totalFilesAfterAdding =
        this.selectedImages.length + newFiles.length;

      if (totalFilesAfterAdding > 8) {
        toast.error(this.$t("viewPostProduct.youCanOnlyAddMaxImages"));
        return;
      }

      // Filter out non-image files
      const validFiles = Array.from(newFiles).filter((file) =>
        file.type.startsWith("image/")
      );

      if (validFiles.length !== newFiles.length) {
        toast.error(this.$t("viewPostProduct.onlyImagesAllowed"));
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
        toast.error(this.$t("viewPostProduct.youCanOnlyAddMaxImages"));
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
      this.$refs.form
        .validate()
        .then((valid) => {
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
        })
        .catch(() => {
          setTimeout(() => (this.loading = false), 3000);
        });
    },
    // methods to add a new article
    async addArticle() {
      this.createArticle.seller = this.user.displayName;
      this.createArticle.uid = this.user.uid;

      try {
        const docRef = await addDoc(collection(db, "articulos"), {
          ...this.createArticle,
        });

        this.idArticle = docRef.id;

        // add images to the article
        this.addImage();

        // Update the article with the URLs of the images
        await updateDoc(docRef, {
          urls: this.photos.urls,
        });
      } catch (e) {
        setTimeout(() => (this.loading = false), 4000);
      }
    },
    // add images to the article
    async addImage() {
      const toast = useToast();
      const storage = getStorage();
      const uploadPromises = this.selectedImages.map((file) => {
        return new Promise((resolve, reject) => {
          new Compressor(file, {
            quality: 0.4, // Adjust the compression quality
            success: async (compressedFile) => {
              const storageRef = ref2(
                storage,
                this.idArticle + "/" + compressedFile.name
              );

              try {
                await uploadBytes(storageRef, compressedFile);
                const url = await getDownloadURL(storageRef);
                this.photos.urls.push(url);
                resolve();
              } catch (error) {
                toast.error(this.$t("viewPostProduct.errorUploadingImages"));
                reject(error);
              }
            },
            error(err) {
              toast.error(this.$t("viewPostProduct.errorCompressingImages"));
              reject(err);
            },
          });
        });
      });

      try {
        await Promise.all(uploadPromises);
        toast.success(this.$t("viewPostProduct.articleAddedSuccessfully"));
        this.$router.push("/product/" + this.idArticle);
      } catch (error) {
        setTimeout(() => (this.loading = false), 3000);
        toast.error(this.$t("viewPostProduct.errorUploadingImages"));
      }
    },
    // filter the input to allow only numbers
    filterInput(event) {
      let value = event.target.value;
      let filteredValue = value
        .replace(/[^0-9]/g, "") // Allow only numbers
        .replace(/^0+(?!\.|$)/, ""); // Remove leading zeros

      // Limit the number of digits to 8
      if (filteredValue.length > 8) {
        filteredValue = filteredValue.slice(0, 8);
      }

      // Add a decimal point if there are more than two digits
      if (filteredValue.length > 2) {
        const integerPart = filteredValue.slice(0, -2); // All but the last two digits
        const decimalPart = filteredValue.slice(-2); // The last two digits

        // Format the integer part with commas
        const formattedInteger = integerPart.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );

        // Join the integer part with the decimal part
        filteredValue = `${formattedInteger}.${decimalPart}`;
      } else if (filteredValue.length === 2) {
        // If there are two digits, show as "0.XX"
        filteredValue = `0.${filteredValue}`;
      } else if (filteredValue.length === 1) {
        // If there is one digit, show as "0.0X"
        filteredValue = `0.0${filteredValue}`;
      }

      this.createArticle.price = filteredValue;
    },
    // capitalize the first letter of each word
    capitalizeAndFilter(value) {
      return value.replace(/^\w/, (char) => char.toUpperCase()); // Capitalize the first letter
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
      // Allow a maximum of 200 characters
      let value = event.target.value;
      let filteredValue = value;

      if (filteredValue.length > 200) {
        filteredValue = filteredValue.slice(0, 200);
      }
      // this.createArticle.description = filteredValue;

      this.createArticle.description = this.capitalizeAndFilter(filteredValue);
    },
  },
};
</script>

<style scoped>
.ViewContent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  /* height: calc(100vh - var(--navbar-height)); */
  /* padding: 1rem; */
}

.relative-col {
  border-right: 1px solid #ccc;
  position: relative;
  top: 0;
  height: 100%;
  width: 100%;
}

.fixed-col {
  position: static;
  top: 0;
  margin: 0;
  height: 100%;
}
.container--post-product-a {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-block: 0.5rem;
}
.container--post-product-c {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
  padding-inline: 0.5rem;
}

.container--post-product-b {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
}
@media (min-width: 960px) {
  .ViewContent {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: calc(100vh - var(--navbar-height));
    /* padding: 1rem; */
  }
  .container--post-product-b {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;

    height: calc(80vh - 8vh);
    overflow-y: scroll;

    scrollbar-width: thin;
  }

  .container--post-product-c {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
  }
}

@media (max-width: 960px) and (min-width: 600px) {
  .relative-col {
    height: 100%;
    overflow: visible;
  }
}

.ContentPreview {
  border-radius: 10px;
  border: 1px solid #ccc;
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
  width: 95px;
  height: 95px;
  padding: 5px;
  border-radius: 10px;
  object-fit: cover;
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
  width: 95px;
  height: 95px;
  padding: 4px;
  /* margin-bottom: 0.5rem; */
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
