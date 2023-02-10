# Minecraft 相关网络帮助

本章不是从 0 开始帮你搭建的,您需要一定的基础(知道这是什么)。

可以在以下地方下到 BungeeCord 类端:
- [PaperMC(Waterfall + Velctor)](https://papermc.io/downloads#Waterfall)
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

目前，可用的方法有 [插件 / 服务端]
- 单独代理端
- Spigot 插件
- BungeeCord 插件
- Velocity 插件
- Fabric Mod
- Sponge 插件

### 我可以与外置一起用吗？

当然可以！只需要下载`Authlib-injector`,放入同文件夹下，启动时这样运行:
```bash
java -jar Geyser.jar -javaagent:<Authlib-injector核心的文件名>
```
在基岩版登录时，使用微软登录(随时都可能暴毙)即可。








