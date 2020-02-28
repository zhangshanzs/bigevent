$(function () {


    var form = layui.form;
    var layer = layui.layer;

    // 点击去注册后隐藏登录页面，显示注册页面
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击去登录后隐藏注册页面，显示登录页面
    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 自定义校验规则
    form.verify({
        //value：表单的值、item：表单的DOM对
        username: function (value, item) {
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },


        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        // 不符合第一个参数，就弹出第二个个参数
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        // 判断确认密码是否与第一次输入的是否一致
        samePwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                return '两次密码不一致';
            }
        }
    });


    // 注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message + '请登录');
                $('#link-login').click();
            }
        })
    })

    // 登录表单的提交事件
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }

                layer.msg('登录成功');
                // 存起来后期用
                localStorage.setItem('toke', res.token);
                location.href = '/index.html';

            }
        })
    })
})