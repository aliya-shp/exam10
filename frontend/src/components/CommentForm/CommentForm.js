import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class CommentForm extends Component {
    state = {
        author: '',
        text: '',
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        return (
            <>
                <Form onSubmit={this.submitFormHandler}>
                    <h4>Add comment</h4>
                    <FormGroup row>
                        <Label sm={2} for="author">Name</Label>
                        <Col sm={10}>
                            <Input
                                type="text" required
                                name="author" id="author"
                                value={this.state.author}
                                onChange={this.inputChangeHandler}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="text">Comment</Label>
                        <Col sm={10}>
                            <Input
                                type="textarea" required
                                name="text" id="text"
                                value={this.state.text}
                                onChange={this.inputChangeHandler}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit" color="primary">Save</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

export default CommentForm;