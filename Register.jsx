import React, { useEffect, useState } from 'react';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const [role, setRole] = useState("");
    const [cemail, setCemail] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    useEffect(() => {
        fetchSuggestions();
    }, []);

    async function fetchSuggestions() {
        try {
            const response = await fetch('http://localhost:5485/yo', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    }

    function test(e) {
        e.preventDefault();
        fetch('http://localhost:5485/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                cemail:cemail,
                psw: psw,
                role:role
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            alert(data.message);
        })
        .catch(function() {
            alert("Check Your Credentials!!");
        });

        fetch('http://localhost:5485/mail', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                cemail:cemail,
                psw: psw,
                role:role
            })
        })
        .then (function(response) {
            return response.json();
        })
        .then(function(data) {
            alert(data.message);
        })
        .catch(function() {
            alert("Check Your Credentials!!");
        });
    }

    return (
        <div className="container-fluid">
            <div className="text-center">
                <h1>
                    <strong className="brand-name">ArkaTechnical</strong>
                </h1>
            </div>
            <div className="row">
                <div className="col-md-6 col-10 mx-auto">
                    <form onSubmit={test}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Company Email address</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="exampleInputEmail11" 
                                aria-describedby="emailHelp" 
                                onChange={(e) => setCemail(e.target.value)} 
                                list="suggestions"
                            />
                            <datalist id="suggestions">
                                {suggestions.map((item, index) => (
                                    <option key={index} value={item.cemail} />
                                ))}
                            </datalist>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword2" onChange={(e) => setPsw(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Role</label>
                            <input type="text" className="form-control" id="exampleInputPassword3" onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
