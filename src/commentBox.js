var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
                <CommentContents data={this.state.data}/>
            </div>
        );
    }
});
var CommentForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var userName = this.refs.userName.value.trim();
        var text = this.refs.text.value.trim();
        if (!text || !userName) {
            alert('plz confirm your form!');
            return;
        }
        this.props.onCommentSubmit({userName: userName, text: text});
        this.refs.userName.value = '';
        this.refs.text.value = '';
        return;
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="姓名" ref="userName"/>
                <input type="text" placeholder="你想说的" ref="text"/>
                <input type="submit" value="Post" />
            </form>
        );
    }
});
var CommentContents = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (item,i) {
            return (
                <CommentContent key={i} userName={item.userName}>
                    {item.text}
                </CommentContent>
            );
        });
        return (
            <div className="contents">
                {commentNodes}
            </div>
        );
    }
});
var CommentContent = React.createClass({
    // 这是一个特殊的 API，故意让插入原始的 HTML 变得困难，但是对于 marked ，我们将利用这个后门。
    // 记住： 使用这个功能，你的代码就要依赖于 marked 的安全性。在本场景中，我们传入 sanitize: true ，告诉 marked 转义掉评论文本中的 HTML 标签而不是直接原封不动地返回这些标签。
    rawMarkup: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    },
    render: function() {
        return (
            <div className="contentItem">
                <h2 className="name">
                    {this.props.userName}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});
ReactDOM.render(
    <CommentBox url="source/data.json" pollInterval={3000}/>,
    document.getElementById('content')
);