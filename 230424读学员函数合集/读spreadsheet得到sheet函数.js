// 有了spreadsheet的token之后，要用get方法，获得每个sheet的ID，然后就后续可以用get方法获取数据了

async function getsheet(spreadsheet_token,usertoken){    
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

let sheetinfolist = [];

await client.sheets.spreadsheetSheet.query({
		path: {
			spreadsheet_token: spreadsheet_token,
            
		},
	},
	lark.withTenantToken(usertoken)
).then(res => {
    // 找到总表，准备下一步把填的数字拿出来做聚类分析，后面还要做个函数，统计表格完成率
    // 总时长统计的信息，可以把一些关键统计数据拿出来，发在微信里面
    // 怎么能把这两个做成返回值呢？使用resolve方法产生新的promise对象并且传递出去!
    const sheetinfo =[
        res.data.sheets[9].title,
        res.data.sheets[9].sheet_id,
        res.data.sheets[10].title,
        res.data.sheets[10].sheet_id
    ]
    sheetinfolist.push(...sheetinfo) // 用push的方法，就可以把异步返回结果推给异步过程外面创建的空数组，下面再用return promise.resolve返回这个空数组就可以
})

return Promise.resolve(sheetinfolist)
}

// // 使用示例
// getsheet('shtcni488woq45mQwYrSbYTVfBg','u-3FOy_O_ileeUWuJ_SLpePCk42ith04xzMgG0g0Q006Wb')
//     .then(sheetinfolist => console.log(sheetinfolist)) 
//     .catch(err => console.error(err));


// 使用示例，使用这个函数，用立即函数，用promise后面.then的形式
// (async () => {
//     const sheetinfolist = await getsheet('shtcni488woq45mQwYrSbYTVfBg', 'u-3FOy_O_ileeUWuJ_SLpePCk42ith04xzMgG0g0Q006Wb');
//     console.log(sheetinfolist);    
// })();

module.exports = getsheet
