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
var CommentContents = React.createClass({
    render: function() {
        return (
            <div className="contents">
                <CommentContent userName="jason">this is awesome!</CommentContent>
                <CommentContent userName="杨明昆">碉堡了</CommentContent>
                <CommentContent userName="john snow">I'm not dead</CommentContent>
            </div>
        );
    }
});
var CommentContent = React.createClass({
    render: function() {
        return (
            <div className="contentItem">
                <h2 className="name">
                    {this.props.userName}
                </h2>
                {this.props.children}
            </div>
        );
    }
});
ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);