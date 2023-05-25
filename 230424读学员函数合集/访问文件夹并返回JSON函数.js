
function feishureader(folder_token,usertoken,outpufile){
    const fs = require('fs');
     // node-sdk使用说明：https://github.com/larksuite/node-sdk/blob/main/README.zh.md
     const lark = require('@larksuiteoapi/node-sdk');
     

    return new Promise((resolve, reject) => {
        // 开发者复制该Demo后，需要修改Demo里面的"app id", "app secret"为自己应用的appId, appSecret
        const client = new lark.Client({
            appId: 'cli_a4982ea58219500c',
            appSecret: 'tElBvhdOKLimO6kJCMer3xndDRs7Du5d',
            // disableTokenCache为true时，SDK不会主动拉取并缓存token，这时需要在发起请求时，调用lark.withTenantToken("token")手动传递
            // disableTokenCache为false时，SDK会自动管理租户token的获取与刷新，无需使用lark.withTenantToken("token")手动传递token
            disableTokenCache: true
        });

        client.drive.file.list({
                params: {
                    folder_token: folder_token,
                },
            },
            lark.withTenantToken(usertoken)
        ).then(res => {
            // console.log(res.data.files);
            // 将对象转换为JSON字符串
            const jsonData = JSON.stringify(res.data.files, null, 2);
            // 保存到文件中
            fs.writeFileSync(outpufile, jsonData);    

            resolve(jsonData) 
    });
    }) 
}

module.exports = feishureader

