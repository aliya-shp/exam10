import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class NewsForm extends Component {
    state = {
        title: '',
        text: '',
        image: null,
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.onSubmit(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    render() {
        return (
            <>
                <Form onSubmit={this.submitFormHandler}>
                    <FormGroup row>
                        <Label sm={2} for="title">Title</Label>
                        <Col sm={10}>
                            <Input
                                type="text" required
                                name="title" id="title"
                                value={this.state.title}
                                onChange={this.inputChangeHandler}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="text">Content</Label>
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
                        <Label sm={2} for="image">Image</Label>
                        <Col sm={10}>
                            <Input
                                type="file" required
                                name="image" id="image"
                                onChange={this.fileChangeHandler}
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

export default NewsForm;