$(function () {
    getUserInfo();

    // 退出
    $('#logout').on('click', function () {

        // 弹出提示层
        layui.layer.confirm('确认退出吗？', { icon: 3, title: '提示' }, function (index) {
            //  1 清token
            localStorage.removeItem('token');
            // 2 跳页面
            location.href = '/login.html';

            layer.close(index);
        });

    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // 添加请求头 统一添加到baseAPI.js
        /*  headers: {
             Authorization: localStorage.getItem('token')
         }, */
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染用户头像及文本内容     
            rederAvatar(res.data);
        }

        // 写到baseAPI.js
        /*    complete: function (res) {
               // console.log(res);
               if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                   //  1 清token
                   localStorage.removeItem('token');
                   // 2 跳页面
                   location.href = '/login.html';
               }
           } */
    })
}


// 渲染用户头像及文本内容
function rederAvatar(user) {
    // 渲染文本内容
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // $('#welcome').text('欢迎       ' + name)


    // 渲染用户头像
    if (user.user_pic) {
        // 有图片就显示图片头像
        $('.layui-nav-img').prop('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 没有图片就显示文本头像
        $('.layui-nav-img').hide();
        // name[0]可以取字符串的第一位
        // toUpperCase()转为大写
        $('.text-avatar').html(name[0].toUpperCase()).show();
    }

}