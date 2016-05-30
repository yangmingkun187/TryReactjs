var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentTitle />
                <CommentContent />
            </div>
        );
    }
});
var CommentTitle = React.createClass({
    render: function() {
        return (
            <div className="title">
                我是标题
            </div>
        );
    }
});
var CommentContent = React.createClass({
    render: function() {
        return (
            <div className="content">
                我是内容
            </div>
        );
    }
});
ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);