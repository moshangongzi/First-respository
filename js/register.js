window.addEventListener('click', function () {
    var register_btn = this.document.querySelector('#register-button-submit');
    var reset_btn = this.document.querySelector('#reset-button');
    var list_inputs = this.document.querySelectorAll('.list-input');
    var username = this.document.querySelector('#username');
    var password = this.document.querySelector('#password');
    var repass = this.document.querySelector('#repass');
    var wrong_uname_tips = this.document.querySelector('.wrong-uname-tips');
    var wrong_pwd_tips = this.document.querySelector('.wrong-pwd-tips');
    var conflict_pwd = this.document.querySelector('.conflict-pwd');
    register_btn.addEventListener('click', function () {
        var flag = true;
        var reg = /^\w{4,12}$/;
        if (!reg.test(username.value.trim())) {
            wrong_uname_tips.style.display = 'block';
            flag = false;
        }
        var reg = /^\d{6,16}$/;
        if (!reg.test(password.value.trim())) {
            wrong_pwd_tips.style.display = 'block';
            flag = false;
        }
        if (password.value.trim() !== repass.value.trim()) {
            conflict_pwd.style.display = 'block';
            flag = false;
        }
        if(flag) {
            window.location.href = '../login.html';
        }
       
    })
    reset_btn.addEventListener('click', function () {
        for (var i = 0; i < list_inputs.length; i++) {
            list_inputs[i].value = "";
        }
    })

})