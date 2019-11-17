export default function (obj) {
    Object.keys(obj).forEach(function (key) {
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
                obj[key] = '';
        }
    });
    return { ...obj };
}