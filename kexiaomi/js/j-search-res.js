$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 60) {
            $('.nav-head').css({
                'position': 'fixed',
                'top': 0,
            });
        } else {
            $('.nav-head').css('position', '');
        }
    })
    var page = parseInt($.cookie('page')) || 1;
    var key = $.cookie('kwd');
    var subSelect,
        wzSelect,
        professSelect;
    $.cookie('pos','');
    $.cookie('pro','');
    $.cookie('sub','');
    var profess = $.cookie('profess');
    pubSelect();
    ajaxSelect({
        'key': '',
        'pos': '',
        'title': '',
        'class': '',
    });

    //下面是筛选+分页

    // 位置
    $('.pos').on('click', function() {
        $('.head').hide();
        $('.sel').show();
        $('.zhe').show();
        $('.show').show();
        $('.sub-val').hide();
        $('.profess-val').hide();
        $('.nav').css('position', 'fixed');
        $('body').css('overflow', 'hidden');
        $('.pos-val').show();
        $('.pos-head').find('.qy').css('background', '#6ae489');
    })
    $('.pos-val').on('click', '.now', function() {
        var key = $('.fl').val();
        pubSelect();
        $('.head').show();
        $('.sel').hide();
        $('.zhe').hide();
        $('.show').hide();
        $('.nav').css('position', '');
        $('body').css('overflow', '');
        $('.sub-val').hide();
        ajaxSelect({
            'key': key,
            'pos': wzSelect,
            'class': subSelect,
            'title': professSelect
        })
    })

    $('.pos-val').on('click', '.bj', function() {
        $('.pos-one').show();
        $('.pos-two').hide();
        $('.pos-three').hide();
        $(this).css('background','#6ae489');
        $('.pos-val').find('.nj').css('background','');
        $('.pos-val').find('.qg').css('background','');
    })
    $('.pos-val').on('click', '.nj', function() {
        $('.pos-two').show();
        $('.pos-one').hide();
        $('.pos-three').hide();
        $(this).css('background','#6ae489');
        $('.pos-val').find('.bj').css('background','');
        $('.pos-val').find('.qg').css('background','');
    })
    $('.pos-val').on('click', '.qg', function() {
        $('.pos-three').show();
        $('.pos-one').hide();
        $('.pos-two').hide();
        $(this).css('background','#6ae489');
        $('.pos-val').find('.bj').css('background','');
        $('.pos-val').find('.nj').css('background','');
    })
    posSelect('.pos-one');
    posSelect('.pos-two');
    posSelect('.pos-three');



    // 学科
    $('.sub').on('click', function() {
        $('.head').hide();
        $('.sel').show();
        $('.zhe').show();
        $('.show').show();
        $('.pos-val').hide();
        $('.profess-val').hide();
        $('.nav').css('position', 'fixed');
        $('body').css('overflow', 'hidden');
        $('.sub-val').show();
    })
    $('.sub-val').find('li').each(function(index, ele) {
        $(this).on('click', function() {
            var key = $('.fl').val();
            // pubSelect();
            var text = $(this).find('span').text();
            $.cookie('sub', text);
            $('.sub .suj').text(text);
            console.log(text);
            $('.head').show();
            $('.sel').hide();
            $('.zhe').hide();
            $('.show').hide();
            $('.nav').css('position', '');
            $('body').css('overflow', '');
            $('.sub-val').hide();
            pubSelect();
            ajaxSelect({
                'key': key,
                'pos': wzSelect,
                'class': text,
                'title': professSelect
            })
        })
    })


    // 职称
    $('.profess').on('click', function() {
        $('.head').hide();
        $('.sel').show();
        $('.zhe').show();
        $('.show').show();
        $('.pos-val').hide();
        $('.sub-val').hide();
        $('.nav').css('position', 'fixed');
        $('body').css('overflow', 'hidden');
        $('.profess-val').show();
    })
    $('.profess-val').find('li').each(function(index, ele) {
        $(this).on('click', function() {
            var text = $(this).text();
            // console.log(text);
            $.cookie('pro', text);
            $('.profess .zc').text(text);
            var key = $('.fl').val();
            $('.head').show();
            $('.sel').hide();
            $('.zhe').hide();
            $('.show').hide();
            $('.nav').css('position', '');
            $('body').css('overflow', '');
            $('.profess-val').hide();
            pubSelect();
            ajaxSelect({
                'key': key,
                'pos': wzSelect,
                'class': subSelect,
                'title': text
            })
        })
    })


    // 遮罩
    $('.zhe').on('click', function() {
        $(this).hide();
        $('.head').show();
        $('.sel').hide();
        $('.show').hide();
        $('.nav').css('position', '');
        $('body').css('overflow', '');
        $('.sub-val').hide();
    })


    // 搜索
    $('.ss').on('click', function() {
        var key = $('.fl').val();
        $.cookie('kwd', key);
        pubSelect();
        ajaxSelect({
            'key': key,
            'pos': wzSelect,
            'class': subSelect,
            'title': professSelect,
        })
    })


    // 下一页
    $('.fenye').on('click', '.next', function() {
        var key = $('.fl').val();
        var pro = $.cookie('pro') || '';
        var pos = $.cookie('pos') || '';
        var sub = $.cookie('sub') || '';
        console.log(sub);
        PageNext({
            'key': key,
            'pos': pos,
            'class': sub,
            'title': pro,
        })
    })


    // 上一页
    $('.fenye').on('click', '.prev', function() {
            var key = $('.fl').val();
            var pro = $.cookie('pro') || '';
            var pos = $.cookie('pos') || '';
            var sub = $.cookie('sub') || '';
            PagePrev({
                'key': key,
                'pos': pos,
                'class': sub,
                'title': pro,
            })
        })
     
        // 分页
    function pubSelect() {
        if ($('.pos .wz').text() !== '位置') {
            wzSelect = $('.pos .wz').text();
        } else {
            wzSelect = '';
        }
        if ($('.sub .suj').text() !== '学科') {
            subSelect = $('.sub .suj').text();

        } else {
            subSelect = '';
        }
        if ($('.profess .zc').text() !== '职称') {
            professSelect = $('.profess .zc').text();

        } else {
            professSelect = '';
        }
    }


    //筛选ajax
    function ajaxSelect(obj) {
        var page = $.cookie('page') || 1;
        $.ajax({
            type: 'get',
            url: 'http://www.kexiaomi.com/api/tech/search-researcher?kwords=' + obj.key + '&opt=' + obj.pos + '&class=' + obj.class + '&title=' + obj.title + '&page=' + page,
            dataType: 'jsonp',
            timeout: 6000,
            beforeSend: function() {
                $('.content').html('');
                $('.content').append('<div class="jz">努力加载中...</div>');
                $('.fenye').hide();
            },
            success: function(data) {
                console.log(data);
                var info = data.ret;
                var num = info.items;
                var sub = template('search-per', info);
                $('.content').html(sub);
                $('.fenye').show();
                 $('.content .xq').each(function(index, ele) {
                    $(ele).on('click', '.shc', function() {
                        var userid = num[index].id;
                        $.ajax({
                            type: 'get',
                            url: 'http://www.kexiaomi.com/api/tech/collect-researcher?id=' + userid,
                            dataType: 'jsonp',
                            success: function(data) {
                            	if(data.code == 0) {
                            		alert('收藏成功');
                            	}
                            }
                        })
                        return false;
                    });
                    $(ele).on('click', function() {
                        var userid = num[index].id;
                        $.cookie('yjid', userid);
                    })
                })
                if (info.has_more) {
                    $('.fenye').find('.next').show();
                } else {
                    $('.fenye').find('.next').hide();
                }
            },
            error: function() {
                alert('请求超时,请重新加载');
            }
        })
        if (page < 2) {
            page = 1;
            $('.fenye').find('.prev').hide();
            $('.fenye').find('.next').css('margin-left', '30%');
        } else {
            $('.fenye').find('.prev').show();
            $('.fenye').find('.next').css('margin-left', '');
        }
    }
    // 分页ajax
    function ajaxPage(obj) {
        $.ajax({
            type: 'get',
            url: 'http://www.kexiaomi.com/api/tech/search-researcher?kwords=' + obj.key + '&opt=' + obj.pos + '&class=' + obj.class + '&title=' + obj.title + '&page=' + page,
            dataType: 'jsonp',
            timeout: 6000,
            beforeSend: function() {
                $('.content').html('');
                $('.content').append('<div class="jz">努力加载中...</div>');
                $('.fenye').hide();
            },
            success: function(data) {
                // console.log(data);
                var info = data.ret;
                var sub = template('search-per', info);
                $('.content').html(sub);
                $('.fenye').show();               
                if (info.has_more) {
                    $('.fenye').find('.next').show();
                } else {
                    $('.fenye').find('.next').hide();
                }
            },
            error: function() {
                alert('请求超时,请重新加载');
            }
        })
        if (page < 2) {
            page = 1;
            $('.fenye').find('.prev').hide();
            $('.fenye').find('.next').css('margin-left', '30%');
        } else {
            $('.fenye').find('.prev').show();
            $('.fenye').find('.next').css('margin-left', '');
        }
    }


    // 下一页
    function PageNext(obj) {
        page = page + 1;
        $.cookie('page', page);
        ajaxPage(obj);
    }

    // 上一页
    function PagePrev(obj) {
        page = page - 1;
        $.cookie('page', page);
        ajaxPage(obj);
    }


    // 位置筛选ajax
    function posSelect(e) {
        $(e).find('li').each(function(index, ele) {
            $(this).on('click', function() {
                var page = $.cookie('page') || 1;
                var val = $(this).text();
                var key = $('.fl').val();
                $.cookie('pos', val);
                // console.log(val);
                $('.head').show();
                $('.sel').hide();
                $('.zhe').hide();
                $('.show').hide();
                $('.nav').css('position', '');
                $('body').css('overflow', '');
                $('.pos .wz').text(val);
                pubSelect();
                $.ajax({
                    type: 'get',
                    url: 'http://www.kexiaomi.com/api/tech/search-researcher?kwords=' + key + '&dpt=' + val + '&class=' + subSelect + '&title=' + professSelect + '&page=' + page,
                    dataType: 'jsonp',
                    timeout: 6000,
                    beforeSend: function() {
                        $('.content').html('');
                        $('.content').append('<div class="jz">努力加载中...</div>');
                        $('.fenye').hide();
                    },
                    success: function(data) {
                        // console.log(data);
                        var info = data.ret;
                        var sub = template('search-per', info);
                        $('.content').html(sub);
                        $('.fenye').show();
                        if (info.has_more) {
                            $('.fenye').find('.next').show();
                        } else {
                            $('.fenye').find('.next').hide();
                        }
                    },
                    error: function() {
                        alert('请求超时,请重新加载');
                    }
                })
                if (page < 2) {
                    page = 1;
                    $('.fenye').find('.prev').hide();
                    $('.fenye').find('.next').css('margin-left', '30%');
                } else {
                    $('.fenye').find('.prev').show();
                    $('.fenye').find('.next').css('margin-left', '');
                }
            })
        })
    }

})
