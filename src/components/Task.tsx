import axios from "axios";
import React, { useState } from "react";

interface Output {
    name: string,
    html_url: string
    description: string
}

const Task: React.FC = () => {

    const [username, setUserName] = useState("")
    const [newData, setNewData] = useState<Output[]>([])

    const search = () => {
        axios.get(`https://api.github.com/users/${username}/repos`)
            .then((res) => {
                console.log(res.data);
                setNewData(res.data)
                setUserName("");


            })
            .catch(() => {
                alert("Invalide username");
                setUserName("");
            });

    }

    return (

        <>
            <div className="text-center">


                <h1>GitHub Profile Clone</h1>
                <input type="text" onChange={(e) => setUserName(e.target.value)} value={username} placeholder='Enter GitHub username'
                />
                <br />

                <button className="btn btn-primary btn-sm" onClick={search}>Search</button>
            </div>


            <br />
            <div className='container'>
                <div className="row">
                    {
                        newData.length > 0 && newData.map((eachdata) => (
                            <div className="col-lg-4">


                                <div className="card">

                                    <div className="card-body">
                                        <h5 className="card-title"><span className="text-decoration-underline">Name of Repository:</span> <b>{eachdata.name}</b></h5>
                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title"><span className="text-decoration-underline">Description:</span> <b>{eachdata.description}</b></h5>
                                    </div>
                                    <div className="card-body">
                                        <a href={eachdata.html_url} className="card-link">View on GitHub</a>
                                    </div>
                                </div>
                            </div>

                        ))}
                </div>
            </div>



        </>

    )
}


export default Task;