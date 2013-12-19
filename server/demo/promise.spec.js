/**
 * Created by Administrator on 13-12-19.
 */
var q=require('q')
var users={
    '张三':{password:'1',max:5},
    '李四':{password:'1',max:10}
}

//纯手工制作login promise
function login(user,password)
{
    var deferred= q.defer()

    //异步操作结束时，reject拒绝,resolve解决
    setTimeout(function(){
        if (!users[user])
        {
            deferred.reject("user"+user+" not exist")
        }
        else
        {
            if (users[user].password!==password)
                deferred.reject("password invalid");
            else
                deferred.resolve(true);
        }//注意返回的数据类型不同，测试一下

    },50)

    //直接返回promise，不用等待异步操作结束
    return deferred.promise;
}

describe("promise demo", function () {

it("login test:if user exist and password ok,login should success", function (done) {
    login('张三','1').then(function(err)
    {
        expect(err).toEqual(true)
        done();
    })
});

//demo test
it("login test:if password invalid,login should fail", function (done) {
    login('张三','2').then(null,function(data)
    {
        expect(data).toEqual('password invalid')
        done();
    })
})

it("login test:if users not exist,login should fail", function (done) {
    login('王麻子','1').then(null,function(data)
    {
        expect(data).toEqual('user王麻子 not exist');
        done();
    })
})

//测试promise分成两次获取结果
    it("login test:响应拒绝信息之后，流程结束。拒绝之后，响应成功的情形被忽略", function (done) {
        login('王麻子','1')
        .then(function(data){   //第一次调用，只响应成功结果，由于拒绝，这里没有处理
            console.log('第一次调用被忽略')
            expect(data).toEqual(true)
            done()
        })
        .then(null,function(data)  //第二次调用，响应失败的结果，这里正常的测试
        {
            console.log('第二次调用响应拒绝信息')
            expect(data).toEqual('user王麻子 not exist');
            done();

            //只有手工的将拒绝传下去，下面的拒绝才会处理
            var deferred= q.defer()
            deferred.reject(data)
            return deferred.promise;
        })
        .then(null,function(data)  //第三次调用，响应失败的结果，由于前面已经拒绝，这里同样不再执行。但我们上面重新传出拒绝信号，这里才能响应
        {
            console.log('第三次调用响应拒绝信息')
            expect(data).toEqual('user王麻子 not exist');
            done();
        })
    })
});
