##  配置管理
在垂直的业务领域有些相似的业务组件，模块；使其得到最大化的复用，又想区分各业务线的不同点，引入配置管理来管理各业务线的细小差异。需要每个业务方维护自己的一套配置。基类里面沉淀出set,get,batch，读写配置的方法；结合其权限管理系统，用isShow来判断其是否展示。

业务方需要对差异维护自己的配置文件，对模块权限维护自己的权限配置文件。
如下：
配置文件：

```
{   
    // 个性化配置按钮文案
    'component-btn-ctx': '提交',
    // 个性化配置module展示情况
    'the-one-module': true
}
```

权限管理文件：业务方对权限要求，比如不同权限对添加删除功能的暴露
```
    "has_a_permission": {
        "component-key": {
        "switch-a": true
        }
    }
```

