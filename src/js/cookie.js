//封装cookie对象
let cookie = {
    //写入cookie
    set(key, value, day) {
        let d = new Date()
        d.setDate(d.getDate() + day)
        document.cookie = key + "=" + value + ";expires=" + d
    },
    //获取cookie
    get(key) {
        let arr = document.cookie.split("; ")
        let result = {}
        arr.forEach(item => {
            let key = item.split("=")[0]
            let value = item.split("=")[1]
            result[key] = value
        })
        return key ? result[key] : result
    },
    //删除cookie
    del(key) {
        //如果能获得cookie
        if (this.get(key)) {
            document.cookie = key + "=18; expires=" + new Date("1990-01-10 00:00:00")
            return true
        }
        else {
            return false
        }
    }
}