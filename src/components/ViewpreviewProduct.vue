<template>
  
  <!-- Display the product information -->
  <div class="container-viewpreview-product bg-white">
    <v-row class="container-viewpreview-product-a" no-gutters>
      <h4>{{ $t("viewPreviewProduct.viewPreview") }}</h4>
    </v-row>

    <!-- Display the product images and information -->
    <v-row class="container-viewpreview-product-b" no-gutters>

      <!-- Display the images of the product -->
      <v-col cols="12" md="7" style="border-right: 1px solid #ccc">
        <div class="container-imagePreview">
      
          <!-- Display the images of the product -->
          <div
            v-if="photos.urls.length == 0"
            class="text-h5"
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
              <span class="text-body-1">{{
                $t("viewPreviewProduct.previewPublication")
              }}</span>
              <span class="text-small-emphasis">{{
                $t("viewPreviewProduct.imagesDisplayedHere")
              }}</span>
            </v-row>
          </div>

          <!-- Display the images of the product -->
          <CarouselArticle
            v-else
            style="height: 100%; width: 100%; border-radius: 10px 0px 0px 10px"
            :article="photos"
            :currentImageIndex.sync="currentImageIndex"
          />
        </div>
      </v-col>

      <!-- Display the information of the product -->
      <v-col
        md="5"
        sm="12"
        xs="12"
        class="ma-0 pa-4 container-text-viewpreview"
      >
        <FieldDisplay
          :value="createArticle.title"
          :typeofField="'title'"
          :label="$t('viewPreviewProduct.title')"
        />
        <FieldDisplay
          :value="createArticle.price"
          :typeofField="'price'"
          :label="$t('viewPreviewProduct.price')"
          prefix="$ "
        />
        <FieldDisplay
          :value="createArticle.description"
          :label="$t('viewPreviewProduct.description')"
        />

        <!-- Display the product details -->
        <div style="width: 100%; display: flex; flex-direction: column">
          <v-row class="ma-0 pa-0" no-gutters>
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
            >
              {{ $t("viewPreviewProduct.details") }}
            </span>
            <FieldDisplay
              style="width: 100%; display: flex; flex-direction: column"
              :value="createArticle.model"
              :label="$t('viewPreviewProduct.model')"
            />
          </v-row>
        </div>

        <!-- Display the product specifications -->
        <v-row
          class="ma-0 px-4"
          no-gutters
          style="display: flex; justify-content: center; align-items: center"
        >
          <v-col class="ma-0 pa-0" cols="12" md="6" sm="12" xs="12">
            <FieldDisplay
              :value="createArticle.brand"
              :label="$t('viewPreviewProduct.brand')"
            />
            <FieldDisplay
              :value="createArticle.os"
              :label="$t('viewPreviewProduct.system')"
            />
          </v-col>
          <v-col class="ma-0 pa-0" cols="12" md="6" sm="12" xs="12">
            <FieldDisplay
              :value="createArticle.ram"
              :label="$t('viewPreviewProduct.ram')"
            />
            <FieldDisplay
              :value="createArticle.storage"
              :label="$t('viewPreviewProduct.storage')"
            />
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <!-- Display the seller information -->
        <v-row
          class="pt-3"
          style="
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
            width: 100%;
          "
          no-gutters
        >
          <span class="info-seller text-disabled">{{
            $t("viewPreviewProduct.sellerInfo")
          }}</span>
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CarouselArticle from "@/components/CarouselArticle.vue";
import FieldDisplay from "@/components/FieldDisplay.vue";

export default {
  name: "ViewpreviewProduct",
  components: {
    CarouselArticle,
    FieldDisplay,
  },
  props: {
    createArticle: {
      type: Object,
      required: false,
    },
    photos: {
      type: Object,
      required: false,
    },
    auth: {
      type: Boolean,
      required: false,
    },
    user: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      currentImageIndex: 0,
    };
  },
  methods: {
    // Get the class for the text
    getClass(value, baseClass) {
      return value
        ? `font-weight-bold ${baseClass}`
        : `text-medium-emphasis ${baseClass}`;
    },
  },
};
</script>

<style scoped>
.container-viewpreview-product {
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 972px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 1rem;
}

.container-viewpreview-product-a {
  width: 100%;
}

.container-viewpreview-product-b {
  border: 1px solid #ccc;
  border-radius: 11px;
  height: calc(100vh - 11.58rem);

  position: relative;
}

.container-imagePreview {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 11.7rem);
}

.text-small-emphasis {
  color: rgb(161, 170, 170);
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}

.text-disabled {
  font-size: 0.8rem;
  font-weight: 400;
}

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
/* ____________________________________________________________________ */

.container-text-viewpreview {
  height: 100%;
  scrollbar-width: thin;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
