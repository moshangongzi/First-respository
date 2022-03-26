window.addEventListener('load', function () {
    var login_btn = this.document.querySelector('#login-button-submit');
    var wrong_uname_tips = this.document.querySelector('.wrong-uname-tips');
    var wrong_pwd_tips = this.document.querySelector('.wrong-pwd-tips');
    var username = this.document.querySelector('#username');
    var password = this.document.querySelector('#password');
    login_btn.addEventListener('click', function () {
        var flag = true;
        var reg1 = /^\w{4,12}$/;
        if (!reg1.test(username.value.trim())) {
            wrong_uname_tips.style.display = 'block';
            flag = false;
        }
        var reg2 = /^\d{6,16}$/;
        if (!reg2.test(password.value.trim())) {
            wrong_pwd_tips.style.display = 'block';
            flag = false;
        }
        if(flag) {
            window.location.href = './mode.html';
        }
    })
})