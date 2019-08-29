import * as React from 'react';
import "@babel/polyfill";
import {
    callService,
    Environment,
    Middleware,
    Route,
    Service,
    IsomorphicApp
} from "infrastructure-components";

const SERVICE_ID = "myservice";

async function callMyService () {

    await callService(
        SERVICE_ID,
        { some: "data" },
        (data: any) => {
            console.log("received data: ", data);

        },
        (error) => {
            console.log("error: " , error)
        }
    );

}

export default (
    <IsomorphicApp
        stackName = "{§PROJECT_NAME§}"
        buildPath = 'build'
        assetsPath = 'assets'
        region='eu-west-1'>

        {§ENVIRONMENT_NAME§}

        <WebApp
            id="main"
            path="*"
            method="GET">

            <Middleware
                callback={ function (req, res, next) {
                    console.log("this middleware runs when requesting a page");
                }}/>

            <Route
                path='/'
                name='My Isomorphic React App'
                render={()=><div>
                    <button onClick={callMyService}>Hello Infrastructure-Components!</button>
                </div>}
            />
        </WebApp>

        <Service
            id={ SERVICE_ID }
            path="/myservice"
            method="POST">

            <Middleware
                callback={ function (req, res, next) {
                    const parsedBody = JSON.parse(req.body);

                    console.log("this is the service: ", parsedBody);

                    res.status(200).set({
                        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    }).send("ok");

            }}/>

        </Service>
    </ServiceOrientedApp>);