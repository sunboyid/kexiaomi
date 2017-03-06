
//手机登录验证
$(function() {
        var flag = true;
        var regt = $('#check');
        var regMobile = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
        regt.on('click', function() {

            if (!regMobile.test($('#mobile').val()) && $('#mobile').val() !== '') {
                alert('您的手机号码格式不正确');
                flag = false;
            } else if ($('#mobile').val() == '') {
                alert('请输入手机号');
                flag = false;
            }
            if (flag) {
                var mobile = $('#mobile').val();
                $.ajax({
                    type: 'get',
                    url: 'http://kexiaomi.com/api/wechat/verty-code?telephone='+mobile,
                    dataType: 'jsonp',
                    success: function(data) {
                        console.log(data);
                        console.log(data.ret);
                        $('.check').val(data.ret);
                    }
                })
                var n = 10;
                regt.css('color', '#ccc');
                regt.attr('href', 'javascript:;');
                regt.html(n + 'S后重新获取');
                regt.css('fontSize', '0.5rem');
                regt.css('background', '#fff');
                flag = false;
                var timer = setInterval(function() {
                    n--;
                    regt.html(n + 'S后重新获取');
                    regt.css('background', '#fff');
                    if (n < 1) {
                        n = 10;
                        regt.css('color', '#fff');
                        regt.html('获取验证码');
                        regt.css('background', '#69e489')
                        regt.css('fontSize', '0.7rem')
                        flag = true;
                        clearInterval(timer);
                    }
                }, 1000)
            };
            if (regt.html() == '获取验证码') {
                flag = true;
            };
        });
        $('#ent').on('click', function() {
            var mobile = $('#mobile').val();
            var pwd = $('.check').val();
            if (mobile == '') {
                alert('请输入手机号');
            } else if (!regMobile.test(mobile)) {
                alert('您的手机号码格式不正确');
            } else if ($('.check').val() == '') {
                alert('请输入验证码');
            } else {
                var phone = $.cookie('phone');
                if (phone !== mobile) {
                    $.ajax({
                        type: 'post',
                        url: 'http://www.kexiaomi.com/api/wechat/plogin?phone=' + mobile + '&password=' + pwd,
                        dataType: 'jsonp',
                        success: function(data) {
                            console.log(data);
                            if (data.code == 1) {
                                alert('登录失败');
                            } else {
                                $.cookie('phone', mobile, {
                                    expires: 7,
                                    path: '/'
                                });
                            }
                        }
                    })
                } else {
                    alert('已登录过');
                }

            }
        });
       
    })