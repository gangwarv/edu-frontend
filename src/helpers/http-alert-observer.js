export default function (httpPromise, msg) {
    let self = this;
    self.loading = true;

    httpPromise.then(function () {
        self.loading = false;
        self.alertShow = true;
        self.alertTitle = 'Success';
        if(msg){
            if(msg === 'D')
            self.alertMessage = 'Record deleted successfully!'
            else
            self.alertMessage = msg;
            return;
        }
        self.alertMessage = 'Data saved successfully!';
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