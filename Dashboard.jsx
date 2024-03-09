import React, { useState, useEffect } from 'react';
import p1 from './p1.png';

function Dashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5485/getdata', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(err => console.log(err));
    }, []);

    return (
        <div className="container-fluid nav-bg">
            <div className="row">
                <div className="col-10 mx-auto pt-5">
                    <div className="row">
                        <div className="col-lg-6 my-6 d-flex justify-content-center flex-column order-1">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.cemail}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-6">
                            <img src={p1} className="img-fluid animated-image with-margin-top" alt="home-img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
