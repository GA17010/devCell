<template>
  <!-- Card with the language options -->
  <div class="card">
    <ul class="list">
      <li
        :class="this.$i18n.locale === 'en' ? 'element selectedItem' : 'element'"
        @click="changeLanguage('en')"
      >
        <p class="label">English</p>
      </li>
      <div class="separator"></div>
      <li
        :class="this.$i18n.locale === 'es' ? 'element selectedItem' : 'element'"
        @click="changeLanguage('es')"
      >
        <p class="label">Español</p>
      </li>
      <div class="separator"></div>
      <li
        :class="this.$i18n.locale === 'ja' ? 'element selectedItem' : 'element'"
        @click="changeLanguage('ja')"
      >
        <p class="label">日本語</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    // Change the language of the app
    changeLanguage(language) {
      this.$i18n.locale = language;
      localStorage.setItem("language", language);
    },
  },
};
</script>

<style scoped>
.card {
  width: 100px;
  background-color: #ade8f4;
  background-image: linear-gradient(
    139deg,
    #ade8f4 0%,
    #ade8f4 0%,
    #ade8f4 100%
  );

  border-radius: 10px;
  padding: 15px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card .separator {
  border-top: 1.5px solid #42434a;
}

.card .list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0px 10px;
}

.card .list .element {
  display: flex;
  align-items: center;
  transition: all 0.3s ease-out;
  padding: 2px 6px;
  border-radius: 6px;
  cursor: pointer;
}

.card .list .element svg {
  width: 19px;
  height: 19px;
  transition: all 0.3s ease-out;
  fill: #0077b6;
}

.card .list .element .label {
  font-weight: 600;
  font-size: small;
}

.card .list .element:hover {
  background-color: #0077b6;
  color: #ffffff;
  transform: translate(1px, -1px);
}

.selectedItem {
  background-color: #0076b6;
  color: #ffffff;
}

.card .list .delete:hover {
  background-color: #8e2a2a;
}

.card .list .element:active {
  transform: scale(0.99);
}

.card .list:not(:last-child) .element:hover svg {
  stroke: #ffffff;
}

.card .list:last-child .element:hover {
  color: #ffffff;
}
.card .list:last-child .element:hover svg {
  fill: #ffffff;
}

.card .list:last-child .element:hover {
  background-color: #023e8a;
}
</style>
