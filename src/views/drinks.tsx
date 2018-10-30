import { Link, location, Redirect, Route } from "@hyperapp/router";
import { app, h, View, VNode } from "hyperapp";
import { LocationActions, LocationState, RenderProps } from "../../types/hyperapp-router";

import Config from "../config";
import { IAuth, IRouteState, RouteActions } from "../models";
import login from './login';

export default (state: IRouteState, actions: RouteActions) => (props: RenderProps<any>) => {
    if (!state.auth) {
        return (<Redirect to="/" />);
    }

    if (!state.drinks) {
        console.log('fetching drinks');
        actions.getDrinks();
    }

    let drinkList = getDrinkList(state, actions);

    return (
        <div>
            <div>{drinkList}</div>
            <div>
                <form name="new-drink" onsubmit={submitCreateDrinkForm(state, actions)}>
                    Beer: <input type="text" name="beer" value=""></input>
                    <br />
                    Brewery: <input type="text" name="brewery" value=""></input>
                    <br />
                    Rating: <input type="number" name="rating" value="" placeholder="5"></input>
                    <br />
                    Comment: <textarea name="comment"></textarea>
                    <input type="submit" value="Add Drink"></input>
                </form>
            </div>
        </div>
    );
};


function getDrinkList(state: IRouteState, actions: RouteActions) {
    // @TODO `isFetching`?
    if (!state.drinks) {
        console.log('Loading drinks...');

        return (
            <h3>Loading...</h3>
        );
    }

    if (state.drinks.length == 0) {
        return (
            <div>
                <h4>You haven't added any drinks</h4>
            </div>
        );
    }

    return (
        <div>
            <ul>
                {state.drinks.map((drink) => (<li>{drink.beer} - {drink.brewery}</li>))}
            </ul>
        </div>
    );
}


const submitCreateDrinkForm = (state: IRouteState, actions: RouteActions) => (e: Event) => {
    e.preventDefault();

    if (!state.auth) {
        throw new Error('Authorization token is expected!');
    }

    const loginForm = document.forms['new-drink'] as HTMLFormElement;
    const beer = loginForm.elements['beer'].value;
    const brewery = loginForm.elements['brewery'].value;
    const rating = loginForm.elements['rating'].value;
    const comment = loginForm.elements['comment'].value;

    const form = new URLSearchParams();
    form.append("drank_on", "2018-10-29");
    form.append("beer", beer);
    form.append("brewery", brewery);
    form.append("rating", rating);
    form.append("comment", comment);

    return fetch(Config.apiRoute("/drink"), {
        method: "POST",
        body: form,
        headers: {
            Authorization: state.auth.id
        }
    })
        .then((response: Response) => response.json())
        .then((drink) => {
            console.log(drink);

            actions.setDrinks(null);
        })
};