## FRPC 的 HTTPS 功能(已过时，旧版，但保留备用)
以下为 FRPC (0.44.0+) 版本才可使用的功能。

本功能可以在 TCP 链接上使用 TLS 套接字。
或把 HTTP 服务以 HTTPS 隧道穿透流量。

### TCP隧道

```ini
auto_tls = false # 是否启用自动TLS
auto_tls_mode = auto #工作模式
```


TCP 附加说明:
* 有关 `auto_tls`
  * false<br/>不会为 TCP 流量打上 TLS 套接字。
  * true<br/>系统会自动生存一个证书，且证书`不受信任`、CommonName 不含任何域名
 * <文件名>  
  会试图访问调试目录下的 `<auto_https>.crt` 和 `<auto_https>.key` 两个证书文件。
若文件不存在或解析失败 效果与 `auto_tls = true` 相同。（调试目录可通过在frpc命令行后加上 `--debug` 后启动获得。）
* 有关 `auto_tls_mode`
   * auto [默认] <br/>隧道会探测本地服务是否为http/s
   * http <br/>将请求反代发送给本地 http 服务
   * https <br/>将请求反代发送给本地 https 服务
   * passthrough <br/>直通模式 单纯为本地 tcp 服务套用 TLS
<br/>

### HTTPS隧道

```ini
auto_tls = false	# 同上
auto_tls_mode = auto	# 同上
force_https = true
```

HTTPS 附加说明:
* 有关 `force_https=true`
  * 访问 http://example.com 会自动跳转到 https://example.com,且状态码为 `301 Moved Permanently` 返回的 Location 头包含 Host、Path 和 Query
  * 此隧道包含的所有域名对应的 `http` 隧道无效。访问 http://example.com `一定会` 自动跳转到 https://example.com,`一定不会` 去尝试访问对应的 `http` 隧道