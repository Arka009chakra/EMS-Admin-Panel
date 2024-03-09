import React, { useEffect, useState } from 'react';

function Update() {
    const [cemail, setCemail] = useState("");
    const [role, setRole] = useState("");
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
            setFilteredSuggestions(data); // Initially set filtered suggestions to all suggestions
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    }

    function test1(e) {
        e.preventDefault();
        fetch('http://localhost:5485/update', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cemail: cemail,
                role: role
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
    }

    function handleInputChange(e) {
        const inputValue = e.target.value;
        setCemail(inputValue);
        const filtered = suggestions.filter(item => item.cemail.toLowerCase().startsWith(inputValue.toLowerCase()));
        setFilteredSuggestions(filtered);
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
                    <form onSubmit={test1}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Company Email address</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp" 
                                onChange={handleInputChange} 
                                value={cemail} 
                                list="suggestions"
                            />
                            <datalist id="suggestions">
                                {filteredSuggestions.map((item, index) => (
                                    <option key={index} value={item.cemail} />
                                ))}
                            </datalist>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Role</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="exampleInputPassword3" 
                                onChange={(e) => setRole(e.target.value)} 
                                value={role} 
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Update;
