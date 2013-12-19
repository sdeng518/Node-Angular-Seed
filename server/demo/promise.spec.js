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

//模拟异步的查询网盘空间容量
function find(user)
{
    var deferred= q.defer()
    setTimeout(function(){
        if (!users[user])
        {
            deferred.reject("user"+user+" not exist")("user"+user+" not exist")
        }
        else
            deferred.resolve(users[user].max);
    },50)
    return deferred.promise;
}

//模拟异步的修改网盘空间操作
function change(user,cb)
{
    var deferred= q.defer()
    setTimeout(function(){
        if (!users[user])
        {
            deferred.reject("user"+user+" not exist")
        }
        else{
            users[user].max=10
            deferred.resolve("success");
        }
    },50)
    return deferred.promise;
}

//嵌套的回调版本，用户登录成功，且网盘空间小于10T，修改为10T
function handle(user,password,cb)
{
   //直接返回then的结果，其本身就是promise
   return login(user,password)
       .then(function(data)
       {
          return find(user) //此处简单的执行，若没有return，则信息处理了不会下传，由于下方要根据data判断是否change，这里return
       })
       .then(function(data)
       {
           if (data<10)
           //注意，最后一步我们将change return，则其已经获得解决的信息可以返回，注意我们是在"成功方法"中return的
           return change(user)

           //虽然是成功的回调函数，但我们可以返回一个拒绝的promise
           else
           {
               var deferred= q.defer()
               deferred.reject("you have more then 10T")
               return deferred.promise;
           }
       })
       //由于上面的then 串中我们未处理拒绝信息，因此，拒绝信息将由handle传递出去
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

//测试then
//then本身返回promise，其响应了前面的成功、失败信息之后，后续的then将被忽略
//因此，只要链中有一个响应失败的回调，总会处理失败，处理完毕后失败不再被处理，除非我们手工的将失败信息下传
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
        deferred.reject('error')
        return deferred.promise;
    })
    .then(null,function(data)  //第三次调用，响应失败的结果，由于前面已经拒绝，这里同样不再执行。但我们上面重新传出拒绝信号，这里才能响应
    {
        console.log('第三次调用响应拒绝信息')
        expect(data).toEqual('error');
        done();
    })
})

it("handle test:first user should be changed success", function (done) {
    handle('张三','1').then(function(data)
    {
        expect(data).toEqual('success')
        done();
    })
})

it("handle test:second user should be changed fail", function (done) {
    handle('李四','1').then(null,function(err)
    {
        expect(err).toEqual('you have more then 10T')
        done();
    })
})

it("handle test:if user not exist,should be changed fail", function (done) {
    handle('王麻子','1').then(null,function(err)
    {
        expect(err).toEqual('user王麻子 not exist')
        done();
    })
})


});
