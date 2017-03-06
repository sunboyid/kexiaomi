
$(function() {
    var a = decodeURI(window.location.search);
    a = a.substr(7, a.length - 1);
    $('#header .name').text(a);
    var mark = $('#header .name').text();
    var flag = true;
    $.ajax({
        type: 'get',
        url: 'http://www.kexiaomi.com/api/tech/related-tech?kwords=' + mark,
        dataType: 'jsonp',
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
                        url: 'http://www.kexiaomi.com/api/tech/related-tech?kwords=' + mark + '&page=' + e.curr,
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
                                // console.log(data);
                                var html = template('tec-found', info);
                                $('.content').html(html);
                                $('#page').show();

                                $('section').each(function(index, ele) {
                                    $(ele).on('tap', '.use', function() {
                                        var ss = $(this).parent().prev().find('.kl').text();
                                        $.ajax({
                                            type: 'get',
                                            url: 'http://kexiaomi.com/api/tech/isuseful?kwords=' + ss,
                                            dataType: 'jsonp',
                                            success: function(data) {
                                                if (data.code == -10) {
                                                    window.location.href = '../登陆注册/101-登陆.html';
                                                } else {
                                                    alert('感谢您的支持');
                                                }
                                            }
                                        })
                                    });
                                    $(ele).on('tap', '.no-use', function() {
                                        var ss = $(this).parent().prev().find('.kl').text();
                                        // console.log(ss);
                                        $.ajax({
                                            type: 'get',
                                            url: 'http://kexiaomi.com/api/tech/isuseful?kwords=' + ss,
                                            dataType: 'jsonp',
                                            success: function(data) {
                                                if (data.code == -10) {
                                                    window.location.href = '../登陆注册/101-登陆.html';
                                                } else {
                                                    alert('我们再接再厉');
                                                }
                                            }
                                        })
                                    })
                                })
                            }
                        }
                    })
                }
            })
        },
        error: function(err, errmsg) {
            alert('请求已超时,请重新加载');
        }
    });

    $('.nav').on('tap', 'li', function() {
        var that = $(this);
        if (flag) {
            that.find('img').css('transform', 'rotate(180deg)');
        } else {
            that.find('img').css('transform', 'rotate(0deg)');
        }
        $.ajax({
            type: 'get',
            url: 'http://www.kexiaomi.com/api/tech/related-tech?kwords=' + mark,
            dataType: 'jsonp',
            beforeSend: function() {
                $('.content').html('');
                $('#page').hide();
                $('.content').append('<div class="jz">努力加载中...</div>');
            },
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
                        if (flag) {
                            that.find('img').css('transform', 'rotate(180deg)');
                            var tec = $.trim(that.text());
                            // console.log(tec);
                            $.ajax({
                                type: 'get',
                                url: 'http://www.kexiaomi.com/api/tech/related-tech?kwords=' + mark + '&by=' + tec + '&order=2',
                                dataType: 'jsonp',
                                success: function(data) {
                                    var info = data.ret;
                                    // console.log(data);
                                    var html = template('tec-found', info);
                                    $('.content').html(html);
                                    $('#page').show();
                                    $('section').each(function(index, ele) {
                                        $(ele).on('tap', '.use', function() {
                                            var ss = $(this).parent().prev().find('.kl').text();
                                            $.ajax({
                                                type: 'get',
                                                url: 'http://kexiaomi.com/api/tech/isuseful?kwords=' + ss,
                                                dataType: 'jsonp',
                                                success: function(data) {
                                                    if (data.code == -10) {
                                                        window.location.href = '../登陆注册/101-登陆.html';
                                                    } else {
                                                        alert('感谢您的支持');
                                                    }
                                                }
                                            })
                                        });
                                        $(ele).on('tap', '.no-use', function() {
                                            var ss = $(this).parent().prev().find('.kl').text();
                                            // console.log(ss);
                                            $.ajax({
                                                type: 'get',
                                                url: 'http://kexiaomi.com/api/tech/isuseful?kwords=' + ss,
                                                dataType: 'jsonp',
                                                success: function(data) {
                                                    if (data.code == -10) {
                                                        window.location.href = '../登陆注册/101-登陆.html';
                                                    } else {
                                                        alert('我们再接再厉');
                                                    }
                                                }
                                            })
                                        })
                                    })
                                }
                            })
                        } else {
                            that.find('img').css('transform', 'rotate(0deg)');
                            var tec = $.trim(that.text());
                            // console.log(tec);
                            $.ajax({
                                type: 'get',
                                url: 'http://www.kexiaomi.com/api/tech/related-tech?kwords=' + mark + '&by=' + tec + '&order=1',
                                dataType: 'jsonp',
                                success: function(data) {
                                    var info = data.ret;
                                    // console.log(data);
                                    var html = template('tec-found', info);
                                    $('.content').html(html);
                                    $('#page').show();
                                    $('section').each(function(index, ele) {
                                        $(ele).on('tap', '.use', function() {
                                            var ss = $(this).parent().prev().find('.kl').text();
                                            $.ajax({
                                                type: 'get',
                                                url: 'http://kexiaomi.com/api/tech/isuseful?kwords=' + ss,
                                                dataType: 'jsonp',
                                                success: function(data) {
                                                    if (data.code == -10) {
                                                        window.location.href = '../登陆注册/101-登陆.html';
                                                    } else {
                                                        alert('感谢您的支持');
                                                    }
                                                }
                                            })
                                        });
                                        $(ele).on('tap', '.no-use', function() {
                                            var ss = $(this).parent().prev().find('.kl').text();
                                            // console.log(ss);
                                            $.ajax({
                                                type: 'get',
                                                url: 'http://kexiaomi.com/api/tech/isuseful?kwords=' + ss,
                                                dataType: 'jsonp',
                                                success: function(data) {
                                                    if (data.code == -10) {
                                                        window.location.href = '../登陆注册/101-登陆.html';
                                                    } else {
                                                        alert('我们再接再厉');
                                                    }
                                                }
                                            })
                                        })
                                    })
                                }
                            })
                        }
                        flag = !flag

                    }
                })
            }
        })
    });


    $('.buy').on('tap', function() {
        $.ajax({
            type: 'post',
            url: 'http://kexiaomi.com/api/tech/buyreport?kwords=' + mark,
            dataType: 'jsonp',
            beforeSend: function() {
                alert('小觅将在24小时内联系您');
            },
            success: function(data) {
                if (data.code == -10) {
                    window.location.href = '../login/101-login.html';
                }
            }
        })
    })
})
