var CommentBox = React.createClass({displayName: "CommentBox",
    getInitialState: function() {
        return {data: []};
    },
    loadCommentsFromServer: function() {
        // $.ajax({
        //     url: this.props.url,
        //     dataType: 'json',
        //     cache: false,
        //     success: function(data) {
        //         this.setState({data: data});
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         console.error(this.props.url, status, err.toString());
        //     }.bind(this)
        // });
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        // 这里自己没有时间实现后台接口,所以请求是错的...
        $.ajax({
            url: this.props.addUrl,
            dataType: 'json',
            type: 'POST',
            contenType: 'application/json; charset=utf-8',
            data: {
                userName: comment.userName,
                text: comment.text
            },
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
            React.createElement("div", {className: "commentBox"}, 
                React.createElement("h1", null, "Comments"), 
                React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit}), 
                React.createElement(CommentContents, {data: this.state.data})
            )
        );
    }
});
var CommentForm = React.createClass({displayName: "CommentForm",
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
            React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
                React.createElement("input", {type: "text", placeholder: "姓名", ref: "userName"}), 
                React.createElement("input", {type: "text", placeholder: "你想说的", ref: "text"}), 
                React.createElement("input", {type: "submit", value: "Post"})
            )
        );
    }
});
var CommentContents = React.createClass({displayName: "CommentContents",
    render: function() {
        var commentNodes = this.props.data.map(function (item,i) {
            return (
                React.createElement(CommentContent, {key: i, userName: item.userName}, 
                    item.text
                )
            );
        });
        return (
            React.createElement("div", {className: "contents"}, 
                commentNodes
            )
        );
    }
});
var CommentContent = React.createClass({displayName: "CommentContent",
    // 这是一个特殊的 API，故意让插入原始的 HTML 变得困难，但是对于 marked ，我们将利用这个后门。
    // 记住： 使用这个功能，你的代码就要依赖于 marked 的安全性。在本场景中，我们传入 sanitize: true ，告诉 marked 转义掉评论文本中的 HTML 标签而不是直接原封不动地返回这些标签。
    rawMarkup: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    },
    render: function() {
        return (
            React.createElement("div", {className: "contentItem"}, 
                React.createElement("h2", {className: "name"}, 
                    this.props.userName
                ), 
                React.createElement("span", {dangerouslySetInnerHTML: this.rawMarkup()})
            )
        );
    }
});
ReactDOM.render(
    React.createElement(CommentBox, {url: "/commentBox/user", addUrl: "/commentBox/add", pollInterval: 3000}),
    document.getElementById('content')
);