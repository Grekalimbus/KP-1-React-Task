import React from "react";
import { Users } from "./app/layouts/users";
import { Switch, Route } from "react-router-dom";
import NavBar from "./app/components/navBar";
import MainPage from "./app/components/mainPage";
import Login from "./app/layouts/login";

export function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?" component={Users} />
                <Route path="/main" component={MainPage} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    );
}
