
$(function() {
    // 有效时间
    window.onbeforeunload = function() {
        var txt = $('.tit').val();
        console.log(txt);
        var content = $('#content').val();
        console.log(content);
        var time = $('.fl .fl-time').val();
        console.log(time);
        $.cookie('xqName', txt, {
            expires: 7,
            path: '/'
        });
        $.cookie('content', content, {
            expires: 7,
            paht: '/'
        });
        $.cookie('time', time, {
            expires: 7,
            path: '/'
        });
        var storage = window.localStorage;
        storage.setItem('xqName', txt);
        storage.setItem('content', content);
        storage.setItem('time', time);
        if (txt !== '' && content !== '' && time !== '') {
            $.ajax({
                type: 'post',
                async: 'false',
                url: 'http://kexiaomi.com/api/require/techrequire?title='+ txt +'&content='+ content +'&deadline=' + time,
                dataType: 'jsonp',
                timeout: 3000,
                success: function(data) {
                    var resId = data.ret;
                    $.cookie('xqId', resId);
                },
                error:function() {
                    alert('请求超时');
                }
            })
        } else if (txt == '') {
            alert('请输入标题');
        } else if (content == '') {
            alert('请输入内容');
        } else {
            alert('请选择截止日期');
        }
    }
    $('.foot').on('click', '.sub', function() {
        var txt = $('.tit').val();
        var content = $('#content').val();
        var time = $('.fl-time').val();
        console.log(txt);
        console.log(content);
        console.log(time);
        $.cookie('xqName', txt, {
            expires: 7,
            path: '/'
        });
        $.cookie('content', content, {
            expires: 7,
            paht: '/'
        });
        $.cookie('time', time, {
            expires: 7,
            path: '/'
        });
        var storage = window.localStorage;
        storage.setItem('xqName', txt);
        storage.setItem('content', content);
        storage.setItem('time', time);
        if (txt !== '' && content !== '' && time !== '') {
            $.ajax({
                type: 'post',
                url: 'http://kexiaomi.com/api/require/techrequire?title='+ txt +'&content='+ content +'&deadline=' + time,
                dataType: 'jsonp',
                timeout: 3000,
                success: function(data) {
                    console.log(data);
                    var resId = data.ret;
                    $.cookie('xqId', resId);
                    window.location.href = '203-推荐研究者.html';
                },
                error:function() {
                    alert('请求超时');
                }
            })
        } else if (txt == '') {
            alert('请输入标题');
        } else if (content == '') {
            alert('请输入内容');
        } else {
            alert('请选择截止日期');
        }
    })
});