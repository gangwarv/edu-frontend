import Vue from "vue";

import "buefy/dist/buefy.css";
import "../global.scss";

import Buefy from "buefy";
import appUtility from "./app-utility";

import filters from "../filters";
import controls from "@/components/controls";
import sharedComponents from "@/components/shared";
import { ValidationProvider, ValidationObserver } from "vee-validate";
// import VeeValidate from 'vee-validate'///dist/vee-validate.full'// 'vee-validate';

// Vue.use(VeeValidate);
import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
// const rules = { required, min, max, min_value, max_value };

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

Vue.use(appUtility);

Vue.use(Buefy);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

sharedComponents.forEach((cmp) => Vue.component(cmp.name, cmp));

filters.forEach((filter) => Vue.filter(filter.name, filter));

controls.forEach((element) => {
  Vue.component(element.name, element);
});
