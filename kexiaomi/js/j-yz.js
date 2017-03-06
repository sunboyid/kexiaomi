
;$(function() {
    // 多选解决方式 
    var txt = $.cookie('xqName');
    var xqId = $.cookie('xqId');
    $('.infoName span').html(txt);
    var arr = [];
    var solve;
    $('.mode').on('click', 'span', function() {
        var data = $(this).attr('data');
        if (data == 0) {
            $(this).attr('data', '1');
            arr.push($(this).text());
            solve = arr.join(',');
        } else {
            $(this).attr('data', '0');
        }
    });
    var temp;
    $.ajax({
        type: 'get',
        url: 'http://kexiaomi.com/api/require/index',
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
            var person = data.ret.items[15686].creator;
            var time = data.ret.items[15686].update_time;
            temp = time;
            $('.founderName').html(person);
            $('.up-time').html(time);
        }
    })
    console.log(arr);
    $('.sub').on('click', function() {
        var tta = $('textarea').val();
        var money = $('.fl').val();
        console.log(money);
        console.log(tta);
        console.log(solve);
        if (!solve) {
            alert('请选择解决方式');
        } else if (tta == '') {
            alert('请选择配套支持');
        } else {
            $.ajax({
                type: 'post',
                url: 'http://kexiaomi.com/api/require/improve?rq_id=' + xqId + '&fund=' + money + '&do_way=' + solve + '&support=' + tta,
                dataType: 'jsonp',
                success: function(data) {
                    console.log(data);
                    $.ajax({
                        type: 'post',
                        url: 'http://www.kexiaomi.com/api/wechat/islogin',
                        dataType: 'jsonp',
                        timeout: 3000,
                        success: function(data) {
                            console.log(data);
                            $.cookie('yzmsg', temp, { expires: 7, path: '/' });
                            // $.cookie('data')
                            $.cookie('yzcode', data.code);
                            // window.location.href = '205-联系.html';
                        },
                        error: function() {
                            alert('请求超时');
                        }
                    })
                }
            })
        }


    })
});
