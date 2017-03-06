
//注册提供者
$(function() {
    $('.sub').click(function() {
        var email = $('.email').val();
        var password = $('.password').val();
        var dw = $('.dw').val();
        var name = $('.name').val();
        var tel = $('.tel').val();
        var verCode = $('.verCode').val();
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;


        if (email == '') {
            alert('邮箱号不能为空！');
        } else if (!reg.test(email)) {
            alert("邮箱格式不对！");
            $('.email').val('');
            return false;
        } else if (password == '') {
            alert('请输入密码！');
        } else if (dw == '') {
            alert('请输入单位名称！');
        } else if (name == '') {
            alert('请输入姓名！');
        } else if (tel == '') {
            alert('手机号码不能为空！');
        } else if (tel.length != 11) {
            alert('请输入有效的手机号码！');
            $('.tel').val('');
            return false;
        } else if (!myreg.test(tel)) {
            alert('请输入有效的手机号码！');
            $('.tel').val('');
            return false;
        } else if (verCode == '') {
            alert('请输入正确验证码！');
        } else {
            $.ajax({
                type: 'get',
                url: 'http://kexiaomi.com/api/wechat/register',
                data: { 'email': email, 'username': name, 'password': password, 'password_repeat': password, 'telephone': tel, 'enp_name': dw, 'type': 1 },
                dataType: 'jsonp',
                success: function(data) {
                    // console.log(data);
                    if (data.code == 0) {
                        alert('注册成功');
                        window.location.href = '106-bdres.html';
                    }
                }
            })
        }

    });
});

// 获取验证码
var getYzm = $('.get-yzm');
var href = getYzm.attr('href');
var hrefOnoff = true;
getYzm.on('click', function() {
    if (hrefOnoff) {
        var mobile = $('.tel').val();
        $.ajax({
                type: 'get',
                url: 'http://kexiaomi.com/api/wechat/verty-code?telephone=' + mobile,
                dataType: 'jsonp',
                success: function(data) {
                    // console.log(data);
                }
            })
            //这个时候是尚未点击过
        var n = 10;
        getYzm.css('background', '#ccc');
        getYzm.css('color', '#fff');
        getYzm.css('border', '1px solid #ccc');
        getYzm.html(n + 'S后重新获取');
        getYzm.attr('href', 'javascript:;');
        hrefOnoff = false;
        var timer = setInterval(function() {
            n--;
            getYzm.html(n + 'S后重新获取');
            if (n < 0) {
                getYzm.css('background', '#fff');
                getYzm.css('border', '1px solid #ececec');
                getYzm.css('color', '#f73333');
                getYzm.html('获取验证码');
                getYzm.attr('href', href);
                hrefOnoff = true;
                n = 10;
                clearInterval(timer);
            }
        }, 1000);
    }
});
