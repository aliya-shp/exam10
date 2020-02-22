import React, {Component} from 'react';
import {connect} from "react-redux";
import {addComment, deleteComment, fetchNewsComments} from "../../store/actions/commentsActions";
import {fetchSingleNews} from "../../store/actions/newsActions";
import Comments from "../../components/Comments/Comments";
import Newsbar from "../../components/Newsbar/Newsbar";
import CommentForm from "../../components/CommentForm/CommentForm";

class FullNewPost extends Component {
    componentDidMount() {
        const newsId = this.props.match.params.id;
        this.props.fetchSingleNews(newsId);
        this.props.fetchNewsComments(newsId);
    };
    createComment = commentData => {
        commentData.news_id = this.props.match.params.id;
        this.props.addComment(commentData)
    };

    render() {
        console.log(this.props);
        return (
            <>
                <Newsbar />
                <h1>{this.props.news.title}</h1>
                <p><i>{this.props.news.datetime.toDateString()}</i></p>
                <div>{this.props.news.text}</div>
                <Comments deleteComment={this.props.deleteComment} comments={this.props.comments}/>
                <CommentForm onSubmit={this.createComment}/>
            </>
        );
    }
}

const mapStateToProps = state => ({
    news: state.news.news,
    comments: state.news.comments
});

const mapDispatchToProps = dispatch => ({
    fetchSingleNews: (newsId) => dispatch(fetchSingleNews(newsId)),
    fetchNewsComments: (newsId) => dispatch(fetchNewsComments(newsId)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    addComment: (commentData) => dispatch(addComment(commentData)),
});


export default connect(mapStateToProps, mapDispatchToProps)(FullNewPost);