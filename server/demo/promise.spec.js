/**
 * Created by Administrator on 13-12-17.
 */

var users={
    '张三':{password:'1',max:5},
    '李四':{password:'1',max:10}
}

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

describe("promise demo", function () {
    //demo test
    it("test callback login", function (done) {
        cbLogin('张三','1',function(err,data)
        {
            expect(data).toEqual(true)
            done();
        })
    })

    //demo test
    it("test callback login", function (done) {
        cbLogin('张三','2',function(err,data)
        {
            expect(data).toEqual(false)
            expect(err).toEqual('password invalid')
            done();
        })
    })

    it("test callback login should fail", function (done) {
        cbLogin('王麻子','1',function(err,data)
        {
            //键值对的键不存在，为undefine
            if (!users['王麻子'])
                console.log('undefine类型为false')
            expect(data).toEqual(false);
            expect(err).toEqual('user王麻子 not exist');
            done();
        })
    })
});
