import React from "react"
import Routes from "./routes"
import { isAuthenticated, getToken } from "./auth"


const App = () => {
    let resp = verify();
    console.log(resp)
    return <Routes auth={resp}/>;
}

const verify = async () => {
    let resp = await isAuthenticated();
    return resp;
}

export default App;