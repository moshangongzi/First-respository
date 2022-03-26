window.addEventListener("load", function () {
    var btn_test = this.document.querySelector(".btn_test");
    var id_M = this.document.querySelector('#id_M');
    var id_S = this.document.querySelector('#id_S');
    var sub = this.document.querySelector('#end');
    var scores = this.document.querySelector('.scores');
    var h2 = this.document.querySelector("h2");
    var times = h2.querySelector("span");
    var chart_btn = this.document.querySelector("#chart_btn");
    var myChart = echarts.init(this.document.querySelector(".chart"));
    var tds = this.document.querySelectorAll('td');
    var exit_sys = this.document.querySelector('.exit_sys');

    // 定义模式参数
    var flag = this.localStorage.getItem('flag');
    // 得分数组
    var data1 = [];
    // x轴轮次数组
    var data2 = [];
    // 计时器
    var timer = null;
    // 定义一个存储正确答案的数组
    var ansArray = [];
    // 定义一个得分变量
    var score = 0;
    // 最初提交按钮禁用
    sub.disabled = true;
    // 定义一个轮次变量
    var ts = 0;

    getRandomEquation();

    // 1、开始测试按钮绑定点击事件
    btn_test.addEventListener('click', function () {
        // (1)轮次加1
        ts += 1;
        times.innerHTML = ' ' + ts + ' ';
        // 成绩图表x轴参数
        var t = '第' + ts + '轮';
        data2.push(t);
        // (2)得分清零
        score = 0;
        scores.innerHTML = 0;
        // (3)计时清零
        id_M.innerHTML = "00：";
        id_S.innerHTML = "00";
        // (4)提交按钮启动
        sub.disabled = false;

        clearInterval(timer);
        this.disabled = true;
        // (5)生成随机算式

        getRandomEquation();

        // 计时功能
        var c = 0;
        timer = setInterval(function () {
            c++;
            id_S.innerHTML = showNum(c % 60);
            id_M.innerHTML = showNum(parseInt(c / 60) % 60) + "：";
        }, 1000)

    })

    // 定义一个存储用户答案的数组
    var userAnsArray = [];
    // 2、提交按钮绑定点击事件
    sub.onclick = function () {
        // 先结束上一轮计时
        clearInterval(timer);
        btn_test.disabled = false;
        // 禁用提交按钮，不可以重复提交
        this.disabled = true;
        // 获取用户输入的所有答案
        var ans = document.querySelectorAll('.answer');
        for (var i = 0; i < ans.length; i++) {
            userAnsArray[i] = ans[i].value;
        }
        // 对答案
        for (var i = 0; i < 20; i++) {
            if (parseInt(userAnsArray[i]) == ansArray[i]) {
                score += 5;
            } else {
                var span = document.createElement('span');
                span.innerHTML = "回答错误，正确答案为" + ansArray[i];
                tds[i].append(span);
            }
        }
        // 显示最终得分
        scores.innerHTML = score;
        data1.push(score);
    }

    // 3、退出登陆绑定点击事件
    exit_sys.onclick = function () {
        window.location.href = '../login.html';
    }

    // 4、查看成绩图表按钮绑定点击事件
    chart_btn.onclick = function () {
        var option;
        option = {
            xAxis: {
                type: 'category',
                data: data2
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [],
                type: 'bar'
            }]
        };
        console.log(option.xAxis.data);

        option && myChart.setOption(option);

        function refreshData(data1, data2) {
            //刷新数据
            var option = myChart.getOption();
            option.series[0].data = data1;
            myChart.setOption(option);
        }
        refreshData(data1, data2); //自定义刷新的时候调用
        $("#chartModel").modal();
    }

    /* 5、生成20道随机算式 */
    function getRandomEquation() {
        for (var i = 0; i < tds.length; i++) {
            var str = [];
            if (flag == 1) { // 简单模式
                str[0] = getRandom(1, 10);
                str[1] = getOp();
                str[2] = getRandom(1, 10);
                str[3] = getOp();
                str[4] = getRandom(1, 10);
            } else if (flag == 2) { // 中等模式
                str[0] = getRandom(1, 50);
                str[1] = getOp();
                str[2] = getRandom(1, 50);
                str[3] = getOp();
                str[4] = getRandom(1, 50);
            } else { // 困难模式
                str[0] = getRandom(1, 100);
                str[1] = getOp();
                str[2] = getRandom(1, 100);
                str[3] = getOp();
                str[4] = getRandom(1, 100);
            }
            var s = str[0] + str[1] + str[2] + str[3] + str[4] + "=" + "<input type='text' class='answer'>";
            tds[i].innerHTML = s;
            if ((str[1] == "+" || str[1] == "-") && (str[3] == "×" || str[3] == "÷")) {
                // 先乘除，后加减
                var midResult = parseInt(getResult(str[3], str[2], str[4]));
                var finalResult = parseInt(getResult(str[1], str[0], midResult));
                ansArray[i] = finalResult;
            } else {
                var midResult = parseInt(getResult(str[1], str[0], str[2]));
                var finalResult = parseInt(getResult(str[3], midResult, str[4]));
                ansArray[i] = finalResult;
            }
        }
    }

    /* 6、封装一个处理单位数字的函数 */
    function showNum(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    }

    /* 7、计算两个数的值并发返回结果 */
    function getResult(op, num1, num2) {
        if (op == "+") {
            return Number(num1) + Number(num2);
        } else if (op == "-") {
            return Number(num1) - Number(num2);
        } else if (op == "×") {
            return Number(num1) * Number(num2);
        } else {
            return Number(num1) / Number(num2);
        }
    }

    /* 8、产生一个随机整数 包含两个数在内 */
    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
    }

    /* 9、产生一个随机运算符 */
    function getOp() {
        op = getRandom(1, 4);
        if (op == 1) {
            return "+";
        } else if (op == 2) {
            return "-";
        } else if (op == 3) {
            return "×";
        } else {
            return "÷";
        }
    }

})