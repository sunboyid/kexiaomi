$(function() {
    var b = decodeURI(window.location.search);
    b = b.substr(7, b.length - 1);
    $('.prompt .name').text(b);
    var mark = $('.prompt .name').text();
    var flag = true;
    $.ajax({
        type: 'get',
        url: 'http://www.kexiaomi.com/api/tech/relatedpatent?kwords=' + mark,
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
            if (data.code == -10) {
                window.location.href = '../login/101-login.html';
            } else {
                var major = template('major', data);
                $('.content').html(major);
                $('.c-list').each(function(index, ele) {
                    $(ele).on('tap', '.shc', function() {
                        var title = $.trim($(this).prev('.fl').text());
                        $.ajax({
                            type: 'get',
                            url: 'http://kexiaomi.com/api/tech/collect-tech?name=' + title,
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
                    $(ele).on('click', '.zy', function() {
                        var info = data.ret;
                        var patentId = info[index].id;
                        $('.tk').show();
                        $('.tk-cont').show();
                        $('.tk').click(function() {
                            $('.tk').hide();
                            $('.tk-cont').hide();
                        });
                        var that = $(this);
                        $('.tk-cont button').click(function() {
                            $('.tk').hide();
                            $('.tk-cont').hide();
                        });
                        $.ajax({
                            type: 'get',
                            url: 'http://kexiaomi.com/api/tech/transfer-patent?id=' + patentId,
                            dataType: 'jsonp',
                            success: function(data) {
                                if (data.code == 1) {
                                    that.html('已转移').css('background', '#ccc');
                                    that.off();
                                }
                            }
                        })
                    })
                })
            }

        }
    })

    $('.nav').on('tap', 'li', function() {
        if (flag) {
            $(this).find('img').css('transform', 'rotate(180deg)');
            var tec = $.trim($(this).text().trim());
            // console.log(tec);
            $.ajax({
                type: 'get',
                url: 'http://www.kexiaomi.com/api/tech/relatedpatent?kwords=' + mark + '&by=' + tec + '&order=2',
                dataType: 'jsonp',
                beforeSend: function() {
                    $('.content').html('');
                    $('.content').append('<div class="jz">努力加载中...</div>');
                },
                success: function(data) {
                    var major = template('major', data);
                    $('.content').html(major);
                    $('.c-list').each(function(index, ele) {
                        $(ele).on('tap', '.shc', function() {
                            var title = $.trim($(this).prev('.fl').text());
                            $.ajax({
                                type: 'get',
                                url: 'http://kexiaomi.com/api/tech/collect-tech?name=' + title,
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
                        $(ele).on('click', '.zy', function() {
                            var info = data.ret;
                            var patentId = info[index].id;
                            $('.tk').show();
                            $('.tk-cont').show();
                            $('.tk').click(function() {
                                $('.tk').hide();
                                $('.tk-cont').hide();
                            });
                            var that = $(this);
                            $('.tk-cont button').click(function() {
                                $('.tk').hide();
                                $('.tk-cont').hide();
                            });
                            $.ajax({
                                type: 'get',
                                url: 'http://kexiaomi.com/api/tech/transfer-patent?id=' + patentId,
                                dataType: 'jsonp',
                                success: function(data) {
                                    if (data.code == 1) {
                                        that.html('已转移').css('background', '#ccc');
                                        that.off();
                                    }
                                }
                            })
                        })
                    })
                }
            })
        } else {
            $(this).find('img').css('transform', 'rotate(0deg)');
            var tec = $.trim($(this).text().trim());
            // console.log(tec);
            $.ajax({
                type: 'get',
                url: 'http://www.kexiaomi.com/api/tech/relatedpatent?kwords=' + mark + '&by=' + tec + '&order=1',
                dataType: 'jsonp',
                beforeSend: function() {
                    $('.content').html('');
                    $('.content').append('<div class="jz">努力加载中...</div>');
                },
                success: function(data) {
                    var major = template('major', data);
                    $('.content').html(major);
                    $('.c-list').each(function(index, ele) {
                        $(ele).on('tap', '.shc', function() {
                            var title = $(this).prev('.fl').text().trim();
                            $.ajax({
                                type: 'get',
                                url: 'http://kexiaomi.com/api/tech/collect-tech?name=' + title,
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
                        $(ele).on('click', '.zy', function() {
                            var info = data.ret;
                            var patentId = info[index].id;
                            $('.tk').show();
                            $('.tk-cont').show();
                            $('.tk').click(function() {
                                $('.tk').hide();
                                $('.tk-cont').hide();
                            });
                            var that = $(this);
                            $('.tk-cont button').click(function() {
                                $('.tk').hide();
                                $('.tk-cont').hide();
                            });
                            $.ajax({
                                type: 'get',
                                url: 'http://kexiaomi.com/api/tech/transfer-patent?id=' + patentId,
                                dataType: 'jsonp',
                                success: function(data) {
                                    if (data.code == 1) {
                                        that.html('已转移').css('background', '#ccc');
                                        that.off();
                                    }
                                }
                            })
                        })
                    })
                }
            })
        }
        flag = !flag
    });
    $('.sub').on('tap', function() {
        $.ajax({
            type: 'post',
            url: 'http://kexiaomi.com/api/tech/buyreport?kwords=' + mark,
            dataType: 'jsonp',
            beforeSend: function() {
                alert('小觅将在24小时内联系您');
            },
            success: function(data) {
                // console.log(data);
                if (data.code == -10) {
                    window.location.href = '../登陆注册/101-登陆.html';
                }
            }
        })
    })

});
