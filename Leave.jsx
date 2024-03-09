import React, { useState, useEffect } from 'react';
import p1 from './p1.png';

function Leave() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5485/leave', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(err => console.log(err));
    }, []);

    function del(id)
    {
        fetch(`http://localhost:5485/delete/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data=>console.log(data))
        .catch(err => console.log(err));
         
    }
    function test212(id)
    {
        fetch(`http://localhost:5485/approve/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            alert(data.message);
        })
        .catch(function() {
            alert("Something Went Wrong!!");
        });
    }
    return (
        <div className="container-fluid nav-bg">
            <div className="row">
                <div className="col-10 mx-auto pt-5">
                    <div className="row">
                        <div className="col-lg-6 my-6 d-flex justify-content-center flex-column order-lg-1 order-2"> {/* Modified */}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Email</th>
                                        <th scope="col">From</th>
                                        <th scope="col">To</th>
                                        <th scope="col">Actions</th> {/* Added a new column for buttons */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.cemail}</td>
                                            <td>{user.startDate}</td>
                                            <td>{user.endDate}</td>
                                            <td>
                                                <button type="submit" className="btn btn-success" style={{ width: '100px', height: '40px' }} onClick={() => test212(user.cemail)}>
                                                    Approve
                                                </button>
                                                </td>   
                                                <td> 
                                                <button type="submit" className="btn btn-danger" style={{ marginLeft: '10px', width: '100px', height: '40px' }} onClick={() => del(user.cemail)}>
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-6 order-lg-2 order-1"> {/* Modified */}
                            <img src={p1} className="img-fluid animated-image with-margin-top" alt="home-img" />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leave;
