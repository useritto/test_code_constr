import Api from "/services/api";

export default function ({ $axios }, inject) {
  inject('api', Api($axios));
}
