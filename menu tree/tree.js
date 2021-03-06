var Tree = (function () {
    var self;
    function Tree(selector, data) {
        self = this;
        this.container = document.getElementById(selector);
        this.init(data, this.container);
    }

    Tree.prototype.init = function (data, node) {
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement('li');
            //li.innerHTML = data[i].name;
            //为了避免事件冒泡    所以这里为事件li添加一个div节点
            var div = document.createElement('div');
            div.innerHTML = data[i].name;
            li.appendChild(div);

            node.appendChild(li);
            if (data[i].children && data[i].children.length) {

                var span = document.createElement('span');
                span.innerHTML = '[-]';
                div.appendChild(span);

                var ul = document.createElement('ul');
                li.appendChild(ul);
                div.onclick = this.toggle;
                //给点击的div加一个自定义属性
                div.toggle = true;
                this.init(data[i].children, ul);
            }else{
                //这里给没有孩子的div加双击事件
                div.ondblclick = this.changeType;
            }
        }
        //在这里为node节点的尾部追加一个+节点
        var li = document.createElement('li');
        li.innerHTML = '+';
        //node  其实就是所有的 ul
        li.onclick = this.addChild;
        node.appendChild(li);
    };
    //点击切换的事件处理函数
    Tree.prototype.toggle = function () {
        console.dir(this);
        this.nextSibling.style.display = this.toggle ? 'none':'block';
        this.firstElementChild.innerHTML = this.toggle? '[+]':'[-]';
        this.toggle = !this.toggle;
    };
    //添加子节点
    Tree.prototype.addChild = function () {
        var parent = this.parentElement;
        var li = document.createElement('li');
        var div = document.createElement('div');
        div.innerHTML = 'new stuff';
        li.appendChild(div);
        div.ondblclick = self.changeType;
        parent.insertBefore(li,this);
    };
    //改变节点的类型   由单节点变成目录节点
    Tree.prototype.changeType = function () {
        var parent = this.parentElement;
        var span = document.createElement('span');
        span.innerHTML = '[-]';
        this.appendChild(span);
        var ul = document.createElement('ul');
        var li = document.createElement('li');
        li.innerHTML = '+';
        li.onclick = self.addChild;
        ul.appendChild(li);
        parent.appendChild(ul);
        this.onclick = self.toggle;
        this.ondblclick = null;
    };
    return Tree;
})();