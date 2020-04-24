export default {
  install(Vue) {
    Vue.prototype.$observe = function (httpPromise, msg) {
        let self = this;
        self.loading = true;
        let message = msg === 'D' ? 'Record deleted successfully!' : 'Data saved successfully!'
        return httpPromise.then(function (res) {
            self.loading = false;
            self.$buefy.toast.open({
                message,
                type: 'is-success'
            });
            return res;
        })
            .catch(function (err) {
                self.loading = false;
                let msg = '';
                try {
                    msg = err.networkError.result.errors[0].message;
                } catch (error) {
                    msg = err.message.split(':')[0];
                    msg += ': '
                    msg += err.message.split(':')[1];
                }
    
                self.$buefy.toast.open({
                    message: msg,
                    type: 'is-danger'
                });
            })
    }

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
