import { Link, location, Redirect, Route } from "@hyperapp/router";
import { app, h, View, VNode } from "hyperapp";
import { LocationActions, LocationState, RenderProps } from "../../types/hyperapp-router";

import Config from "../config";
import { IAuth, IAuthVerification, IRouteState, RouteActions } from "../models";

export default (state: IRouteState, actions: RouteActions) => (props: RenderProps<any>) => {
    if (state.auth) {
        return (<Redirect to="/" />);
    }

    if (!state.verification) {
        return (
            <div>
                <div>
                    <form name="login-form" onsubmit={submitLoginForm(state, actions)}>
                        <label for="login-identity">Phone Number</label><br />
                        <select id="authy-countries" data-show-as="number" data-value="+1"></select>
                        <input id="authy-cellphone" type="text" name="login-identity" placeholder="352-555-1234" value="" />
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                <link href="https://www.authy.com/form.authy.min.css" media="screen" rel="stylesheet" type="text/css" />
                <script src="https://www.authy.com/form.authy.min.js" type="text/javascript"></script>
            </div>

        );
    }

    return (
        <div>
            <div>
                <div>
                    <form name="verification-form" onsubmit={submitVerificationForm(state, actions)}>
                        <label for="verification-code">Enter the verification code sent to your phone:</label>
                        <br />
                        <input type="string" name="verification-code" placeholder="000000" value=""></input>
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                <link href="https://www.authy.com/form.authy.min.css" media="screen" rel="stylesheet" type="text/css" />
                <script src="https://www.authy.com/form.authy.min.js" type="text/javascript"></script>
            </div>
        </div>
    )
};

const submitLoginForm = (state: IRouteState, actions: RouteActions) => (e: Event) => {
    e.preventDefault();

    const loginForm = document.forms['login-form'] as HTMLFormElement;
    const identityInput = loginForm.elements['login-identity'];
    const identity = identityInput.value;

    console.log("Identity is", identity);

    const form = new URLSearchParams();
    form.append("country_code", "1");
    form.append("phone_number", identity);

    return fetch(Config.apiRoute("/auth"), {
        method: "POST",
        body: form,
    })
        .then((response: Response) => {
            if (!response.ok) {
                // @TODO show an error message or something
                throw new Error('Submission error!');
            }

            actions.setAwaitVerification({
                countryCode: "+1",
                phoneNumber: identity
            });
        });
};


const submitVerificationForm = (state: IRouteState, actions: RouteActions) => (e: Event) => {
    e.preventDefault();

    const loginForm = document.forms['verification-form'] as HTMLFormElement;
    const verificationCode = loginForm.elements['verification-code'].value;

    if (!state.verification) {
        console.error("Verification state is missing!");
        return;
    }

    const form = new URLSearchParams();
    form.append("country_code", state.verification.countryCode);
    form.append("phone_number", state.verification.phoneNumber);
    form.append("code", verificationCode);

    return fetch(Config.apiRoute("/auth/verify"), {
        method: "POST",
        body: form,
    })
        .then((response: Response) => response.json())
        .then((auth: IAuth) => {
            console.log(auth);

            actions.setAuth(auth);
        });
};
