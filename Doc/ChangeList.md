
##20131219 ChangeLog
    Add Q Promise demo at server side

##20131119 ChangeLog
    修复indexAsync.html运行错误，加入其所需的angular map文件。调整use logger位置，运行时不再显示静态文件web请求的log
    但错误log仍然显示。
    修改Tutorial.md.

##20131117 ChangeLog
    使用express server取代angular-seed项目中的简单脚本，原有的测试均能运行，去掉相应测试脚本，可用grunt任务和ide的karma
    两种方式运行，运行前端测试时自动启动express服务器。默认grunt任务是build，形成部署版本，将运行单元测试、清除dist目录、
    拷贝部署文件、html压缩、图片压缩等,之后dist目录即为最精简的部署目录。