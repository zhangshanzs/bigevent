$(function () {
    var layer = layui.layer;
    var form = layui.form;

    initUserInfo();

    form.verify({
        nickname: [
            /^[\S]{2,6}$/
            , '昵称必须2到6位，且不能出现空格'
        ]
    });

    // 给重置设置点击事件  还原为刚开始的样子
    $('.layui-btn-primary').on('click', function (e) {
        // 1 阻止重置的默认行为
        e.preventDefault();
        // 2 渲染表单数据
        initUserInfo();
    })

    $('form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改信息失败！');
                }
                layer.msg('成功修改信息！');

                window.parent.getUserInfo();

            }
        })
    })

    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('用户信息获取失败')
                }
                // 快速赋值
                form.val("form", res.data);
            }
        })
    }
})