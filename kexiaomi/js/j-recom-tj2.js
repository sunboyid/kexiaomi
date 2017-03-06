
$(function() {
    var xqId = $.cookie('xqId');
    $.ajax({
        type: 'get',
        url: 'http://kexiaomi.com/api/require/recommended?rq_id=' + xqId,
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
            var info = data.ret;
            $('.tsh').html(info.rq_name);
            var num = data.ret.list;
            var res = template('tj-res', info);
            $('.content').html(res);
            $('.sub').on('click', function() {
                if (data.code == -10) {
                    window.location.href = '../登陆注册/101-登陆.html';
                } else {
                    window.location.href = '204-yz.html';
                }
            })
            $('.content li').each(function(index, ele) {
                $(ele).on('click', '.shc', function() {
                    var userId = num[index].id;
                    console.log(userId);
                    $.ajax({
                        type: 'get',
                        url: 'http://www.kexiaomi.com/api/tech/collect-researcher?id=' + userId,
                        dataType: 'jsonp',
                        success: function(data) {
                            if (data.code == -10) {
                                window.location.href = '../登陆注册/101-登陆.html';
                            } else {
                                alert('收藏成功');
                            }
                        }
                    })
                })
            })
        }
    })
    $('.respond').on('click', function() {
        $.ajax({
            type: 'get',
            url: 'http://kexiaomi.com/api/require/response-list?rq_id=' + xqId,
            dataType: 'jsonp',
            beforeSend:function() {
            	$('.content').html('');
            	$('.content').append('<div class="jz">努力加载中</div>');
            },
            success: function(data) {
                console.log(data);
                var info = data.ret;
                if (info.receive) {
                    window.location.href = '207-回应.html';
                } else {
                    window.location.href = '207-2-回应.html';
                }
            }
        })
    })
})