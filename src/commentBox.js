var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentTitle />
                <CommentContents data={this.props.data}/>
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
        var commentNodes = this.props.data.map(function (item,i) { //按照教程,出现错误Each child in an array or iterator should have a unique “key” prop.解决办法只要在循环的每个子项添加一个key就行了，
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
var data = [
    {userName: "jason:", text: "this is awesome!"},
    {userName: "杨明昆:", text: "碉堡了!"},
    {userName: "john snow:", text: "I'm not *dead*"}
];
ReactDOM.render(
    <CommentBox data={data}/>,
    document.getElementById('content')
);