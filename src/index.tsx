import { Link, location, Route } from "@hyperapp/router";
import { app, h, View, VNode } from "hyperapp";
import { LocationActions, LocationState, RenderProps } from "../types/hyperapp-router";

import Config from "./config";
import { IRouteState, RouteActions } from "./models";
import { LoginView } from "./views";

const root = document.getElementById("root") as HTMLElement;

const Home = () => (
    <div>
        <h2>Home</h2>
        <h3 oncreate={(element: HTMLElement) => {
            fetch(Config.apiRoute("/test"))
                .then((resp) => resp.json())
                .then((obj) => obj.message)
                .then((message) => (element.innerHTML = message));
        }}>Loading...</h3>
    </div >
);
const About = () => (
    <div>
        <h2>About</h2>
    </div>
);
const Topic = ({ match }: RenderProps<{ topicId: string }>) => <h3>{match.params.topicId}</h3>;
const TopicsView = ({ match }: RenderProps<{ topicId: string }>) => (
    <div key="topics">
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${match.url}/single-state-tree`}>Single State Tree</Link>
            </li>
            <li>
                <Link to={`${match.url}/routing`}>Routing</Link>
            </li>
        </ul>

        {match.isExact && <h3>Please select a topic.</h3>}

        <Route parent path={`${match.path}/:topicId`} render={Topic} />
    </div>
);

const initialState: IRouteState = {
    location: location.state,
    auth: null,
};

const appActions = new RouteActions(location.actions);

const view: View<IRouteState, RouteActions> = (state: IRouteState, actions: RouteActions) => (
    <div>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/topics">Topics</Link>
            </li>
            {/* Don't display login link if already logged in */
                !state.auth &&
                <li>
                    <Link to="/login">Log In</Link>
                </li>
            }
        </ul>

        {/* if auth is not null, dispaly the name */}
        {state.auth && <span>You are logged in as <strong>{state.auth.name}</strong></span>}

        <hr />

        <Route path="/" render={Home} />
        <Route path="/about" render={About} />
        <Route parent path="/topics" render={TopicsView} />
        <Route path="/login" render={LoginView(state, actions)} />
    </div>
);

const main = app(initialState, appActions, view, root);

const unsubscribe = location.subscribe(main.location);
