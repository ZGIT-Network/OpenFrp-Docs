# Minecraft 相关网络帮助

本章不是从 0 开始帮你搭建的,您需要一定的基础(知道这是什么)。

可以在以下地方下到 BungeeCord 类端:
- [PaperMC(Waterfall + Velocity)](https://papermc.io/downloads#Waterfall)
- [SpigotMC(BungeeCord 原版)](https://www.spigotmc.org/wiki/bungeecord/)

## 关于 Proxy Protocol 的使用

你可能会困扰,为什么后台反馈的玩家 IP 都是 127.0.0.1 呢？

FRP 本质上只有转发流量的功能,并没有标明`我是从哪来? `

而 Proxy Protocol 会帮他标明来源。

这可以让服务器反馈真实的 IP ,避免某些IP级操作导致问题出现 

(如 ban-ip 牵连全服玩家，因为入网IP都是 127.0.0.1)

### BungeeCord 类端

当然很简单,打开 `config.yaml` 文件:
```yaml
listeners:
- query_port: 25577
  # 非完整 Config 请勿复制粘贴
  # 将此项值改为 `true`
  proxy_protocol: true

```

### Velocity 端

本质上有 BungeeCord 的样子,但配置文件完全不同。

打开 `velocity.toml` 文件:
```toml
[advanced]
connection-timeout = 5000
# ...
# 启用对 HAProxy 的兼容 (默认为Proxy-Protocol-V2)
proxy-protocol = true

```

## Geyser JE+BE?

[Geyser](https://geysermc.org/) 是近几年来新型代理工具,但他可不就这么简单。

他可以实现 Java Edtion 与 Bedrock Edtion 共同联机。

目前，支持的加载方式如下 [下载地址](https://ci.opencollab.dev/job/GeyserMC/job/Geyser/job/master/)
- 单独代理端
- Spigot 插件
- BungeeCord 插件
- Velocity 插件
- Fabric Mod
- Sponge 插件

并且，我在此建议，该程序/插件，应与[Floodgate](https://ci.opencollab.dev/job/GeyserMC/job/Floodgate/job/master/)一起并以相同的方式使用

### 我可以与外置一起用吗？

当然可以！你可以根据您的服务端来查看我们推荐的方案

<detail><mark><summary>单端服务端</summary></mark>
  
  ~以下内容以Spigot服务端做举例~
  
  Spigot的需要安装`Geyser`与`Floodgate`到`plugins文件夹`内<br>
  且需要下载`Authlib-injector`,放入与`spigot.jar`同文件夹下<br>
  并且你在使用`LittleSkin`提供的外置验证服务
  
  修改配置`server.properties`文件,并找到如下配置项,且修改成像我这样的参数,修改完毕后保存
  ```properties
  online-mode=false
  ```
  按如下方式启动:
  ```bash
  java -javaagent:authlib-injector.jar=https://littleskin.cn/api/yggdrasil -jar spigot.jar
  ```
  在基岩版登录时，使用微软登录(随时都可能暴毙)即可。
  
</detail>

<detail><summary>BungeeCord与Velocity</summary>
  
  在`Velocity`/`BungeeCord`上安装`Geyser`、`Floodgate`与[MultiLogin](https://github.com/CaaMoe/MultiLogin/releases)到plugins文件夹下<br>
  注意：`插件下载点会标注哪个文件适用于Velocity，哪个文件适用于BungeeCord，不要搞错了然后来怪我哦`
  
  修改配置`velocity.toml`文件,并找到如下配置项,且修改成像我这样的参数,修改完毕后保存
  ```toml
  online-mode = true
  ```
  
  这样就可以启动了，具体启动`Velocity`/`BungeeCord`的方法，在此就不再赘述<br>
  然后具体如何定义外置验证的地址,请查看[这篇教程](https://github.com/CaaMoe/MultiLogin/wiki/Home/985360ab3ae75312e019001f5dccc515d57b5a0d)
</detail>

<detail><summary>关于 AuthLib-Injector 更多信息</summary>
  
[详细教程](https://github.com/yushijinhun/authlib-injector/wiki/%E5%9C%A8-Minecraft-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E4%BD%BF%E7%94%A8-authlib-injector)
</detail>
