# TryReactjs

#### 遇到的问题
按照教程,出现错误Each child in an array or iterator should have a unique “key” prop.
原因:React can’t know that your array is static, so you get the warning. The most practical thing to do here is to write something like.
解决办法:只要在循环的每个子项添加一个key就行了，
