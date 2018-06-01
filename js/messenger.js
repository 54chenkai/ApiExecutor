Messenger = {
    getParams : function () {
        var q=$("#custom-tip").val();
        if (q){
            var callback=  function (data) {
                var menuContent = $('<div id="menuContent">');
                //参数组最多支持三维数据。
                var paramData = data.paramData;
                if(paramData){
                    //构建表头
                    var tab_index=0;
                    var tabContentList = $('<div class="tab-content"></div>');
                    for(var version in paramData) {
                        var siteList = data.paramData[version];
                        var tabList = $('<ul class="nav nav-tabs" role="tablist"></ul>');
                        var groupLength = Object.getOwnPropertyNames(siteList).length;
                        if(groupLength > 1){
                            var tab = $('<li role="presentation" class="dropdown"></li>');
                            var tabTitle = $('<a  href="#" id="dropdown-tab-'+tab_index+'" class="dropdown-toggle"'+
                                        'aria-controls="dropdown-list-'+tab_index+'" role="tab" data-toggle="dropdown">'
                                         +version+
                                         '<span class="caret"></span></a>');
                            var itemList = $('<ul class="dropdown-menu" aria-labelledby="dropdown-tab-'+tab_index+'" id="dropdown-list-'+tab_index+'"></ul>');


                            var item_index = 0;
                            for(var optionName in siteList) {
                                //api组列表项
                                var option = $('<li><a  href="#dropdown-content-'+tab_index+'-'+item_index+'"'+
                                             'id="tab-content-'+tab_index+'-'+item_index+'" class="websiteItem"'+
                                             'aria-controls="dropdown-content-'+tab_index+'-'+item_index+'"'+
                                             'role="tab" data-toggle="tab">'+
                                             optionName+
                                             '</a></li>');
                                    option.click(function () {
                                         $("#groupName").val($(this).text());
                                    });
                                    itemList.append(option);
                                //api组对应的按钮面板
                                var panel = $('<div class="tab-pane" id="dropdown-content-'+tab_index+'-'+item_index+'"'+
                                                'role="tabpanel" aria-labelledby="tab-content-'+tab_index+'-'+item_index+'"></div>');
                                //api队列表项
                               var queue = $('<div class="menuContainer"></div>');
                                var btn_index = 0;
                                var site = siteList[optionName];
                                for(var btnIndex in site) {
                                    var btn = site[btnIndex];
                                    //组员api
                                    var btnItem = $('<button class="btn btn-default btn-lg menu-btn" data-param="'+btn.url+'" onclick="Processor.buttonExecute(this)">'+btn.num+'</button>');
                                    queue.append(btnItem);
                                    if (btn_index != 0 && btn_index % 10 == 0){
                                        queue.append('<br>');
                                    }
                                    btn_index++;
                                }
                                panel.append(queue);
                                tabContentList.append(panel);
                                item_index++;
                            }
                            tab.append(tabTitle);
                            tab.append(itemList);
                            tabList.append(tab);
                        }else if (groupLength == 1) {
                            for(var siteName in siteList) {
                                var tab = $('<li role="presentation" class="dropdown"></li>');
                                var option = $('<a  href="#dropdown-content-'+tab_index+'"'+
                                             'id="tab-content-'+tab_index+'" class="websiteItem"'+
                                             'aria-controls="dropdown-content-'+tab_index+'"'+
                                             'role="tab" data-toggle="tab">'+
                                             siteName+
                                             '</a>');
                                 option.click(function () {
                                     $("#groupName").val($(this).text());
                                 });
                                    tab.append(option);
                                    tabList.append(tab);
                                var panel = $('<div class="tab-pane" id="dropdown-content-'+tab_index+'" role="tabpanel"'+
                                            'aria-labelledby="tab-content-'+tab_index+'"></div>');
                                var queue = $('<div class="menuContainer"></div>');

                                var btn_index = 0;
                                for(var btnIndex in siteList) {
                                    var btn = site[btnIndex];
                                    var btnItem = '<button class="btn btn-default btn-lg menu-btn" data-param="'+btn.url+'" onclick="Processor.buttonExecute(this)">'+btn.num+'</button>';
                                    queue.append(btnItem);
                                   if (btn_index != 0 && btn_index % 10 == 0){
                                       queue.append('<br>');
                                   }
                                    btn_index++;
                                }
                                panel.append(queue);
                                tabContentList.append(panel);
                            }
                        }
                        menuContent.append(tabList);
                        menuContent.append(tabContentList);
                        tab_index++;
                    }
                }

                if(window.mobile==true){
                    var w=$(window).width();
                    var btnw=w/5-8;
                    $(".menu-btn").width(btnw);
                }
                $("#menuArea").html(menuContent);

                $("#menuContent .websiteItem:first").trigger("click");

                $("#custom-tip").val(data.realName);
            }
            $.ajax({
                url: Server.param,
                type: "GET",
                dataType: "jsonp",
                data : {q:q},
                success: callback
            });
        }
    }
}