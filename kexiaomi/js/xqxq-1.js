
$(function(){
    var xqId = $.cookie('xqId');
    console.log(xqId);
    $.ajax({
        type: 'get',
        url: 'http://kexiaomi.com/api/require/detail?rq_id='+xqId,
        dataType: 'jsonp',
        success:function(data) {
            console.log(data);
            var detail = template('xq-detail',data);
            $('form').html(detail);
        }
    })
    // 多选解决方式 
    $('.mode').on('click', 'span', function(){
        var data =$(this).attr('data');
        if(data == 0){
            $(this).attr('data', '1');
        }else{
            $(this).attr('data', '0');
        }
    });

    //免费推荐研究者
    $('.sub').on('click',function() {
        var tjCode = $.cookie('tjcode');
        if(tjCode) {
            window.location.href = '203-推荐研究者.html';
        }else {
            window.location.href = '210-2-推荐研究者.html';
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
                var info = data.ret;
                if(info.receve) {
                   window.location.href = '207-回应.html';
                }else {
                   window.location.href = '207-2-回应.html';
                }
            }
        })
    })
});