MultiDimData = {
    getData : function (q) {
        $.ajax({
            url: Server.param,
            type: 'GET',
            dataType: 'jsonp',
            data : {q:q},
            success: Messenger.processData
        });
    }
}