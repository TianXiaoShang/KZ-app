let BASE_URL = "";
let ASSETS_BASE_URL = '';
if (process.env.NODE_ENV === "development") {
    BASE_URL = "https://www.ccandnn.top/act-api";
    ASSETS_BASE_URL = ''
} else {
    BASE_URL = "https://www.ccandnn.top/act-api";
    ASSETS_BASE_URL = 'PRO'
}

export {
    ASSETS_BASE_URL,
    BASE_URL
};