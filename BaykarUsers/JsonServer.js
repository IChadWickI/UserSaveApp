import React, { useEffect, useState } from "react";
import axios from "axios";

function JsonServer() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // json-server'ın çalıştığı URL'i buraya ekleyin
        const apiUrl = "http://localhost:8080/users";

        axios.get(apiUrl)
            .then(response => {
                setUsers(response.data.users);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <strong>Name:</strong> {user.fullname}<br />
                        <strong>Phone:</strong> {user.phone}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JsonServer;
