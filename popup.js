
(function(){
    var $=function(id){return document.getElementById(id);}
    var Tasks = {
        show:function(obj){
            obj.className='';
            return this;
        },
        hide:function(obj){
            obj.className='hide';
            return this;
        },
        //存储dom
        $addItemDiv:$('addItemDiv'),
        $addItemInput:$('addItemInput'),
        $txtTaskTitle:$('txtTaskTitle'),
        $taskItemList:$('taskItemList'),
        //指针
        index:window.localStorage.getItem('Tasks:index'),
        //初始化
        init:function(){
            if(!Tasks.index){
                window.localStorage.setItem('Taskx:index',Tasks.index=0);
            }
            //初始化数据
            if(window.localStorage.length-1){
                var task_list=[];
                var key;
                for(var i= 0,len=window.localStorage.length;i<len;i++){
                    key=window.localStorage.key(i);
                    if(/task:\d+/.test(key)){
                        task_list.push(JSON.parse(window.localStorage.getItem(key)));
                    }
                }
                for(var i= 0,len=task_list.length;i<len;i++){
                    Tasks.AppendHtml(task_list[i]);
                }
            }
            /*注册事件*/
            //打开添加文本框
            Tasks.$addItemDiv.addEventListener('click',function(){
                Tasks.show(Tasks.$addItemInput).hide(Tasks.$addItemDiv);
                Tasks.$txtTaskTitle.focus();
            },true);
            //回车添加
            Tasks.$txtTaskTitle.addEventListener('keyup',function(ev){
                var ev=ev || window.event;
                if(ev.keyCode==13){
                    //TODO:写入本地数据
                    Tasks.AppendHtml(Tasks.$txtTaskTitle.value);
                    Tasks.$txtTaskTitle.value='';
                    Tasks.hide(Tasks.$addItemInput).show(Tasks.$addItemDiv);
                }
                ev.preventDefault();
            },true);
            //取消
            Tasks.$txtTaskTitle.addEventListener('blur',function(){
                Tasks.$txtTaskTitle.value='';
                Tasks.hide(Tasks.$addItemInput).show(Tasks.$addItemDiv);
            },true);
            //TODO:初始化数据，加载本地数据，生成html          
        },
        //增加
        Add:function(){
            //更新指针
            window.localStorage.setItem('Tasks:index',++Tasks.index);
            task.id=Tasks.index;
            window.localStorage.setItem("task:"+ Tasks.index,JSON.stringify(task));
        },
        //修改
        Edit:function(){
            window.localStorage.setItem("task:"+ task.id,JSON.stringify(task));
        },
        //删除
        Del:function(){
            window.localStorage.removeItem("task:"+task.id);
        },
        AppendHtml:function(title){
            var oDiv=document.createElement('div');
            oDiv.className='taskItem';
            var oLabel=document.createElement('label');
            oLabel.className= 'on';
            var oSpan=document.createElement('span');
            oSpan.className='taskTitle';
            var oText=document.createTextNode(title);
            oSpan.appendChild(oText);
            oDiv.appendChild(oLabel);
            oDiv.appendChild(oSpan);
            //注册事件
            oDiv.addEventListener('click',function(){
                //TODO
            },true);
            Tasks.$taskItemList.appendChild(oDiv);
        },
        RemoveHtml:function(){
            //TODO
        }
    }
    Tasks.init();
})();