import React, { Component } from "react";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import { connect } from "react-redux";
import { switchLang } from "../Redux/actions";

class Language extends Component {

    constructor(props) {
        super(props);

        this.switchLang = this.switchLang.bind(this);
    }

    switchLang(e) {
        this.props.dispatch(switchLang(e.target.value));
    }

    render() {
        return (
            <Col xs={12} className="mt-3">
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="lang" className="pr-2"><h5>{"🌎"} Language</h5></Label>
                        <Input type="select" name="lang" bsSize="sm" onChange={this.switchLang} value={this.props.lang} >
                            <option value="en">En</option>
                            <option value="ja">Ja</option>
                        </Input>
                    </FormGroup>
                </Form>
            </Col>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Language);