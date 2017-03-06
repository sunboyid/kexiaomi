
// 响应3
$(function() {
    var xqId = $.cookie('xqId');
    var status = $.cookie('xqId');
    $('.mc').hide();
    $('.tk').hide();
    $('.content').on('click', '.shc', function() {
        $('.tk').show();
        $('.mc').show();
    });

    $('.mc').click(function() {
        $('.tk').hide();
        $('.mc').hide();
    });

    $('.tk button').click(function() {
        $('.tk').hide();
        $('.mc').hide();
    });


//分页ajax
    $.ajax({
        type: 'get',
        url: 'http://kexiaomi.com/api/require/response-list?rq_id='+xqId,
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
            var nums = 10;
            var pages = (data.ret.receive / nums);
            laypage({
                cont: 'page',
                pages: pages,
                curr: 1,
                skin: '#69e489',
                jump:function(e,first) {
                    if(!first) {
                        $.ajax({
                            type: 'get',
                            url: 'http://kexiaomi.com/api/require/response-list?rq_id='+xqId+'&page=' +e.curr,
                            dataType: 'jsonp',
                            beforeSend:function() {
                                $('.main').html('');
                                $('.main').append('<div class="jz">努力加载中...</div>');
                                $('#page').hide();
                            },
                            success:function() {
                                var respond = template('respond',data);
                                $('.main').html(respond);
                                $('#page').show();
                            }
                        })
                    }
                }
            })
            var respond = template('respond', data);
            $('.main').html(respond);
            $('.content li').each(function(index,ele) {
                var resId = data.ret.items[index].id;
                $(ele).on('click',function(event) {
                    var event = event || window.event;
                    var targetId = event.target? event.target.id : event.srcElement.id;
                    if(targetId != 'zx') {
                        window.location.href = '208-付款.html?id='+resId;
                    }
                })
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
});