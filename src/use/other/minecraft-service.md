# Minecraft 相关网络帮助

本章不是从 0 开始帮你搭建的,您需要一定的基础(知道这是什么)。<br>
我们非常建议您如果要使用
可以在以下地方下到 BungeeCord 类端:
- [PaperMC(Waterfall + Velocity)](https://papermc.io/downloads#Waterfall)
- [SpigotMC(BungeeCord 原版)](https://www.spigotmc.org/wiki/bungeecord/)

## 关于 Proxy Protocol 的使用

你可能会困扰,为什么后台反馈的玩家 IP 都是 `127.0.0.1` 呢？<br>
FRP 本质上只有转发流量的功能,并没有标明`我是从哪来? `<br>
而 Proxy Protocol 会帮他标明来源。<br>
这可以让服务器反馈真实的 IP ,避免某些IP级操作导致问题出现 <br>
(如 ban-ip 牵连全服玩家，因为入网IP都是 127.0.0.1)

---
### 代理端方面设置一览
  <table>
    <tr> <td>服务端类型</td> <th>Velocity</th> <th>BungeeCord</th> <th>Paper (游戏版本>=1.19 且单端模式)</th> </tr>
    <tr> <td>文件名称/路径</td> <td>velocity.yaml</td> <td>config.yaml</td> <td>config/paper-global.yml</td>
  <tr> <td>要修改的内容<br>(不要直接复制，<br>看修改的参数)</td>
<td><pre><code class="language-toml">[advanced]
connection-timeout = 5000
# ...
# 启用对 HAProxy 的兼容
#(默认为Proxy-Protocol-V2)
haproxy-protocol = true
</code><pre></td>
<td><pre><code class="language-yaml">listeners:
- query_port: 25577
  # 非完整 Config 请勿复制粘贴
  # 将此项值改为 `true`
  proxy_protocol: true
</code><pre></td>
<td><pre><code class="language-yaml">proxies:
  proxy-protocol: true
</code><pre></td>
    </tr>
    <tr>
    <td>重载指令<br>(在控制台输入<br>不要带斜杠)</td>
    <td>/velocity reload</td>
    <td>/greload</td>
    <td>/paper reload</td>
    </tr>
  </table>

可选项(`Velocity`/`BungeeCord`): 下载[HaProxyDetector](https://github.com/andylizi/haproxy-detector/releases),并安装到`plugins`文件夹内,以便于不经过穿透也能连接到服务器游玩<br>

---
### Frpc 端

别急，代理那边改完之后还没结束，Frpc那边也需要修改<br>
~除非Frpc之后会自动加载HaProxy协议，否则这个地方依旧有用~

<table>
    <tr> <td>Frpc运行方式</td> <th>配置文件</th> <th>网页修改</th> </tr>
    <tr> <td>修改方法与内容</td>
<td><pre><code class="language-ini">
[您的隧道名称]
# ...(这里代表其他配置项目)
# 上面那行隧道名称是提醒你底下这行要插入哪里
# 看位置和顺序
proxy_protocol_version = v2
</code><pre></td>
<td><pre><code>在网站的管理隧道内
Minecraft穿透隧道这一行
点击旁边的编辑
在更多配置内插入以下内容，并保存
·
proxy_protocol_version = v2
</code><pre></td>
    </tr>
  </table>

注意:`记得保存并重新打开Frpc才能生效`

## Geyser JE+BE?

[Geyser](https://geysermc.org/) 是近几年来新型代理工具,但他可不就这么简单。<br>
他可以实现 Java Edtion 与 Bedrock Edtion 共同联机。<br>
目前，支持的加载方式如下 [下载地址](https://ci.opencollab.dev/job/GeyserMC/job/Geyser/job/master/)
- 单独代理端
- Spigot 插件
- BungeeCord 插件
- Velocity 插件
- Fabric Mod
- Sponge 插件

个人建议：`Geyser`应与[Floodgate](https://ci.opencollab.dev/job/GeyserMC/job/Floodgate/job/master/)一起并以相同的方式使用

### 我可以与外置一起用吗？

当然可以！你可以根据您的服务端来查看我们推荐的方案

#### BungeeCord与Velocity
  
  在`Velocity`/`BungeeCord`上安装`Geyser`、`Floodgate`与[MultiLogin](https://github.com/CaaMoe/MultiLogin/releases)到plugins文件夹下<br>
  注意：`根据您的代理端类型下载插件，不要搞错了然后来怪我哦`
  
  打开`velocity.toml`文件,修改并保存:
  ```toml
  online-mode = true
  ```
  这样就可以启动了，具体启动`Velocity`/`BungeeCord`的方法，在此就不再赘述
  
  ---
  - 设置验证服务器的方式  
  在`plugins/multilogin/services`创建文件名为`yggdrasil.yml`<br>
  以下将以`LittleSkin`做举例<br>
  复制里面的[内容](https://pastebin.com/X1LbbNRk),并粘贴到文件内,保存后输入如下指令<br>
  `multilogin reload`
  
  ---
  - 修改后端以同步UUID  
  后端的所有服务端，都需要修改配置文件`server.properties`，并重启所有的服务端
  ```properties
  online-mode=false
  ```
  
  若后端包含`Paper`，建议额外修改并保存 （若Velocity的`player-info-forwarding-mode`设置为 `legacy`, 可视作为BungeeCord服务端）
    <table>
    <tr> <td  colspan="2">旧版配置 paper.yml</td> </tr>
    <tr> <th>Velocity</th> <th>BungeeCord</th> </tr>
    <tr>
<td><pre><code class="language-yaml">settings:
  velocity-support:
    enabled: true
    online-mode: true
    secret: <你自己Velocity服务端的>
</code><pre></td>
<td><pre><code class="language-yaml">settings: 
    bungee-online-mode: true
</code><pre></td>
    </tr>
  </table><br>
  
  
  <table>
    <tr> <td  colspan="2">新版配置: config/paper-global.yml </td> </tr>
    <tr> <th>Velocity</th> <th>BungeeCord</th> </tr>
    <tr>
<td><pre><code class="language-yaml">proxies:
  velocity:
    enabled: true
    online-mode: true
    secret: <你自己Velocity服务端的>
</code><pre></td>
<td><pre><code class="language-yaml">proxies:
  bungee-cord:
    online-mode: true
</code><pre></td>
    </tr>
  </table>
  
---
#### 单端 
(不推荐，因为不能使用显示IP，Paper端除外)  ~以下内容以Paper服务端做举例~
  
  Paper的需要下载`Geyser`与`Floodgate` 并安装到`plugins文件夹`内<br>
  (请根据您的服务端类型下载插件)
  且需要下载`Authlib-injector`,放入与`paper.jar`同文件夹下<br>
  并且你在使用`LittleSkin`提供的外置验证服务
  
  修改配置`server.properties`文件,找到并修改成如下,然后保存
  ```properties
  online-mode=true
  ```  
  按如下方式启动(指令为模板，请按顺序放置参数):
  ```bash
  java -javaagent:authlib-injector.jar=https://littleskin.cn/api/yggdrasil -jar paper.jar
  ```
  在基岩版登录时，使用微软登录(随时都可能暴毙)即可。

---
#### 关于 AuthLib-Injector 更多信息

[详细教程](https://github.com/yushijinhun/authlib-injector/wiki/%E5%9C%A8-Minecraft-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E4%BD%BF%E7%94%A8-authlib-injector)

