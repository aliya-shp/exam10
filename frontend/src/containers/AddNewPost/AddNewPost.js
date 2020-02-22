import React, {Component} from 'react';
import {connect} from "react-redux";
import {addNews} from "../../store/actions/newsActions";
import NewsForm from "../../components/NewsForm/NewsForm";
import Newsbar from "../../components/Newsbar/Newsbar";

class AddNewPost extends Component {
    addPost = newsData => {
        this.props.onAddingPost(newsData).then(() =>{
            this.props.history.push('/');
        })
    };
    
    render() {
        return (
            <>
                <Newsbar/>
                <h2>Add new post</h2>
                <NewsForm onSubmit={this.addPost} />
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onAddingPost: newsData => dispatch(addNews(newsData)),
});

export default connect(null, mapDispatchToProps)(AddNewPost);