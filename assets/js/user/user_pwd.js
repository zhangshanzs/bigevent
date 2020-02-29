$(function () {
    var form = layui.form;
    var layer = layui.layer;

    // 表单验证规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newpassword: function (value) {
            var pwd = $('[name = oldPwd]').val();
            if (pwd === value) {
                return '新旧密码不能一致'
            }
        },
        samepassword: function (value) {
            var pwd = $('[name = newPwd]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });


    // 修改密码
    $('#form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                // 重置表单
                $('#form')[0].reset();
            }
        })
    })
})