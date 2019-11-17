export default function (httpPromise, msg) {
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


//
// httpPromise.then(function () {
//     self.loading = false;
//     self.alertShow = true;
//     self.alertTitle = 'Success';
//     if(msg){
//         if(msg === 'D')
//         self.alertMessage = 'Record deleted successfully!'
//         else
//         self.alertMessage = msg;
//         return;
//     }
//     self.alertMessage = 'Data saved successfully!';
// })
//     .catch(function (err) {
//         self.loading = false;
//         self.alertShow = true;
//         self.alertTitle = 'Failed';

//         try {
//             self.alertMessage = err.networkError.result.errors[0].message;
//         } catch (error) {
//             self.alertTitle = err.message.split(':')[0];
//             self.alertMessage = err.message.split(':')[1];
//         }

//     })