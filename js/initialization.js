Initialization = {
    init : function () {
        Initialization.initSystemUI();
        Initialization.initApiList();
        Initialization.initEventListener();
    },
    initApiList : function () {
        //TODO q:元素的克隆，不会复制绑定的事件。所以事件应该放到元素所在的父元素上，还是应该每次重新绑定。我决定放在父元素上，对数据进行处理，而少对元素进行处理。
        var callback = function (data) {
            var separator = '<li role="separator" class="divider"></li>';//TODO 分割线的英文是什么？
            var aEle = document.createElement('a');
                aEle.setAttribute('href','#');
            var listItem = document.createElement('li');//TODO 列表项的英文是什么？
            data.forEach(function (ele,index,arr) {
                if (index % 10 == 0) {
                    var group = index / 10 + 1;
                    if(index != 0){
                        $("#APIList").append(separator);
                    }
                    $("#APIList").append('<li class="dropdown-header">第'+group+'组</li>');
                    $("#APIList").append(separator);
                }

                var listItemDuplicate = listItem.cloneNode(true);
                var aEleDuplicate = aEle.cloneNode(true);
                aEleDuplicate.innerHTML = ele.name;
                aEleDuplicate.setAttribute('data-api-url',ele.url);
                aEleDuplicate.onclick = Processor.switchApi;

                listItemDuplicate.append(aEleDuplicate);
                $("#APIList").append(listItemDuplicate);
            });
            $("#APIList a:first").trigger("click");
            $("#APIList").dropdown('toggle');
        }
        $.ajax({
            url: Server.api,
            type: "GET",
            dataType: "jsonp",
            success: callback
        });
    },
    initEventListener : function () {
        var postProcessor = function () {
            var iframe = document.getElementById("browser");
        };
        var iframe = document.getElementById("browser");
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", postProcessor);
        } else {
            iframe.onload = postProcessor;
        };
    },
    initSystemUI : function () {
        $("title").text(Config.ParamDim.SysName);
        $("#api-dim-label").text(Config.ParamDim.ApiDimLabel);
        $("#selectAPI").text(Config.ParamDim.ApiDimName);
        $("#first-dim-label").text(Config.ParamDim.FirstDimLabel);
        $("#first-dim-name").attr("placeholder",Config.ParamDim.FirstDimName);
        $("#custom-btn").text(Config.ParamDim.CustomButtonName);
        $("#custom-tip").attr("placeholder",Config.ParamDim.CustomTip);
        $("#execute-btn").text(Config.ParamDim.ExecuteButtonName);
    }
}
