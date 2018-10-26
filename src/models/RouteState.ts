import { LocationState } from "../../types/hyperapp-router";
import IAuth from "./Auth";

export default interface IRouteState {
    location: LocationState;

    auth: IAuth | null;
}
