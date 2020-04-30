// import { DialogProgrammatic as Dialog } from "buefy";

export default {
  install(Vue) {
    Vue.prototype.$observe = function(httpPromise, msg) {
      let self = this;
      self.loading = true;
      let message =
        msg === "D"
          ? "Record deleted successfully!" :
          msg == null ? "Data saved successfully!" : msg;
      return httpPromise
        .then(function(res) {
          self.loading = false;

          // Dialog.alert({
          //   type: "is-primary",
          //   title: 'Success',
          //   hasIcon: true,
          //   icon: "check-circle",
          //   iconPack: "fas",
          //   message,
          // });
          alert(message)
          return res;
        })
        .catch(function(err) {
          self.loading = false;
          let message = "";
          try {
            message = err.networkError.result.errors[0].message;
          } catch (error) {
            message = err.message.split(":")[0];
            message += ": ";
            message += err.message.split(":")[1];
          }

          // Dialog.alert({
          //   type: "is-danger",
          //   title:"Failed",
          //   hasIcon: true,
          //   icon: "times-circle",
          //   iconPack: "fas",
          //   message,
          // });
          alert(message)
        });
    };

    Vue.prototype.$clear = function(obj) {
      //   const obj = { ...object };
      Object.keys(obj).forEach(function(key) {
        switch (typeof obj[key]) {
          case "boolean":
            obj[key] = key === "isActive" ? true : false;
            break;
          case "number":
            obj[key] = 0;
            break;
          case "object":
            if (Array.isArray(obj[key])) obj[key] = [];
            else obj[key] = null;
            break;
          default:
            obj[key] = "";
        }
      });
      return obj;
    };
  },
};
