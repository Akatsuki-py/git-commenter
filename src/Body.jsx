import React, { Component } from 'react';
import { Container } from "reactstrap";
import Generator from "./Generator/Generator";
import Setting from "./Setting/Setting";
import { Route, Switch } from "react-router-dom";

class Body extends Component {
    render() {
        return (
            <Container className="py-2">
                <Switch>
                    <Route exact path="/" component={Generator} />

                    {/* 設定ページ */}
                    <Route path="/setting" component={Setting} />

                    <Route component={Generator} />
                </Switch>
            </Container>
        );
    }
}

export default Body;
