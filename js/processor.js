Processor = {
    switchApi : function () {//TODO 切换的英文是什么
       //TODO 这里有个疑问：应该将多个对象的监听指向一个函数，还是应该将每个对象的事件监听分别指向一个匿名函数。
        $("#curAPI").val(this.getAttribute('data-api-url'));
        $("#selectAPI").html(this.innerHTML);
        Processor.execute();
    },
    execute : function () {
        var api=$("#curAPI").val();
        var addr=$("#curParams").val();
        if(api && addr){
            $("#browser").attr("src",api+addr);
        }
    },
    customizeParams : function () {
        $("#curParams").val($("#customizedParams").val()) ;
        Processor.execute();
    },
    clearParams : function () {
        $("#customizedParams").val("");
    },
    buttonExecute (button) {
        $("#curParams").val($(button).attr("data-param")) ;
        Processor.execute();
    },
    getParams : function (){
        var q=$('#custom-tip').val();
        Messenger.execute(q);
    },
    setParams : function (menuContent) {
        $('#menuArea').html(menuContent);
        $('#menuContent .websiteItem:first').trigger('click');
    }
}