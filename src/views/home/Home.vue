<!-- 组件说明 -->
<template>
	<div class="">
		<bigDataTransfer
			:allData="allData"
			:styleObject="{
				height: '200px',
				width: '400px',
			}"
		></bigDataTransfer>
	</div>
</template>

<script>
//import x from ''
import bigDataTransfer from 'big-data-transfer';
import 'big-data-transfer/dist/big-data-transfer.css';

export default {
	name: '',
	components: {
		bigDataTransfer
	},
	data () {
		return {
			allData: []
		}
	},
	created () {
		this.mockData()
		// console.log(this.totalData);
	},
	methods: {
		mockData () {
			const arr = []
			for (let index = 0; index < 1000; index++) {
				arr.push({
					id: index,
					// checkStatus: false,
					description: 'desc' + index,
					transfer: 'left'
				})
			}
			this.allData = arr
			// console.log(this.allData);
		}
	}
}
</script>

<style lang='scss' scoped>
//@import url()
</style>