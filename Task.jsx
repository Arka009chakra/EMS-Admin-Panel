import React, { useState } from 'react';

function Task() {
    const [task, setTask] = useState("");
    const [cemail, setCemail] = useState("");
    function test11(e) {
        e.preventDefault();
        fetch('http://localhost:5485/Task', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cemail:cemail,
                task: task

            })
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
        <div className="container-fluid">
            <div className="text-center">
                <h1>
                    <strong className="brand-name">ArkaTechnical</strong>
                </h1>
            </div>
            <div className="row">
                <div className="col-md-6 col-10 mx-auto">
                    <form onSubmit={test11}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Company Email address</label>
                            <input type="text" className="form-control" id="exampleInputEmail11" aria-describedby="emailHelp" onChange={(e) => setCemail(e.target.value)} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Task</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setTask(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-success">Assign Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Task;
