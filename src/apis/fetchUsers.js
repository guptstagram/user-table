import axios from "axios";

// API Call for fetching users
export const fetchUsers = async () => {
    let userList = [];
    await axios.get("https://intense-tor-76305.herokuapp.com/merchants").then(res => userList = res.data);
    return userList;
}