import { LocationState } from "../../types/hyperapp-router";
import IAuth from "./Auth";
import IAuthVerification from "./AuthVerification";

export default interface IRouteState {
    location: LocationState;

    auth: IAuth | null;

    verification: IAuthVerification | null;
}
