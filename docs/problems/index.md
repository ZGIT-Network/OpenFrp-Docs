# 常见问题

[[TOC]]

## 客户端报错
> **我们推荐使用 简易启动 功能或者图形客户端(OpenFrp Launcher)启动您的隧道,可以避免 下表 大部分问题。**

请查看日志，下表为常见报错及解决办法
| 英文 | 中文 | 备注 |
| --- | --- | --- |
| Your `XXX` proxy is available now. Use [`YYY`] to connect. | `XXX` 类型隧道启动成功 使用 [`YYY`] 来连接到你的隧道 | 隧道启动成功，一切正常 |
| Recover success: [`XXX`] | 不断线重连成功: [`XXX`] | 网络波动，一般可以忽略或更换节点 |
| recover to server timed out | 不断线重连失败 | 网络波动，frpc 会自动尝试另外一种重连方式，一般可以忽略或更换节点 |
| Connection recover failed: `XXX` | 不断线重连失败: `XXX` | 网络波动，frpc 会自动尝试另外一种重连方式，一般可以忽略或更换节点 |
| read from control connection EOF | 控制连接读取失败 (EOF), 可能是网络不稳定 | 网络波动，一般可以忽略或者更换节点 |
| write message to control connection error: `XXX` | 控制连接写入失败, 可能是网络不稳定: `XXX` | 网络波动，一般可以忽略或者更换节点 |
| login to server failed: `XXX` | 登录节点失败, 请检查网络连接: `XXX` | [点此查看详细说明](#登录节点失败-请检查网络连接) |
| connect to local service [`XXX`] error: `YYY` | 连接映射目标 [`XXX`] 失败, 请检查本地服务是否打开: `YYY` | [点此查看详细说明](#无法连接到本地服务) |
| proxy conflict | *隧道冲突* | 该问题是由于隧道重复开启造成的，请查找 **所有设备** 上的 frpc 进程并关闭重复开启的隧道。如果此问题持续存在，请尝试重置访问密钥 |
| multi-instance racing, this one failed | *多实例竞争* | 该问题是 frpc 重复开启且生成了相同的 RunID，在 frps 上争抢同一个隧道造成的。请在 **当前设备** 上查找所有存在冲突的 frpc 进程并关闭，或检查 supervisor 配置是否有误 |
| port already used | *服务端端口被占用* | 换一个远程端口 |
| i/o deadline reached | I/O繁忙 | 节点可能过载，建议换一个节点 |
| router config conflict | *URL 路由冲突* | [点此查看详细说明](#url-路由冲突) |
| Request failed: `XXX` `YYY` | *API 请求失败* | [点此查看详细说明](#api-请求失败) |
| reconnect to server error: dial tcp 'XXX ': connect: connection refused |重连失败：服务器拒绝连接|可能是你选择的节点正在遭受攻击。[请查看节点状态](https://kuma.openfrp.net/)，等待恢复或换一个节点。|
| Get "xxx": tls: failed to verify certificate: x509: certificate signed by unknown authority | 证书验证失败 | [点此查看详细说明](#api-请求失败) |

### 登录节点失败, 请检查网络连接

1. 请运行 PING 命令测试节点连通性 (Windows)

   ```bash
   ping <节点域名>
   
   # 例如
   ping cn-shanghai.openfrp.top
   ```

1. 请查看 [节点状态](https://kuma.openfrp.net/) 页面对应节点是否在线

| 节点在线 | PING 测试 | 可能原因                                   | 解决方案          |
| :------: | :-------: | ------------------------------------------ | ----------------- |
|    ✘     |     ✘     | 节点被攻击或故障                           | 换节点 / 等待恢复 |
|    ✔     |     ✘     | 网络故障                                   | 换节点 / 换网络   |
|    ✔     |     ✘     | 节点被 GFW 屏蔽了                          | 换节点            |
|    ✔     |     ✔     | 上游防火墙拦截 FRP 协议或 7000 / 7001 端口 | 换网络 / 找别家   |
|    ✔     |     ✔     | 公司 / 学校网络管理员不允许使用 frp协议    | 不建议继续使用    |

### URL 路由冲突

| 原因                             | 解决方案                                                     |
| -------------------------------- | ------------------------------------------------------------ |
| 创建隧道时填写的域名有误         | 填写正确的域名                                               |
| 服务端路由未释放                 | 和 [端口被占用](#服务端端口被占用) 类似，解决方案也相同      |
| **高级设置** 中 URL 路由配置错误 | 您是高级用户，请自行寻找解决方案<br>如果是不小心填写的，请删掉相关配置项 |

### 服务端端口被占用

| 原因               | 解决方案                                                     |
| ------------------ | ------------------------------------------------------------ |
| 隧道刚刚被关闭     | 启动器: **关闭隧道** <br> FRPC: **退出 FRPC** <br> 等待 **一分钟** 后重新开启 |
| 存在 FRPC 进程残留 | 启动器: 右键点击托盘图标, **彻底退出** 后重新打开启动器<br> frpc: 打开 **任务管理器** 查找并 **关闭** 残留的 FRPC 进程 |
| 重复开启隧道       | 一条隧道同一时间只能在一个地方开启<br>请 **关闭重复开启的隧道** 并 **创建不同端口的隧道** 使用 |

### 无法连接到本地服务

此日志说明 **FRPC 工作正常**，但是 FRPC 无法连接到您的本地服务。

| 原因                                                         | 解决方案                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 本地服务 (例如 Minecraft 服务器，HTTP 服务器) 没有启动或启动失败 | 检查并启动本地服务                                           |
| 本地服务配置有误，没有监听 frpc 连接的本地 IP                | 正确配置本地服务或修改隧道设置                               |
| **本地端口** 或 **本地 IP** 填写错误                         | 编辑隧道，参考文档 **填写正确的信息** 然后 **重启 frpc**     |
| **本地 IP** 发生了变化                                       | 重新检查本地地址，然后编辑隧道 **填写正确的本地 IP** 并 **重启 FRPC** |
| 防火墙、杀毒软件拦截 FRPC 请求本地服务                       | 添加白名单规则到防火墙、杀毒软件中。<br>不建议彻底关闭防火墙 |

注：若您使用docker方式部署服务，提示**无法连接到本地服务**，请检查容器使用的网络模式是否正确。
docker常见网络环境有“bridge”（默认）、”host“和”macvlan“三种模式。可使用以下代码查看OpenFRP容器的网络模式。

```bash
docker inspect （您的容器名称） | grep NetworkMode
```

比如：如您的容器名称为OpenFRP（注意大小写），您应该输入 `docker inspect Openfrp | grep NetworkMode`

- 若输出为：`"NetworkMode": "host", `

  则应在创建隧道时设置“本地地址”为127.0.0.1

- 若输出为：`"NetworkMode": "bridge",`

  则应在创建隧道时设置“本地地址”为宿主机 `Docker0接口` (一般为172.17.0.1)



### API 请求失败

请优先检查 API 连接性问题:

- 检查 SSL 问题 (一般不存在)
  - Windows 系统请使用 **Edge 等现代浏览器** 访问 `http://of-dev-api.bfsea.xyz/` 查看是否出现安全警告，如果出现请安装系统更新或者手动安装根证书
  - Linux 系统可以使用 `tcping http://of-dev-api.bfsea.xyz/` 检查是否存在证书错误，如果出现证书错误可以尝试安装 (或更新) `ca-certificates` 包, 若仍无效且使用 Termux 请尝试手动安装根证书或使用配置文件启动
- 检查防火墙、杀毒软件是否拦截了 FRPC 的请求
- 检查宽带是否存在到期未续费等情况，电脑能否正常 **打开网站**（例如 Bing）

如果还是没有什么头绪，可以查看 [外部状态监控](https://kuma.openfrp.net/) 中 API 是否正常在线 (<span style="color: #3bd671">**Online**</span>)，如果不在线请联系管理员。





## 启动器相关

### 未连接到守护进程, 请尝试重启启动器

请按尝试以下操作:

1. **完全退出**启动器后（托盘图标点击右键-退出），右键并选择**以管理员身份运行**

### 杀毒软件提示启动器有病毒

若您是在官方网站下载的启动器，则极大概率是误报，建议您在[杀软中添加白名单](https://openfrp.wiki/use/desktop-launcher.html#%E5%8A%A0%E5%85%A5%E7%B3%BB%E7%BB%9F%E7%99%BD%E5%90%8D%E5%8D%95)然后重新安装启动器。

若您在非官方网站下载启动器，请删除并去官方网站[OpenFrp管理面板 - 下载中心](https://console.openfrp.net/download)重新下载启动器。 <strong style="color:red;">非官方渠道下载的启动器有被植入病毒的风险</strong>

OpenFrp Lanucher 启动器已完全开源，开源地址：[https://github.com/ZGIT-Network/OpenFrpLauncher](https://github.com/ZGIT-Network/OpenFrpLauncher)。

*开放映射启动器软件为完全自主知识产权软件，已获得注册登记。 登记号: 2024SR0589290。*



## FRPC相关

### FRPC的兼容性

FRP客户端具有很强的兼容性，也就是说您可以使用几乎任何现有(只要支持 -c 参数)的 FRP 客户端来使用我们的服务，只需根据隧道的「配置文件」手动填写关键连接参数，或直接复制配置文件启动即可

如果您是使用 Windows XP 或 Windows Vista 的用户，请使用上游的 [0.28.2 (opens new window)](https://github.com/fatedier/frp/releases/tag/v0.28.2)版本 。

使用任何非本网站分发的最新版客户端，均视为放弃相关支持，由此带来的任何问题请您发扬极客精神自行解决。

OpenFrp支持 FRP 官方最新版本以及其他的 FRP 发行版本，您可以前往任意站点下载任意版本的 FRP 客户端(0.18以上版本)。 如果该客户端支持编辑 FRPC 配置文件，则该 FRP 客户端可以使用 OpenFrp ,使用方法与普通配置文件版本客户端相同！

请从您所信任的站点下载非Openfrp提供的 FRPC 程序，如 [FRP 的官方 Github 的发行版本 ](https://github.com/fatedier/frp/releases/)等，我们不能保证您通过非 Openfrp 下载的 FRPC 程序没有恶意行为！




## 节点相关

### 节点会有IPV6支持吗？

没有！我们所有的节点均不支持使用IPv6进行链接，我们也不会考虑提供IPv6的支持

~~有公网IPv6为何还需要内网穿透呢?~~

### 你能告诉我哪个节点最好用吗？

取决于以下几点：
- 该节点的使用人数
- 节点到客户端的物理距离
- 节点与客户端的网络状况
- 国家政策
- 部分不可抗力因素
- 某些人的恶意攻击

> 送某些人一句话：如果有 10% 的利润，它就保证到处被使用；有 20% 的利润，它就活跃起来；有 50%的利润,它就铤而走险；为了 100% 的利润，它就敢践踏一切人间法律；有 300% 的利润，它就敢犯任何罪行，甚至绞首的危险。

所以，要想取得最佳体验，建议首选离你地理位置最近的节点。

## 速率问题

### 为什么穿透速率无法到达标称的最大速率?

- 我们的限速单位为 Mbps, 即 Megabits per second

​		单位换算公式为 1 Mbps = 0.125 MB/s ，如您的限速为5Mbps 上行 / 5 Mpbs 下行 ，则您实际可以得到的速		率为 0.625 MB/s.

速率转换表：

| 用户级别 | 速度（Mb） | 速度（MB） |
| -------- | ---------- | ---------- |
| 免费用户 | 12Mb       | 1.5MB      |
| 普通会员 | 24Mb       | 3MB        |
| 高级会员 | 36Mb       | 4.5MB      |

- 传输速率与本机和节点双方的网络环境、地理位置距离有关。

- **用户速率 \* 带宽倍率 = 实际获得速率*** 。

  > 举个例子：一位免费用户使用十堰电信-2节点，节点上标有 10Mbps | x 0.8 字样，那么ta所能获得的理论带宽为12*0.8=9.6（Mb）。但节点的总带宽是有限的（10Mb），所以高峰期时，ta实际可用的带宽可能低于9.6Mb。





## 管理面板
### 管理面板打不开怎么办

这通常是由于各种神秘的网络问题造成的，也可能是我们的服务器遭到了严重的网络攻击，你可以尝试以下办法

- 更换设备访问 (如手机更换为电脑)
- 更换网络环境访问 (如 WiFi 更换为 4G、5G 网络)
- 更换浏览器访问 (推荐使用 Google Chrome / Microsoft Edge / Firefox)
- 查看[状态监控](https://kuma.openfrp.net/)页面中 #0 OpenFrp - 主站 是否正常
- 查看在 OpenFrp 用户交流群 中是否有故障通知

### 增值服务相关

- 请在免费服务无法满足您的需求时购买增值服务。若您无法使用免费服务，那您购买增值服务也无法解决!
- **购买增值服务，您不会获得任何额外的官方支持**。若您遇到了问题，可以先试着加群，可能会有空闲的群友帮您解决。
-  <strong style="color:red;">由于增值服务属于虚拟物品，售出不支持退款。</strong>

### 实名相关
#### 怎么进行实名验证

1. 进入[OpenFrp管理面板 - 个人中心](https://console.openfrp.net/usercenter)
2. 点击 "实名验证"
3. 提交 您的身份证信息

> OpenFrp 如果发现您使用网络上的身份证号码进行实名，我们将有权要求您提供身份证照片，如无法提供，我们将按照用户协议进行处置.<br>

如果您为以下用户，您可以与我们进行真人验证。
- 中国香港、中国台湾用户。
- ~~没有大陆身份证号码的的外国人 (I think you have Public IP)~~

#### 我提交的实名信息安全吗

我们会严格按照国家相关法律法规进行保存数据，如有疑问，请参阅本站的[**个人信息处理与隐私保护政策**](https://www.openfrp.net/privacy/)。

## 其他


### 使用 UDP 的游戏无法通过内网穿透访问
- 部分使用 UDP 协议传输数据的游戏服务端要求远程端口与本地配置的端口一致才能正常进行通信。
  如果使用 UDP 隧道的游戏正常无法连接，请尝试修改游戏服务器配置文件中的 监听端口，使其与隧道的 远程端口 一致。别忘了编辑隧道把 本地端口 也改成同样的值
- 服务器不允许使用 UDP

### 为什么不推荐用于 Minecraft 映射

Minecraft 对节点性能影响极为严重，我们 非常不推荐 您使用 OpenFrp 的服务穿透 Minecraft服务器

由于穿透 Minecraft 的用户过多，大部分免费节点的网卡 PPS 都远超出正常值。PPS 达到上限后，即使节点带宽只用了一半，剩下的一半带宽也无法被利用，相当于直接浪费了。











