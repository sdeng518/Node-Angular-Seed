/**
 * Created by Administrator on 13-12-19.
 */
var q=require('q')
var users={
    '张三':{password:'1',max:5},
    '李四':{password:'1',max:10}
}
function login(user,password)
{
    var deferred= q.defer()
    console.log(deferred)
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
});
