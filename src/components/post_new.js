import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions/index';
import { connect } from 'react-redux';

class PostNew extends Component{

    renderField(field){
        const { meta : {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        
        return (
                <div className={className}>
                    <label>{field.label}</label>
                    <input
                        className="form-control"
                        type="text"
                        {...field.input}
                    />
                <div className="text-help">
                        {touched ? error : ''}
                        </div>
                </div>
            );
    }

    onSubmit(values){
        this.props.createPost(values, ()=>{
            this.props.history.push("/");
        });
    }

    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props;
        // const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                 label="Title"
                 name="title"
                 component={this.renderField}
                />
                <Field
                 label="Categories"
                 name="categories"
                 component={this.renderField}
                />
                <Field
                 label="Post Content"
                 name="content"
                 component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Save</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
                <button type="button" className="btn btn-danger" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </form>
        )
    }
}

function validate(values){
    const errors = {};
    if(!values.title){
        errors.title = "Please enter a title";
    }
    if(!values.categories){
        errors.categories = "Please some categories";
    }
    if(!values.content){
        errors.content = "Please enter a content";
    }
    return errors;
}

export default reduxForm({
    validate: validate,
    form:'PostsNewForm'
})(
    connect(null, {createPost})(PostNew)
);