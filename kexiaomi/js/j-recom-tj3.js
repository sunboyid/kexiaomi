
$(function() {
    var xqId = $.cookie('xqId');
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
   var timer;
    $('.btn').on('click', function(event) {
            var time = 5;
            $('.zhe').show();
            $('#cot').show();
            timer = setInterval(function() {
                time--;
                $('#cot span').html(time);
                if (time == 0) {
                    window.location.href = '201-xqperson.html';
                    clearInterval(timer);
                    $('.zhe').hide();
                    $('#cot').hide();
                    $('#cot span').html(5);
                }
            }, 1000)
        })

        $('.zhe').on('click', function(event) {
            var event = window.event || event;
            var targetId = event.target ? event.target.id : event.srcElement.id;
            if (targetId !== 'cot') {
                $('.zhe').hide();
                $('#cot').hide();
                clearInterval(timer);
                $('#cot span').html(5);
            }

        })

    $.ajax({
        type: 'get',
        url: 'http://kexiaomi.com/api/require/recommended?rq_id='+xqId,
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
            var info = data.ret;
            $('.t-txt1').html(info.rq_name);
            var tel = template('tel', info);
            $('.content').html(tel);
            $('.content li').each(function(index, ele) {
                $(ele).on('click', '.shc', function() {
                    var myId = data.ret.list[index].myresearcher_id;
                     $(this).css({
                        'background':'#ccc',
                        'border': 'none',
                    });
                    $.ajax({
                        type: 'get',
                        url: 'http://kexiaomi.com/api/require/contact?myresearch_id=' + myId,
                        dataType: 'jsonp',
                        success: function(data) {
                            console.log(data);
                            $(ele).find('.tag').html('已发送');
                        }
                    })
                })
            })
        }
    })
    $('.respond').on('click',function() {
        $.ajax({
            type: 'get',
            url: 'http://kexiaomi.com/api/require/response-list?rq_id='+xqId,
            dataType: 'jsonp',
            beforeSend:function() {
                $('.content').html('');
                $('.content').append('<div class="jz">努力加载中</div>');
            },
            success: function(data) {
                console.log(data);
                var info = data.ret;
                if(info.receive) {
                   window.location.href = '207-回应.html';
                }else {
                   window.location.href = '207-2-回应.html';
                }
            }
        })
    })
});