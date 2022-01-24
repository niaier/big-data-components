# big-data-component

## 项目安装
```
npm install
```

### 开发环境启动
```
npm run serve
```

### 编译生产
```
npm run build
```

### 格式化
```
npm run lint
```

### 组件打包

```
npm run prepare
```

相关配置在package Script命令修改



## 相关组件

大数据穿梭框

npm安装

```
npm i -S big-data-transfer
```

本地打包编译

打包为lib

```shell
vue-cli-service build --target lib --name big-data-transfer ./src/components/Transfer.vue
```

打包为web组件

```shell
vue-cli-service build --target wc --name big-data-transfer ./src/components/Transfer.vue
```

### 使用方式



数据格式

```js
[{
	index:1,
	ppp:'desc1',
	disbale:true
	}]
```



html结构

```vue
<template>
	<div class="demo-transfer">
		<bigDataTransfer
			:allData="allData"
			:styleObject="{
				height: '200px',
				width: '400px',
			}"
			:descriptionIndex="'ppp'"
			:searchIndex="'ppp'"
			:transIndexObj="{
				transIndex: 'disable',
				leftVal: true,
				rightVal: false,
			}"
			@change="transferChange"
		></bigDataTransfer>
	</div>
</template>
```

引入js和css

```js
import bigDataTransfer from 'big-data-transfer';
import 'big-data-transfer/dist/big-data-transfer.css';

export default {
	name: '',
	components: {
		bigDataTransfer
	},
    ...
    methos:{
        transferChange(val){
            console.log(val)
        }
    }
}
```

说明
| 属性和方法       | 说明                                          | 类型          | 默认值               |
| ---------------- | --------------------------------------------- | ------------- | -------------------- |
| allData          | 传入的总数据                                  | Array         | []                   |
| styleObject      | 样式对象                                      | Object        | {'height': '200px',} |
| change           | change事件,默认返回参数为修改后的allData      | Function(val) |                      |
| searchIndex      | 搜索索引,如数据中的description键              | String        | 'description'        |
| transIndexObj    | 穿梭框索引对象,确定数据在穿梭框位置和区分标准 | Object        |                      |
| descriptionIndex | 描述索引                                      | String        | 'description'        |
| itemHeight       | 单项高度                                      | Number        | 33                   |

transIndexObj示例

```js
transIndexObj = {
	transIndex:'disable', //索引
	leftVal:true, //为true在左侧
	rightVal:false, //为false在右侧
}
```

### 使用参考

![参考](https://github.com/niaier/big-data-components/edit/master/media/参考.gif)
