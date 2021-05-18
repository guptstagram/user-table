import React from "react";
import { fetchUsers } from "../apis/fetchUsers";

// Exporting the user list context
export const UserListContext = React.createContext();

// Creating a provider with user list array
export const UserListProvider = props => {

    //Creating an empty state for user list
    const [users, setUsers] = React.useState([]);

    // Making API call to fetch users when the app mounts
    React.useEffect(() => {
        fetchUsers().then(userList => setUsers(userList));
    }, [])

    return (
        <UserListContext.Provider value={users}>
            {props.children}
        </UserListContext.Provider>
    )
}