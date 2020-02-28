
$.ajaxPrefilter(function (option) {
    // option就是调用$.ajax()时躬的配置对象
    // console.log(option);
    option.url = 'http://www.liulongbin.top:3007' + option.url


    // 只为有权限的接口 地址里有/my
    if (option.url.indexOf('/my') !== -1) {
        // 添加请求头
        option.headers = {
            Authorization: localStorage.getItem('token')
        },
            // 是否通过login.html输入用户密码登录的，不是的话就强行退出
            option.complete = function (res) {
                // console.log(res);
                if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                    //  1 清token
                    localStorage.removeItem('token');
                    // 2 跳页面
                    location.href = '/login.html';
                }
            }
    }

})