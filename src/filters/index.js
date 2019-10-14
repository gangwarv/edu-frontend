
export default [
    function isodate(date) {
        return date.toISOString()
    },
    function date(date) {
        return date.toDateString()
    },
    function string(data) {
        if (typeof data == 'boolean')
            return data ? 'Yes' : 'No';

        return data.toString()
    },
    function json(data) {
        try {
            return JSON.stringify(data)
        }
        catch (err) {
            return err.message
        }
    },
    // function lowercase(data) {
    //     if (data)
    //         return data.toLowerCase()
    //     else
    //         return '';
    // },
    function uppercase(data) {
        if (data)
            return data.toUpperCase()
        else
            return '';
    },
    // function dtcolumn(data, args){
    //     console.log(data,args)
    //     return data;
    // }
];