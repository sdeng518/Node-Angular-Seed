/**
 * Created by Administrator on 13-12-17.
 */

var users={
    '张三':{password:'1',max:5},
    '李四':{password:'1',max:10}
}

//模拟异步的登录
function cbLogin(user,password,cb)
{
    setTimeout(function(){
        if (!users[user])
        {
            cb("user"+user+" not exist",false)
            return
        }
        if (users[user].password!==password)
        {
            cb("password invalid",false);
            return
        }
        cb(null,true);
    },50)
}

//模拟异步的查询网盘空间容量
function cbFind(user,cb)
{
    setTimeout(function(){
        if (!users[user])
        {
            cb("user"+user+" not exist",false)
            return
        }
        cb(null,users[user].max);
    },50)
}

//模拟异步的修改网盘空间操作
function cbChange(user,cb)
{
    setTimeout(function(){
        if (!users[user])
        {
            cb("user"+user+" not exist","change fail")
            return
        }
        users[user].max=10
        cb(null,"change success");
    },50)
}

//嵌套的回调版本，用户登录成功，且网盘空间小于10T，修改为10T
function cbHandle(user,password,cb)
{
    cbLogin(user,password,function(err,data){
        if (!err)
            cbFind(user,function(err,data){
                if (!err)
                {
                    //注意，在这里判断是否需要增加
                    if (data>=10)
                      cb('you have more then 10T','fail')
                    else
                        cbChange(user,function(err,data)
                        {
                            if (!err)
                                cb(null,"success")
                            else
                                cb(err,"fail")
                        })
                }
                else
                {
                    cb(err,'fail')
                }
            })
        else
        {
            cb(err,'fail')
        }
    })
}

describe("callback demo", function () {

    it("cblogin test:if user exist and password ok,login should success", function (done) {
        cbLogin('张三','1',function(err,data)
        {
            expect(data).toEqual(true)
            done();
        })
    })

    //demo test
    it("cbLogin test:if password invalid,login should fail", function (done) {
        cbLogin('张三','2',function(err,data)
        {
            expect(data).toEqual(false)
            expect(err).toEqual('password invalid')
            done();
        })
    })

    it("cbLogin test:if users not exist,login should fail", function (done) {
        cbLogin('王麻子','1',function(err,data)
        {
            //键值对的键不存在，为undefine
            //if (!users['王麻子'])
            //    console.log('undefine类型为false')
            expect(data).toEqual(false);
            expect(err).toEqual('user王麻子 not exist');
            done();
        })
    })

    it("cbFind test:first user should be 5", function (done) {
        cbFind('张三',function(err,data)
        {
            expect(data).toEqual(5)
            done();
        })
    })
    it("cbFind test:second user should be 10", function (done) {
        cbFind('李四',function(err,data)
        {
            expect(data).toEqual(10)
            done();
        })
    })

    it("cbHandle test:first user should be changed success", function (done) {
        cbHandle('张三','1',function(err,data)
        {
            expect(users['张三'].max).toEqual(10)
            expect(data).toEqual('success')
            done();
        })
    })

    it("cbHandle test:second user should be changed fail", function (done) {
        cbHandle('李四','1',function(err,data)
        {
            expect(err).toEqual('you have more then 10T')
            expect(data).toEqual('fail')
            done();
        })
    })

    it("cbHandle test:if user not exist,should be changed fail", function (done) {
        cbHandle('王麻子','1',function(err,data)
        {
            expect(err).toEqual('user王麻子 not exist')
            expect(data).toEqual('fail')
            done();
        })
    })

    it("cbHandle test:if password invelid,should changed fail", function (done) {
        cbHandle('张三','2',function(err,data)
        {
            expect(err).toEqual('password invalid')
            expect(data).toEqual('fail')
            done();
        })
    })
});
