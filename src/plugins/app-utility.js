// import { DialogProgrammatic as Dialog } from "buefy";

export default {
  install(Vue) {
    Vue.prototype.$observe = function(httpPromise, msg = "") {
      let self = this;
      self.loading = true;
      let message =
        msg.toLowerCase() === "delete" || msg === "D"
          ? "Record deleted successfully!"
          : msg == ""
          ? "Data saved successfully!"
          : msg;

      return httpPromise
        .then(function(res) {
          self.loading = false;
          alert(message);
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

          alert(message);
        });
    };

    Vue.prototype.$clear = function(obj) {
      //   const obj = { ...object };
      // console.log('apollo in plugin',this.$apollo.mutate)
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

    // new mutate
    Vue.prototype.$mutate = function(options, msg = "") {
      let self = this;
      self.loading = true;
      let message =
        msg.toLowerCase() === "delete" || msg === "D"
          ? "Record deleted successfully!"
          : msg == ""
          ? "Data saved successfully!"
          : msg;
      if (options.update)
      options.update = customUpdate(options.update)

        return this.$apollo
          .mutate(options)
          .then(function(res) {
            self.loading = false;
            alert(message);
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

            alert(message);
          });
    };
  },
};

function customUpdate(query) {
  return function(store, { data }) {
    console.log("plugin");
    const deletedObjKey = Object.keys(data)[0];
    console.log("deletedobj", data);
    const id = data[deletedObjKey].id;
    data = store.readQuery({ query });
    const collectionArrayKey = Object.keys(data);
    console.log("collection", data);
    data[collectionArrayKey] = data[collectionArrayKey].filter(
      (x) => x.id !== id
    );
    store.writeQuery({ query, data });
  };
}
/*
          // Dialog.alert({
          //   type: "is-primary",
          //   title: 'Success',
          //   hasIcon: true,
          //   icon: "check-circle",
          //   iconPack: "fas",
          //   message,
          // });

          // Dialog.alert({
          //   type: "is-danger",
          //   title:"Failed",
          //   hasIcon: true,
          //   icon: "times-circle",
          //   iconPack: "fas",
          //   message,
          // });

*/
