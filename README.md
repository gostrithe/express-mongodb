# express-mongodb-server
##### node_modules 文件夹没上传，自己安装依赖包 -- npm install
##### 服务端也挺好玩，哈哈
玩了一周服务端，没系统学习nodejs、express、MongoDB，直接用起来了。
- 写了一些接口
- 支持静态资源访问
- 单个文件上传功能
- 注册与登录
- JsonWebToken鉴权
- MVC架构分层
- 管理电影与影院
- 封装了RouterGeneration路由生成器类
-- RouterGeneration.from('cinema').generate()
-- 传入数据库集合名称，生成路由器，自动分配派发接口（RESTful风格api）
-- 暴露接口的功能比较简单，仅支持对数据库的CRUD操作
- 克服了promise一生之敌，采用promise链式编程
### 有什么亮点
- MVC架构分层
- 封装了路由生成器
- promise链式编程
### 遇到的难题
- 前后端字段要一致，工作后注意协商，谨慎name属性
- then的传值
-- 当时我无法解决在then的回调中，同时传递一个promise对象和普通对象，最后使用闭包存储普通对象，传递promise对象，继续链式编程，不影响代码的美观，哈哈
- 在服务端设置返回token客户端接收token，并存入localStorage。同时，在需要携带token的时候，取出并在请求头在发送会服务端，服务端校验token转回载荷，读取载荷信息写逻辑。
-- 我无法解决在form表单中携带localStorage的token。最后妥协，使用了ajax。

