## http常用状态码(http-status-code)

	2xx:表示成功
	200 OK 表示所有东西都正常
	204 表示请求成功,但是服务端没有内容给你
	
	3xx: 表示重定向
		301 永久重定向(当访问一个永久重定向的网站的时候,一个域名被指向一个其他网站,且是永久的)
		302 临时重定向
		304 走缓存(服务端觉得你之前请求过这个东西,而且服务器上的那一份没有发生变化,告诉客户端用缓存 就行)
		301，Moved Permanently。永久重定向，该操作比较危险，需要谨慎操作：如果设置了301，但是一段时间后又想取消，但是浏览器中已经有了缓存，还是会重定向。
		302，Fount。临时重定向，但是会在重定向的时候改变 method: 把 POST 改成 GET，于是有了 307
		307，Temporary Redirect。临时重定向，在重定向时不会改变 method
	
	4xx: 表示客户端错误
		400 参数传递不当,导致的错误
		401 权限不够导致的
		403 服务端已经理解请求,但是拒绝响应
		404 客户端请求的资源或者数据不存在(发现请求接口404,有两种情况一种是咱们写错接口了或者服 务端还没部署)
	
	5xx: 表示服务端错误(遇到以5开头的错误去找服务端错误)
		500 服务端内部错误
		502 网关错误