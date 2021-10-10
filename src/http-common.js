import axios from "axios";

export default axios.create({
    baseURL: "http://okto.pw:8742/",
    headers: {
        "Content-type": "application/json"
    }
});
