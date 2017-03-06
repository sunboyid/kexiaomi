
$(function() {
    var xqId = $.cookie('xqId');
    $.ajax({
        type: 'get',
        url: 'http://kexiaomi.com/api/require/recommended?rq_id=' + xqId,
        dataType: 'jsonp',
        success: function(data) {
            var info = data.ret;
            $('.tsh').html(info.rq_name);
            var num = data.ret.list;
            if (data.code == 0) {
                $.cookie('tjcode', data.code);
            }
            console.log(data);
            var res = template('tj-res', info);
            $('.content').html(res);
            $('.sub').on('click', function() {
                if (data.code == -10) {
                    window.location.href = '../登陆注册/101-登陆.html';
                } else {
                    window.location.href = '204-验证.html';
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
})