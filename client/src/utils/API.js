import axios from "axios";

export default {
    // Creates a new user and saves to database
    saveUser: function(userData) {
        return axios.post("/api/user", userData);
    }
}