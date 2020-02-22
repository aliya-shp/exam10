import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteNews, fetchNews} from "../../store/actions/newsActions";
import {Link} from "react-router-dom";
import {Button, Card, CardBody} from "reactstrap";
import {serverURL} from "../../constants";
import Newsbar from "../../components/Newsbar/Newsbar";

class News extends Component {
    componentDidMount () {
        this.props.onFetchNews();
    }

    render() {
        return (
            <>
                <Newsbar />
                <h2>
                    POSTS
                    <Link to="/news/new">
                        <Button color="primary" className="float-right">Add new post</Button>
                    </Link>
                </h2>
                { this.props.news.map(news => (
                    <Card key={news.id} style={{marginBottom: '10px'}}>
                        <CardBody style={{display: 'flex'}}>
                            <img alt='news' src={`${serverURL}/uploads/${news.image}`} style={{width: '100px', height: '100px', marginRight: '10px'}} className='img-thumbnail' />
                            <div>
                                <Link to={'/news/' + news.id}>
                                    {news.title}
                                </Link>
                                <p><i>At {news.datetime}</i></p>
                                <Link to={`/news/${news.id}`}>Read Full Post ...</Link>
                                <Button style={{position: 'absolute', right: '40px', bottom: '40px'}} onClick={()=>this.props.deleteNews(news.id)}>Delete...</Button>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </>
        );
    }
}

const mapStateToProps = state => ({
    news: state.news.news
});

const mapDispatchToProps = dispatch => ({
    onFetchNews: () => dispatch(fetchNews()),
    deleteNews: (newsId) => dispatch(deleteNews(newsId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(News);