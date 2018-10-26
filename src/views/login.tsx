import { Link, location, Redirect, Route } from "@hyperapp/router";
import { app, h, View, VNode } from "hyperapp";
import { LocationActions, LocationState, RenderProps } from "../../types/hyperapp-router";

import Config from "../config";
import { IAuth, IRouteState, RouteActions } from "../models";

export default (state: IRouteState, actions: RouteActions) => (props: RenderProps<any>) => {
    if (state.auth) {
        return (<Redirect to="/" />);
    }

    return (
        <div>
            <form onsubmit={submitLoginForm(state, actions)}>
                <input type="text" id="login-identity" placeholder="Enter your email address" value="" />
                <input type="submit" value="Test" />
            </form>
        </div>
    );
};

const submitLoginForm = (state: IRouteState, actions: RouteActions) => (e: Event) => {
    e.preventDefault();

    const identityInput = document.getElementById("login-identity") as HTMLInputElement;
    const identity = identityInput.value;

    console.log("Identity is", identity);

    const form = new URLSearchParams();
    form.append("identity", identity);

    return fetch(Config.apiRoute("/login"), {
        method: "POST",
        body: form,
    })
        .then((response: Response) => response.json())
        .then((auth: IAuth) => {
            console.log(auth);

            actions.setAuth(auth);
        });
};
