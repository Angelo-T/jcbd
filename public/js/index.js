var app = new Vue({
    el: "#app",
    data() {
        return {
            login: {
                uname: "",
                uemail: "",
                upsw: "",
                rmpsw: 0,
                checkcode: ""
            },
            register: {
                uname: "",
                uemail: "",
                upsw: "",
                checkpsw: ""
            }
        }
    },
    methods: {
        get_login() {
            var loginData = {};
            if (app._data.login.uname == "") {
                loginData = {
                    uemail: app._data.login.uemail,
                    upsw: app._data.login.upsw,

                }
            } else {
                loginData = {
                    uname: app._data.login.uname,
                    upsw: app._data.login.upsw
                }
            }
            axios({
                    method: 'post',
                    url: "http://www.rcloud.cn/tp/public/index/get_login",
                    data: loginData
                })
                .then(res => {
                    console.log(res.data);
                    alert(res.data.msg);
                    window.location.href = "index.html";
                })
                .catch(err => {
                    console.log(err);
                })
        },
        code_check() {
            axios({
                    method: 'post',
                    url: "http://www.rcloud.cn/tp/public/index/code_check",
                    data: {
                        checkcode: app._data.login.checkcode
                    }
                })
                .then(res => {
                    console.log(res.data);
                })
        },
        email_check() {
            //检测邮箱合法性
            var regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            if (!regExp.test(app._data.register.uemail)) {
                $(".email_check_tip").css("display", "inline");
            } else {
                $(".email_check_tip").css("display", "none");
            }
        },
        psw_check() {
            //检测密码合法性，必须且只能包含字母和数字和下划线，
            var psw = app._data.register.upsw;
            var flag = (/^\d+$/.test(psw)) || (/^[a-zA-Z]+$/.test(psw));
            if (flag) {
                $(".psw_check_tip").text("密码中至少包含字母和数字")
                $(".psw_check_tip").css("display", "inline");
                return;
            }
            flag = /^\w+$/.test(psw);
            if (!flag) {
                $(".psw_check_tip").text("密码中只能包含字母，数字，下划线")
                $(".psw_check_tip").css("display", "inline");
                return;
            }
            $(".psw_check_tip").css("display", "none");
            //检测两次密码一致性
            var checkpsw = app._data.register.checkpsw;
            if (checkpsw != psw) {
                $(".checkpsw_check_tip").text("两次密码不一致")
                $(".checkpsw_check_tip").css("display", "inline");
                return;
            }
            $(".checkpsw_check_tip").css("display", "none");
        },
        uname_check() {
            //检测用户名是否被占用
            axios({
                    method: 'post',
                    url: "http://www.rcloud.cn/tp/public/index/uname_check",
                    data: {
                        uname: app._data.register.uname
                    }
                })
                .then((res) => {
                    console.log(res.data);
                    if (res.data) {
                        $(".name_check_tip").css("display", "none");
                    } else {
                        $(".name_check_tip").css("display", "inline");
                    }
                })
        },
        get_register() {
            axios({
                    method: 'post',
                    url: "http://www.rcloud.cn/tp/public/index/get_register",
                    data: app._data.register
                })
                .then((res) => {
                    console.log(res.data);
                    window.location.href = "index.html";
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        get_uname() {
            axios.get("http://www.rcloud.cn/tp/public/index/get_uname")
                .then(res => {
                    console.log(res.data);
                    app._data.register.uname = res.data;
                    $(".name_check_tip").css("display", "none");
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }
})