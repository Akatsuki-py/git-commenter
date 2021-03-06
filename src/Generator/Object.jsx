import React, { Component } from "react";
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";
import { Row, Col, FormGroup, Label, Input, FormText } from 'reactstrap';
import Aws from "../util/aws";
import { fetchTemplate } from "../util/util";

class CommitObject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "form",
            objectTmpls: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.renderInput = this.renderInput.bind(this);
    }

    async componentDidMount() {
        const tmpls = await Aws.fetchTmpls("object", 100);

        this.setState({
            objectTmpls: tmpls
        })
    }

    handleChange(e) {
        if (e.target.name === "input") {
            this.setState({
                input: e.target.value
            });
            this.props.dispatch(addElement("object", ""));
        } else if (e.target.name === "object") {
            this.props.dispatch(addElement("object", e.target.value));
        } else if (e.target.name === "hint") {
            const phrase = JSON.parse(e.target.value);
            this.props.dispatch(addElement("object", phrase.object));
            this.props.dispatch(addElement("modifier", phrase.modifier));
            this.setState({
                input: "form",
            });
        }
    }

    renderInput() {
        const objectData = this.state.objectTmpls;
        const phraseList = this.props.phrases;
        if (this.state.input === "select") {
            return (
                <FormGroup>
                    <Input type="select" bsSize="sm" name="object" onChange={this.handleChange} value={this.props.object} >
                        <option value=""></option>
                        {
                            fetchTemplate("object").map((element) => {
                                return (
                                    <option value={element} key={element}>{element}</option>
                                )
                            })
                        }
                        {
                            Object.keys(objectData).map((object) => {
                                return (
                                    <option value={object} key={object}>{(this.props.lang === "en") ? object : `${object} ${objectData[object].ja}`}</option>
                                )
                            })
                        }
                    </Input>
                </FormGroup>
            )
        } else if (this.state.input === "form") {
            return (
                <FormGroup>
                    <Input type="text" bsSize="sm" name="object" list="object-tmpl" onChange={this.handleChange} placeholder={(this.props.lang === "en") ? "Please enter the object of the commit." : "コミットの対象を入力するところです。 例: バグを修正 => fix bug"} value={this.props.object} autoComplete="off" />
                    <datalist id="object-tmpl">
                        {
                            fetchTemplate("object").map((element) => {
                                return (
                                    <option value={element} key={element}>{element}</option>
                                )
                            })
                        }
                        {
                            Object.keys(objectData).map((object) => {
                                return (
                                    <option value={object} key={object}>{(this.props.lang === "en") ? object : `${object} ${objectData[object].ja}`}</option>
                                )
                            })
                        }
                    </datalist>
                </FormGroup>
            )
        } else if (this.state.input === "hint") {
            return (
                <FormGroup>
                    <Input type="select" bsSize="sm" name="hint" onChange={this.handleChange} >
                        <option value=""></option>
                        {
                            Object.keys(phraseList).map((phrase) => {
                                return (
                                    <option value={JSON.stringify(phraseList[phrase])}>{phrase}   {(this.props.lang === "en") ? "" : phraseList[phrase].ja}</option>
                                )
                            })
                        }
                    </Input>
                    <FormText>{(this.props.lang === "en") ? "suggest frequently occurring phrases with verbs." : "動詞とともに頻出するフレーズをサジェストする機能です。(テンプレの動詞のみ)"}</FormText>
                </FormGroup>
            )
        }
    }

    render() {
        
        return (
            <Row form>
                <Col md={12}><Label>{"⚽️ Object"}</Label></Col>
                <Col md={2}>
                    <FormGroup>
                        <Input type="select" bsSize="sm" name="input" onChange={this.handleChange} value={this.state.input} >
                            <option value="select">{(this.props.lang === "en") ? "template" : "テンプレ"}</option>
                            <option value="form">{(this.props.lang === "en") ? "form" : "フォーム"}</option>
                            <option value="hint">{(this.props.lang === "en") ? "hint" : "ヒント"}</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={10}>
                    {this.renderInput()}
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        object: state.message.object,
        phrases: state.phrases.phrases,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(CommitObject);