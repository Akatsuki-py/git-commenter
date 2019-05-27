import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import Register from "./Register";
import MessageRegister from "./MessageRegister";
import { Link } from "react-router-dom";
import setting from "../img/setting.png";
import Language from "./Language";

class Setting extends Component {

    render() {
        return (
            <Row id="setting">
                <Col xs={12} className="mb-1"><h4>⚒ Setting 🛠</h4></Col>
                <Register />
                <MessageRegister />
                <Language />
                <Link to="/"><img id="setting-icon" src={setting} alt="setting" /></Link>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(Setting);