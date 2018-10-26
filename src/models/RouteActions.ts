import { LocationActions } from "../../types/hyperapp-router";

export default class RouteActions {
    public location: LocationActions;

    constructor(location: LocationActions) {
        this.location = location;
    }

    public setAuth(auth: any) {
        return { auth };
    }
}
