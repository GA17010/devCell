<template>

<!-- Filter section -->
  <div class="container-filter">

    <!-- Title for the filter section -->
    <div class="title-filter">
      <span>{{ $t("viewHome.filterBy") }}</span>
    </div>

    <!-- Filters for the article -->
    <div v-for="(filter, index) in filters" :key="index" class="form-check">
      <div class="form-title-category">
        <span class="filter-types">
          {{ filter.name }}
        </span>
      </div>
      <div class="form-check">
        <ul class="list-group">
          <li
            v-for="(option, optionIndex) in filter.options"
            :key="optionIndex"
            class="list-group-item"
          >
            <input
              class="form-check input"
              type="checkbox"
              :value="option"
              :id="`checkbox-${filter.nameFilter}-${optionIndex}`"
              @change="handleCheckboxChange(filter.nameFilter, option, $event)"
            />
            <label
              class="form-check-label"
              :for="`checkbox-${filter.nameFilter}-${optionIndex}`"
            >
              {{ option }}
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterArticle",
  props: {
    filters: Array,
  },
  methods: {
    // Emit an event when a checkbox is checked or unchecked
    handleCheckboxChange(filterName, option, event) {
      this.$emit("filter-changed", {
        filterName,
        option,
        checked: event.target.checked,
      });
    },
  },
  unmounted() {
    // Reset the filters when the component is unmounted
    this.$emit("reset-filters");
  }
};
</script>

<style scoped>
.container-filter {
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  position: relative;
  margin-left: 1rem;
  padding-left: 1rem;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
}

/* --------------------- toogle, new or used --------------------- */
.form-title-new {
  display: flex;
  align-items: center;
  text-align: center;
  place-content: center;
}

.checkbox-apple {
  position: relative;
  width: 1rem;
  height: 25px;
  margin: 9px 2rem 0 1rem;
  user-select: none;
}

.checkbox-apple input[type="checkbox"] {
  display: none;
}

.checkbox-apple label {
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
  height: 20px;
  border-radius: 50px;
  background: linear-gradient(to bottom, #b3b3b3, #e6e6e6);
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkbox-apple label:after {
  content: "";
  position: absolute;
  top: 1.2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.checkbox-apple input[type="checkbox"]:checked + label {
  background: linear-gradient(to bottom, #4c89d9, #4e82e2);
}

.checkbox-apple input[type="checkbox"]:checked + label:after {
  transform: translateX(23px);
}

.checkbox-apple label:hover {
  background: linear-gradient(to bottom, #b3b3b3, #e6e6e6);
}

.checkbox-apple label:hover:after {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.yep {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 15px;
}

/* --------------------------------------------------------------------------------- */

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-inline: 0.5rem;
}

ul li {
  padding-left: 0.6rem;
  margin-inline: 1rem;
  padding-block: 0.1rem;
  display: flex;
  align-items: center;
}

ul li input {
  margin-right: 0.2rem;
  transform: scale(0.9);
}

.form-check-label {
  margin-inline: 0.5rem;
  font-size: 0.9rem;
  color: #000;
}

.title-new {
  margin: 0;
  padding: 0;
  font-size: 0.93rem;
  font-weight: 500;
}

.form-title-category {
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  margin-inline: 1rem;
  margin-bottom: 0.3rem;
}

.title-filter {
  font-size: 1.1rem;
  font-weight: 500;
  color: #000;
  margin-inline: 1rem;
  margin-bottom: 0.5rem;
}

@media screen and (max-width: 768px) {
  .container-filter {
    display: none;
  }
}
</style>
