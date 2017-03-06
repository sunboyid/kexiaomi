//付费咨询
$(function() {
    var d = window.location.search;
    d = d.substr(4, d.length - 1);
    console.log(d);
    $.ajax({
        type: 'get',
        url: 'http://www.kexiaomi.com/api/tech/researcher?id=' + d,
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
            if (data.code == -10) {
                window.location.href = '../登陆注册/101-登陆.html';
            } else {
                var userId = data.ret.id;
                var head = template('res-head', data);
                $('header').html(head);
                var content = template('res-content', data);
                $('.content').html(content);
                $('.patent .zl-content').hide();
                $('.patent .zl-content:first-child').show();
                $('.patent .zl-content:nth-child(2)').show();
                $('.patent').on('click', '.more', function() {
                    if ($(this).text() == '查看更多') {
                        $('.patent .zl-content').show();
                        $(this).text('收起');
                        $(this).click(function() {
                            $('.patent .zl-content').hide();
                            $('.patent .zl-content:first-child').show();
                            $('.patent .zl-content:nth-child(2)').show();
                        })
                    } else {
                        $(this).text('查看更多');
                    }
                    return false;
                })
                $('.work .report').hide();
                $('.work .report:first-child').show();
                $('.work .report:nth-child(2)').show();
                $('.work').on('click', '.more-two', function() {
                    if ($(this).text() == '查看更多') {
                        $('.work .report').show();
                        $(this).text('收起');
                        $(this).click(function() {
                            $('.work .report').hide();
                            $('.work .report:first-child').show();
                            $('.work .report:nth-child(2)').show();
                        })
                    } else {
                        $(this).text('查看更多');
                    }
                    return false;
                })
                $('.rec').on('click', '.more-intro', function() {
                    if ($(this).text() == '查看更多') {
                        $('.rec .list-cont').css('overflow', 'visibility').height('100%');
                        $(this).text('收起');
                        $(this).click(function() {
                            $('.rec .list-cont').css('overflow', 'hidden').height('2.5rem');
                        })
                    } else {
                        $(this).text('查看更多');
                    }
                    return false;
                })
                $('.h-bot div').slice(2).hide();
                $('header').on('click', '.zhk', function() {
                    if ($(this).text() == '展开更多') {
                        $(this).text('收起');
                        $('.h-bot div').slice(2).show();
                        $(this).click(function() {
                            $('.h-bot div').slice(2).hide();
                        })
                    } else {
                        $(this).text('展开更多');
                    }
                });
                $('.content').on('click', '.add', function() {
                    $.ajax({
                        type: 'get',
                        url: 'http://www.kexiaomi.com/api/tech/collect-researcher?id=' + d,
                        dataType: 'jsonp',
                        success: function(data) {
                            if (data.code == -10) {
                                window.location.href = '../登陆注册/101-登陆.html';
                            } else {
                                alert('收藏成功');
                            }
                        }
                    })
                });
                $('.content .zy').each(function(index, ele) {
                    $(ele).on('click', function() {
                        var patentId = data.ret.patent[index].id;
                        $.ajax({
                            type: 'post',
                            url: 'http://www.kexiaomi.com/api/tech/transfer-patent?id=' + patentId,
                            dataType: 'jsonp',
                            success: function(data) {
                                if (data.code == -10) {
                                    window.location.href = '../登陆注册/101-登陆.html';
                                }
                            }

                        })
                    })
                });
            }
        }
    })

    $('.tk').hide();
    $('.tk-cont').hide();
    $('.content').on('click', '.zy', function() {
        $('.tk').show();
        $('.tk-cont').show();
    });

    $('.tk').click(function() {
        $('.tk').hide();
        $('.tk-cont').hide();
    });

    $('.tk-cont button').click(function() {
        $('.tk').hide();
        $('.tk-cont').hide();
    });

});
