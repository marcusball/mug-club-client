import { LocationActions } from "../../types/hyperapp-router";
import IAuthVerification from "./AuthVerification";

export default class RouteActions {
    public location: LocationActions;

    constructor(location: LocationActions) {
        this.location = location;
    }

    public setAuth(auth: any) {
        return { auth: auth, verification: null };
    }

    public setAwaitVerification(verification: IAuthVerification) {
        return { verification };
    }
}
