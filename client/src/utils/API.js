import axios from "axios";

export default {
    // Creates a new user and saves to database
    saveUser: function (userData) {
        return axios.post("/signup", userData).then(function (res) { console.log(res); })
    },

    loginUser: function (userData) {
        return axios.post("/login", userData).then(function (res) { console.log(res); })
    }
}