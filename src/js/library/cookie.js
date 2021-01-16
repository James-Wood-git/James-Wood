const cookie = {
    //获取cookie
    get(key) {
        //判断是不是有cookie数据
        if (document.cookie) {
            //将cookie字符串通过【; 】拆分成数组对象
            let cookies = document.cookie.split('; ');
            //遍历数组对象 然后取到cookie的 kay和 value
            for (let i in cookies) {
                let item = cookies[i].split('='); //irem某一个、一则、一条
                if (item[0] === key) return item[1]; //如果我们遍历取得的cookie的key跟输入的key一致，就讲key的值返回
            }
        }
        return ''; //如果遍历没有cookie或遍历结束没有获得值 则返回空字符串
    },

    //创建cookie
    set(key, value, day) {
        //判断day的类型是不是数字类型
        if (typeof day === 'number') {
            let d = new Date();
            //设置cookie的活跃周期（过期时间）
            d.setDate(d.getDate() + day);
            document.cookie = `${key}=${value};expires=${d};path=/`;
        } else {
            document.cookie = `${key}=${value};path=/`;
        }
        return this;
    },

    //移除cookie
    remove(key) {
        this.set(key, '', -1);
    }
};

export { cookie };