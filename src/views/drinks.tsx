import { Link, location, Redirect, Route } from "@hyperapp/router";
import { app, h, View, VNode } from "hyperapp";
import { LocationActions, LocationState, RenderProps } from "../../types/hyperapp-router";

import Config from "../config";
import { IAuth, IRouteState, RouteActions } from "../models";

export default (state: IRouteState, actions: RouteActions) => (props: RenderProps<any>) => {
    if (!state.auth) {
        return (<Redirect to="/" />);
    }

    let session_token = state.auth.id;

    return (
        <h3 oncreate={(element: HTMLElement) => {
            fetch(Config.apiRoute("/auth/test"), {
                headers: {
                    Authorization: session_token
                }
            })
                .then((resp) => resp.json())
                .then((obj) => obj.message)
                .then((message) => (element.innerHTML = message));
        }}>Loading...</h3>
    );
};