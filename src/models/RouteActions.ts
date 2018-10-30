import { LocationActions, Route } from "../../types/hyperapp-router";
import IAuthVerification from "./AuthVerification";
import RouteState from './RouteState';
import Config from '../config';

export default class RouteActions {
    public location: LocationActions;

    constructor(location: LocationActions) {
        this.location = location;
    }

    public setAuth(auth: any) {
        localStorage.setItem('auth', JSON.stringify(auth));

        return { auth: auth, verification: null };
    }

    public setAwaitVerification(verification: IAuthVerification) {
        return { verification };
    }

    public getDrinks() {
        return (state: RouteState, actions: RouteActions) => {
            // Must be logged in
            if (!state.auth) {
                return;
            }

            fetch(Config.apiRoute("/drink"), {
                headers: {
                    Authorization: state.auth.id
                }
            })
                .then((resp) => resp.json())
                .then((drinks) => { actions.setDrinks(drinks); })
                .catch((wtf) => console.error(wtf));
        }
    }

    public setDrinks(drinks: object[] | null) {
        return { drinks: drinks };
    }

    public createDrink() {

    }
}
