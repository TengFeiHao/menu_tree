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
            //Ϊ�˱����¼�ð��    ��������Ϊ�¼�li���һ��div�ڵ�
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
                //�������div��һ���Զ�������
                div.toggle = true;
                this.init(data[i].children, ul);
            }else{
                //�����û�к��ӵ�div��˫���¼�
                div.ondblclick = this.changeType;
            }
        }
        //������Ϊnode�ڵ��β��׷��һ��+�ڵ�
        var li = document.createElement('li');
        li.innerHTML = '+';
        //node  ��ʵ�������е� ul
        li.onclick = this.addChild;
        node.appendChild(li);
    };
    //����л����¼�������
    Tree.prototype.toggle = function () {
        console.dir(this);
        this.nextSibling.style.display = this.toggle ? 'none':'block';
        this.firstElementChild.innerHTML = this.toggle? '[+]':'[-]';
        this.toggle = !this.toggle;
    };
    //����ӽڵ�
    Tree.prototype.addChild = function () {
        var parent = this.parentElement;
        var li = document.createElement('li');
        var div = document.createElement('div');
        div.innerHTML = 'new stuff';
        li.appendChild(div);
        div.ondblclick = self.changeType;
        parent.insertBefore(li,this);
    };
    //�ı�ڵ������   �ɵ��ڵ���Ŀ¼�ڵ�
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