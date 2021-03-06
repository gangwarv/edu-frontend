// import { DialogProgrammatic as Dialog } from "buefy";
import store from '../store'

export default {
  install(Vue) {
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
    Vue.prototype.$mutate = function(options) {
      let self = this;
      self.loading = true;

      let { message, updateQuery, ...option } = options;
      message =
        message === "d" //|| message === "D"
          ? "Record deleted successfully!"
          : message == null
          ? "Data saved successfully!"
          : message;

      if (updateQuery) option.update = customUpdate(updateQuery);

      return this.$apollo
        .mutate(option)
        .then(function(res) {
          self.loading = false;
          alert(message);
          // console.log(res.data[Object.keys(res.data)[0]])
          return res.data[Object.keys(res.data)[0]];
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

    Vue.prototype.$hasRole = hasRole
  },
};

function customUpdate(query) {
  return function(store, { data }) {
    const deletedObjKey = Object.keys(data)[0];
    const id = data[deletedObjKey].id;
    data = store.readQuery({ query });
    const collectionArrayKey = Object.keys(data);
    data[collectionArrayKey] = data[collectionArrayKey].filter(
      (x) => x.id !== id
    );
    store.writeQuery({ query, data });
  };
}
function hasRole(role){
  return store.state.auth && store.state.auth.data.privileges.includes(role)
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
