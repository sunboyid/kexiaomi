
$(function() {
    var xqId = $.cookie('xqId');
    var status = $.cookie('status');
    $.ajax({
            type: 'get',
            url: 'http://kexiaomi.com/api/require/detail?rq_id=' + xqId,
            dataType: 'jsonp',
            success: function(data) {
                console.log(data);
                var detail = template('xq-detail', data);
                $('form').html(detail);
                $('form .yz').html(status);
            }
        })
        // 多选解决方式 
    $('.mode').on('click', 'span', function() {
        var data = $(this).attr('data');
        if (data == 0) {
            $(this).attr('data', '1');
        } else {
            $(this).attr('data', '0');
        }
    });

    //响应
    $('.respond').on('click',function() {
        $.ajax({
            type: 'get',
            url: 'http://kexiaomi.com/api/require/response-list?rq_id='+xqId,
            dataType: 'jsonp',
            beforeSend:function() {
                $('form').html('');
                $('form').append('<div class="jz">努力加载中</div>');
            },
            success: function(data) {
                // console.log(data);
                var info = data.ret;
                if(info.receive) {
                   window.location.href = '207-回应.html';
                }else {
                   window.location.href = '207-2-回应.html';
                }
            }
        })
    });
});