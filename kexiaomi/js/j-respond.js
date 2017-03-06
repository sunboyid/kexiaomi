
// 响应2
$(function() {
    var xqId = $.cookie('xqId');
    var status = $.cookie('status');
    $('.mc').hide();
    $('.tk').hide();
    $('.main').on('click', '.shc', function() {
        $('.tk').show();
        $('.mc').show();
    });

    $('.mc').click(function() {
        $('.tk').hide();
        $('.mc').hide();
    });

    $('.tk input').click(function() {
        $('.tk').hide();
        $('.mc').hide();
    });


    // 支付查看
    $('.but').on('click',function() {
        
    });
    $.ajax({
        type: 'get',
        url: 'http://kexiaomi.com/api/require/response-list?rq_id=' + xqId,
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
            var respond = template('respond', data);
            $('.main').html(respond);
            $('.content li').each(function(index, ele) {
                if (data.ret.items[index].is_seen) {
                    var resId = data.ret.items[index].id;
                    $(ele).on('click', function(event) {
                        var event = event || window.event;
                        var targetId = event.target ? event.target.id : event.srcElement.id;
                        if (targetId != 'zx') {
                            window.location.href = '208-付款.html?id=' + resId;
                        }
                    })
                }
            })
            $('.xqmsg').on('click', function() {
                if (status == '未通过审核') {
                    window.location.href = '206-1-需求详情.html';
                } else {
                    window.location.href = '206-2-需求详情.html';
                }
            });
            $('.mtj').on('click', function() {
                if (status == '未通过审核') {
                    window.location.href = '210-2-推荐研究者.html';
                } else {
                    window.location.href = '210-3-推荐研究者.html';
                }
            })
        }
    })
});