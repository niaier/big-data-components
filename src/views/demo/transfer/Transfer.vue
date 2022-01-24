<!-- 组件说明 -->
<template>
	<div class="demo-transfer">
		<Transfer
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
		></Transfer>
	</div>
</template>

<script>
//import x from ''
import Transfer from '@/components/Transfer.vue'

export default {
	name: 'demo-transfer',
	components: {
		Transfer
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
			for (let index = 0; index < 10000; index++) {
				arr.push({
					id: index,
					ppp: 'desc' + index,
					// transfer: 'left'
					disable: index % 2 === 0 ? true : false
				})
			}
			this.allData = arr
			// console.log(this.allData);
		},
		transferChange (val) {
			// console.log('change');
			console.log('new', val);
		}
	}
}
</script>

<style lang='scss' scoped>
//@import url()
</style>