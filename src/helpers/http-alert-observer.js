export default function (httpPromise) {
    let self = this;
    self.loading = true;

    httpPromise.then(function () {
        self.loading = false;
        self.alertShow = true;
        self.alertTitle = 'Success';
        self.alertMessage = 'Data saved successfully';
    })
        .catch(function (err) {
            self.loading = false;
            self.alertShow = true;
            self.alertTitle = 'Failed';
            try {
                self.alertMessage = err.networkError.result.errors[0].message;
            } catch (error) {
                self.alertTitle = err.message.split(':')[0];
                self.alertMessage = err.message.split(':')[1];
            }
            
        })
}