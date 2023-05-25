// node-sdk使用说明：https://github.com/larksuite/node-sdk/blob/main/README.zh.md
const lark = require('@larksuiteoapi/node-sdk');

// 开发者复制该Demo后，需要修改Demo里面的"app id", "app secret"为自己应用的appId, appSecret
const client = new lark.Client({
	appId: 'cli_a4982ea58219500c',
	appSecret: 'tElBvhdOKLimO6kJCMer3xndDRs7Du5d',
	// disableTokenCache为true时，SDK不会主动拉取并缓存token，这时需要在发起请求时，调用lark.withTenantToken("token")手动传递
	// disableTokenCache为false时，SDK会自动管理租户token的获取与刷新，无需使用lark.withTenantToken("token")手动传递token
	disableTokenCache: true
});

client.sheets.spreadsheet.create({
		data: {
			title: '新建文件测试',
			folder_token: 'fldcnleOw2MXqcfJ9ivDZvb5dHb',
		},
	},
	lark.withTenantToken("u-1qK.JHTTdeZGSqKRlJd3Ldk42gRh04H3hgG0ggQ006He")
).then(res => {
    // console.log(typeof res)
	console.log(res);
}).catch(err => {
     console.error(err);})
