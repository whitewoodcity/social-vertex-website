# 用户信息缓存

## 需要解决的问题：

由于article，comment等信息内 关于作者以及被评论人的信息只有id，而实际页面需要使用到nickname，如果每个用户的信息都要去请求userInfo接口来获取nickname，则重复的访问量过大。



## 解决方式：

在前端项目中的local storage添加user缓存，user缓存同时存在于vuex中。并提供相应的缓存维护策略。



## 具体实现:

localStorage当作是服务端与客户端之间的userInfo cache, 而客户端vuex存一份与localStorage完全相同的数据备份(目的在于方便变量的读取 以及本地浏览器获取用户信息时性能的有限提升)。

userinfo cache 数据结构为一个map，其中`key`为userId，`value`存入用户的简要信息，例如：id, nickname, avatar，cahcedTime(被缓存的时间)等。

每一个user-brief `value` 的json-schema如下：

```json
 {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "User-Brief",
    "description": "the brief schema of user-infomation",
    "type": "object",
    "properties": {
        "id": {
            "description": "identity of the user",
            "type": "string"
        },
        "nickname": {
            "description": "nickname of the user",
            "type": "string"
        },
        "avatar": {
          	"description": "avatar full-img-link of the user",
            "type": "string"
        },
      	"cachedTime" : {
          	"description": "the cache time of the user infomation",
            "type": "number"
        }
    },
    "required": ["id", "nickname", "avatar","cachedTime"]
}
```

## cache维护思路

将所有显示昵称的span 抽取成一个组件，传入id，根据id查询缓存(localStorge)，如果缓存命中 则查看cachedTime，如果超过cachedTime 7 天以上，则从服务端更新缓存并返回新数据；如果没有命中则去服务端查询，并存入缓存 加入cachedTime。宏观上来看 数据的最终存储位置在localStorage，但数据的获取全部从vuex store当中