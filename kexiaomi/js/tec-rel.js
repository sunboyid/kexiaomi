
$(function() {
    var c = decodeURI(window.location.search);
    c = c.substr(5, c.length - 1);
    $('.btn').on('tap', function() {
        var feilei = $('.txt').val();
        $.ajax({
            type: 'get',
            url: 'http://www.kexiaomi.com/api/tech/search-tech?kwords=' + feilei,
            dataType: 'jsonp',
            jsonpCallback: '',
            timeout: 6000,

            success: function(data) {
                console.log(data);
                var total = data.ret.total;
                var nums = 10;
                var pages = Math.ceil(total / nums);
                laypage({
                    cont: 'page',
                    pages: pages,
                    curr: 1,
                    skin: '#6ae489',
                    groups: 3,
                    jump: function(e) {
                        $.ajax({
                            type: 'get',
                            url: 'http://www.kexiaomi.com/api/tech/search-tech?kwords=' + feilei + '&page=' + e.curr,
                            dataType: 'jsonp',
                            timeout: 6000,
                            beforeSend: function() {
                                $('.content').html('');
                                $('#page').hide();
                                $('.content').append('<div class="jz">努力加载中...</div>');
                            },
                            success: function(data) {
                                console.log(data);
                                if (data.code == -10) {
                                    window.location.href = '../登陆注册/101-登陆.html';
                                } else {
                                    var info = data.ret;
                                    if (info.items == false) {
                                        $('.content').html('没有相关信息').addClass('add');
                                    } else {
                                        $('.content').removeClass('add');
                                        var html = template('tec-rel', info);
                                        $('.content').html(html);
                                        $('#page').show();
                                        $('section').each(function(index, ele) {
                                            $(ele).on('tap', '.sc', function() {
                                                var mz = $(this).siblings().text();
                                                $.ajax({
                                                    type: 'get',
                                                    url: 'http://kexiaomi.com/api/tech/collect-tech?name=' + mz,
                                                    dataType: 'jsonp',
                                                    success: function(data) {
                                                        if (data.code == -10) {
                                                            window.location.href = '../登陆注册/101-登陆.html';
                                                        } else {
                                                            alert('收藏成功');
                                                        }
                                                    }
                                                })
                                                return false;
                                            });
                                            $(ele).on('tap', '.inp-tec', function() {
                                                var mz = $(this).parent().siblings('.contain-head').find('span').text();
                                                mz = encodeURI(mz);
                                                window.location.href = '302-技术难点.html?title=' + mz;
                                            });
                                            $(ele).on('tap', '.inp-patent', function() {
                                                var mz = $(this).parent().siblings('.contain-head').find('span').text();
                                                mz = encodeURI(mz);
                                                window.location.href = '304-相关专业.html?title=' + mz;
                                            })
                                        })
                                    }
                                }
                            }
                        })
                    }
                })

            },
            error: function(err, errmsg) {
                alert('请求已超时,请重新加载');
            },
            complete:function() {

            }
        })
    })
    $.ajax({
        type: 'get',
        url: 'http://www.kexiaomi.com/api/tech/search-tech?kwords=' + c,
        dataType: 'jsonp',
        timeout: 6000,
        success: function(data) {
            var total = data.ret.total;
            var nums = 10;
            var pages = Math.ceil(total / nums);
            laypage({
                cont: 'page',
                pages: pages,
                curr: 1,
                skin: '#6ae489',
                groups: 3,
                jump: function(e) {
                    $.ajax({
                        type: 'get',
                        url: 'http://www.kexiaomi.com/api/tech/search-tech?kwords=' + c + '&page=' + e.curr,
                        dataType: 'jsonp',
                        beforeSend: function() {
                            $('.content').html('');
                            $('#page').hide();
                            $('.content').append('<div class="jz">努力加载中...</div>');
                        },
                        success: function(data) {
                            if (data.code == -10) {
                                window.location.href = '../login/101-login.html';
                            } else {
                                var info = data.ret;
                                if (info.items == false) {
                                    $('.content').html('没有相关信息').addClass('add');
                                } else {
                                    $('.content').removeClass('add');
                                    var html = template('tec-rel', info);
                                    $('.content').html(html);
                                    $('#page').show();
                                    $('section').each(function(index, ele) {
                                        $(ele).on('tap', '.sc', function() {
                                            var mz = $(this).siblings().text();
                                            $.ajax({
                                                type: 'get',
                                                url: 'http://kexiaomi.com/api/tech/collect-tech?name=' + mz,
                                                dataType: 'jsonp',
                                                success: function(data) {
                                                    if (data.code == -10) {
                                                        window.location.href = '../login/101-login.html';
                                                    } else {
                                                        alert('收藏成功');
                                                    }
                                                }
                                            })
                                            return false;
                                        });
                                        $(ele).on('tap', '.inp-tec', function() {
                                            var mz = $(this).parent().siblings('.contain-head').find('span').text();
                                            mz = encodeURI(mz);
                                            window.location.href = '302-技术难点.html?title=' + mz;
                                        });
                                        $(ele).on('tap', '.inp-patent', function() {
                                            var mz = $(this).parent().siblings('.contain-head').find('span').text();
                                            mz = encodeURI(mz);
                                            window.location.href = '304-相关专业.html?title=' + mz;
                                        })
                                    })
                                }
                            }
                        }
                    })
                }
            })

        },
        error: function(err, errmsg) {
            alert('请求已超时');
        }
    });
})
