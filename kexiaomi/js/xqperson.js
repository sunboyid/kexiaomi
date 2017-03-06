
//技术需求者
$(function() {
    $.ajax({
        type: 'get',
        url: 'http://www.kexiaomi.com/api/require/index',
        dataType: 'jsonp',
        timeout: 6000,
        success: function(data) {
            console.log(data);
            var index = data.ret;
            var nums = 10;
            var pages = Math.ceil(index.total / nums);
            laypage({
                cont: 'page',
                pages: pages,
                curr: 1,
                // skip: true,
                skin: '#6ae489',
                groups: 3,
                jump: function(e) {
                    $.ajax({
                        type: 'get',
                        url: 'http://kexiaomi.com/api/require/index?page=' + e.curr,
                        dataType: 'jsonp',
                        timeout: 3000,
                        beforeSend: function() {
                            $('#content').html('');
                            $('#page').hide();
                            $('#content').append('<div class="jz">努力加载中...</div>');
                        },
                        success: function(data) {
                            console.log(data);
                            $('#page').on('click', function() {})
                            var info = data.ret;
                            var myReq = template('my-req', info);
                            $('#content').html(myReq);
                            $('#page').show();
                            var arr = [];
                            var arr2 = [];
                            for (var j in info.items) {
                                arr.push(info.items[j].rq_id);
                            }
                            for (var k in info.items) {
                                arr2.push(info.items[k].status);
                            }
                            $('#content .list').each(function(index, ele) {
                                $(ele).click(function() {
                                    var $title = $(this).find('.xqName').text();
                                    $.cookie('xqName', $title, {
                                        expires: 7,
                                        path: '/'
                                    });
                                    var xqId = arr[index];
                                    var status = arr2[index];
                                    // console.log(status);
                                    $.cookie('status', status);
                                    $.cookie('xqId', xqId);
                                })
                            })
                        },
                        error: function(xmlHttpRequest, error) {
                            alert('访问超时,请重新加载');
                        }
                    })
                }
            })
        }
    })
})
