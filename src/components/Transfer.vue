<!-- 组件说明 -->
<template>
	<div
		class="n-transfer"
		:style="{
			width: transferWidth,
		}"
	>
		<!-- 左侧穿梭框 START -->
		<div
			class="n-transfer-left"
			id="transfer-left"
			:style="{ width: styleObject.width }"
		>
			<div class="n-transfer-title">
				<div style="margin-left: 10px">
					<Checkbox
						:isSelectAllBox="true"
						:halfCheckStatus="leftHalfCheckStatus"
						:checkStatus="leftSelectAllStatus"
						@change="leftSelectAllChange"
					></Checkbox>
					<span style="margin-left: 10px">
						{{ leftTempData.length }} 项
					</span>
				</div>
			</div>
			<div class="n-transfer-search">
				<div
					class="n-transfer-search-border"
					:style="{
						position: 'relative',
					}"
				>
					<input
						type="text"
						v-model="leftSearchKeyword"
						:style="{ width: '100%' }"
						placeholder="搜索关键字"
						@keyup.enter="search('left')"
					/>
					<span
						class="iconfont icon-sousuo"
						@click="search('left')"
						:style="{
							position: 'absolute',
							right: '10px',
							top: '5px',
							'font-size': '14px',
							cursor: 'pointer',
						}"
					></span>
				</div>
			</div>
			<div
				class="n-transfer-body"
				:style="styleObject"
				@scroll="scrollChange('left')"
			>
				<div
					class="n-transfer-body-container"
					:style="{
						position: 'relative',
						height: leftContainerHeight,
					}"
					v-if="leftContainerFlag"
				>
					<div
						class="n-transfer-position"
						:style="{
							position: 'absolute',
							width: '100%',
							top: leftPositionTop,
						}"
					>
						<div
							class="n-transfer-item"
							v-for="(item, index) in leftDataSource"
							:key="index"
							:style="{
								height: itemHeight,
								width: '100%',
								padding: '0 12px',
							}"
						>
							<div
								v-show="item.transfer"
								:style="{
									position: 'relative',
								}"
							>
								<Checkbox
									:key="item.id"
									:checkStatus="item.checkStatus"
									@change="itemChange('left', item, $event)"
								></Checkbox>

								<span
									class="n-transfer-item-desc"
									:style="{
										'padding-left': '5px',
									}"
								>
									{{ item[descriptionIndex] }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 左侧穿梭框 END -->

		<!-- 方向按钮 START -->
		<div class="n-transfer-arrow">
			<div class="n-transfer-arrow-right" @click="transItems('right')">
				<span class="iconfont icon-arrow-right"></span>
			</div>
			<br />
			<div class="n-transfer-arrow-left" @click="transItems('left')">
				<span class="iconfont icon-arrow-left"></span>
			</div>
		</div>
		<!-- 方向按钮 END -->

		<!-- 右侧侧穿梭框 START -->

		<div
			class="n-transfer-right"
			id="transfer-right"
			:style="{ width: styleObject.width }"
		>
			<div class="n-transfer-title">
				<div style="margin-left: 10px">
					<Checkbox
						:isSelectAllBox="true"
						:halfCheckStatus="rightHalfCheckStatus"
						:checkStatus="rightSelectAllStatus"
						@change="rightSelectAllChange"
					></Checkbox>
					<span style="margin-left: 10px">
						{{ rightTempData.length }} 项
					</span>
				</div>
			</div>
			<div class="n-transfer-search">
				<div
					class="n-transfer-search-border"
					:style="{
						position: 'relative',
					}"
				>
					<input
						type="text"
						v-model="rightSearchKeyword"
						:style="{ width: '100%' }"
						placeholder="搜索关键字"
						@keyup.enter="search('right')"
					/>
					<span
						class="iconfont icon-sousuo"
						@click="search('right')"
						:style="{
							position: 'absolute',
							right: '10px',
							top: '5px',
							'font-size': '14px',
							cursor: 'pointer',
						}"
					></span>
				</div>
			</div>
			<div
				class="n-transfer-body"
				:style="styleObject"
				@scroll="scrollChange('right')"
			>
				<div
					class="n-transfer-body-container"
					:style="{
						position: 'relative',
						height: rightContainerHeight,
					}"
					v-if="rightContainerFlag"
				>
					<div
						class="n-transfer-position"
						:style="{
							position: 'absolute',
							width: '100%',
							top: rightPositionTop,
						}"
					>
						<div
							class="n-transfer-item"
							v-for="(item, index) in rightDataSource"
							:key="index"
							:style="{
								height: itemHeight,
								width: '100%',
								padding: '0 12px',
							}"
						>
							<div
								v-show="item.transfer"
								:style="{
									position: 'relative',
								}"
							>
								<Checkbox
									:key="item.id"
									:checkStatus="item.checkStatus"
									@change="itemChange('right', item, $event)"
								></Checkbox>

								<span
									class="n-transfer-item-desc"
									:style="{
										'padding-left': '5px',
									}"
								>
									{{ item[descriptionIndex] }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 右侧侧穿梭框 END -->
	</div>
</template>

<script>
//import x from ''
import Checkbox from '../components/Checkbox.vue'

export default {
	name: 'Transfer',
	components: {
		Checkbox
	},
	props: {
		styleObject
			: {
			type: Object,
			default: () => ({
				// 'width': '180px',
				'height': '200px',
			})
		},
		allData: {
			type: Array,
			default: () => ([])
		},
		searchIndex: {
			type: String,
			default: 'description'
		},
		transIndexObj: {
			type: Object,
			default: () => ({})
		},
		descriptionIndex: {
			type: String,
			default: 'description'
		},
		itemHeight: {
			type: Number,
			default: 33
		}

	},
	data () {
		return {
			startNum: 0,
			endNum: 8,
			TotalData: [],
			tempData: [],
			dataSource: [],
			leftTotalData: [],
			rightTotalData: [],
			leftTempData: [],
			rightTempData: [],
			leftContainerHeight: 0 + 'px',
			rightContainerHeight: 0 + 'px',
			containerFlag: true,
			positionTop: 0,
			leftPositionTop: 0,
			rightPositionTop: 0,
			scrollLine: 0,
			leftScrollLine: 0,
			rightScrollLine: 0,
			leftContainerFlag: true,
			rightContainerFlag: true,
			sliceLength: 9,
			// 搜索
			leftSearchKeyword: '',
			rightSearchKeyword: '',
			totalCheckStatus: false,
			leftSelectAllStatus: false,
			rightSelectAllStatus: false,
			leftHalfCheckStatus: false,
			rightHalfCheckStatus: false,

		};
	},
	computed: {
		transferWidth () {
			let width = parseInt(this.styleObject.width) || 200
			return width * 2 + 100 + 'px'
		}
	},
	created () {

	},
	mounted () {
		this.mockData()
		this.initData()
	},
	methods: {
		mockData () {

		},

		initData () {

			this.tempData = JSON.parse(JSON.stringify(this.totalData))

			this.initTotalData()

			this.initTempData()

			this.initDataSource()

			this.$forceUpdate()
			// console.log(this.leftDataSource);
		},
		initTotalData () {
			this.leftTotalData = this.totalData.filter((item) => {
				if (item.transfer == 'left') {
					return true
				}
			})
			this.rightTotalData = this.totalData.filter((item) => {
				if (item.transfer == 'right') {
					return true
				}
			})
		},
		initTempData () {
			this.leftTempData = this.tempData.filter((item) => {
				if (item.transfer == 'left') {
					return true
				}
			})
			this.rightTempData = this.tempData.filter((item) => {
				if (item.transfer == 'right') {
					return true
				}
			})
		},
		initDataSource () {
			this.leftDataSource = this.leftTempData.slice(this.leftScrollLine, this.leftScrollLine + this.sliceLength)

			this.rightDataSource = this.rightTempData.slice(this.rightScrollLine, this.rightScrollLine + this.sliceLength)
		},
		// 初始化穿梭框
		initTransfer () {
			// this.tempData = JSON.parse(JSON.stringify(this.totalData))
			this.leftContainerHeight = this.leftTempData.length * this.itemHeight + 'px'
			this.rightContainerHeight = this.rightTempData.length * this.itemHeight + 'px'

		},
		refreshTransfer () {

		},


		transItems (direction) {
			if (direction == 'right') {
				this.totalData.forEach((item) => {
					if (item.checkStatus) {
						item.transfer = 'right'
						item.checkStatus = false
					}
				})
			} else if (direction == 'left') {
				this.totalData.forEach((item) => {
					if (item.checkStatus) {
						item.transfer = 'left'
						item.checkStatus = false
					}
				})
			}

			this.initData()
			this.search('left')
			this.search('right')
			this.initDataSource()
			this.initTransfer()
			this.checkSelectAll()


		},

		itemChange (side, item, params) {
			this.checkChange(params, side, item.id)
		},
		checkChange (val, side, id) {
			if (side == 'left') {
				this.totalData.forEach((item) => {
					if (item.id == id) {
						item.checkStatus = val
					}
				})
			} else if (side == 'right') {
				this.totalData.forEach((item) => {
					if (item.id == id) {
						item.checkStatus = val
					}
				})
			}
			// 判断是否有筛选
			// leftSearchKeyword
			// rightSearchKeyword
			this.initData()
			this.search('left')
			this.search('right')
			this.initDataSource()
			this.checkSelectAll()
		},

		checkSelectAll () {

			// 左侧判断
			// 判断是否为空
			let isLeftEmpty = false
			this.leftTotalData.length > 0 ? isLeftEmpty = false : isLeftEmpty = true
			if (isLeftEmpty) {
				this.leftSelectAllStatus = false
				this.leftHalfCheckStatus = false

			}
			else if (!isLeftEmpty) {

				const isAll = this.leftTotalData.every((item) => {
					return item.checkStatus == true
				})
				const isAllNot = this.leftTotalData.every((item) => {
					return item.checkStatus == false
				})
				// 全选
				if (isAll) {

					this.leftSelectAllStatus = true
					this.leftHalfCheckStatus = false

				}
				// 全不选
				else if (isAllNot) {

					this.leftSelectAllStatus = false
					this.leftHalfCheckStatus = false

				}
				else if (!isAll && !isAllNot) {
					this.leftHalfCheckStatus = true
				}


			}

			// 右侧判断
			// 判断是否为空
			let isRightEmpty = false
			this.rightTotalData.length > 0 ? isRightEmpty = false : isRightEmpty = true
			if (isRightEmpty) {
				this.rightSelectAllStatus = false
				this.rightHalfCheckStatus = false
			}
			else if (!isRightEmpty) {
				let status
				const isAll = this.rightTotalData.every((item) => {
					return item.checkStatus == true
				})
				const isAllNot = this.rightTotalData.every((item) => {
					return item.checkStatus == false
				})
				if (isAll) {
					status = 0
					this.rightSelectAllStatus = true
					this.rightHalfCheckStatus = false

				}
				if (isAllNot) {
					status = 1
					this.rightSelectAllStatus = false
					this.rightHalfCheckStatus = false

				}
				if (!isAll && !isAllNot) {
					status = -1
					this.rightHalfCheckStatus = true
				}
				if (status == -1) {
					this.rightHalfCheckStatus = true
				}

			}



		},

		scrollChange (side) {

			if (side == 'left') {
				// 左侧滚动
				const leftBodyEl = document.querySelector('#transfer-left .n-transfer-body')
				// 翻滚的行数
				this.leftScrollLine = Math.ceil(leftBodyEl.scrollTop / this.itemHeight);
				this.leftContainerFlag = false
				this.leftPositionTop = leftBodyEl.scrollTop + 'px'
				this.leftDataSource = this.leftTempData.slice(this.leftScrollLine, this.leftScrollLine + this.sliceLength)
				this.leftContainerFlag = true
			} else if (side == 'right') {
				// 右侧滚动
				const rightBodyEl = document.querySelector('#transfer-right .n-transfer-body')
				// 翻滚的行数
				this.rightScrollLine = Math.ceil(rightBodyEl.scrollTop / this.itemHeight);
				this.rightContainerFlag = false
				this.rightPositionTop = rightBodyEl.scrollTop + 'px'
				this.rightDataSource = this.rightTempData.slice(this.rightScrollLine, this.rightScrollLine + this.sliceLength)
				this.rightContainerFlag = true
			}


		},

		search (side) {
			if (side == 'left') {
				const filterTotalData = []
				this.leftTotalData.forEach((item) => {
					if (item[this.searchIndex].indexOf(this.leftSearchKeyword) != -1) {
						filterTotalData.push(item)
					}
				})
				this.leftTempData = filterTotalData
				this.leftDataSource = this.leftTempData.slice(0, this.sliceLength)
			} else if (side == 'right') {
				const filterTotalData = []
				this.rightTotalData.forEach((item) => {
					if (item[this.searchIndex].indexOf(this.rightSearchKeyword) != -1) {
						filterTotalData.push(item)
					}
				})
				this.rightTempData = filterTotalData
				this.rightDataSource = this.rightTempData.slice(0, this.sliceLength)

			}

			this.initTransfer()

		},
		selectAll (side) {
			if (side == 'left') {
				if (this.leftSelectAllStatus == true) {
					this.leftTotalData.forEach((item) => {
						item.checkStatus = true
					})
				} else if (this.leftSelectAllStatus == false) {
					this.leftTotalData.forEach((item) => {
						item.checkStatus = false
					})
				}

			} else if (side == 'right') {

				if (this.rightSelectAllStatus == true) {
					this.rightTotalData.forEach((item) => {
						item.checkStatus = true
					})
				} else if (this.rightSelectAllStatus == false) {
					this.rightTotalData.forEach((item) => {
						item.checkStatus = false
					})
				}
			}

			this.totalData = this.leftTotalData.concat(this.rightTotalData)
			this.initData()

		},
		leftSelectAllChange (status) {
			this.leftSelectAllStatus = status
			this.selectAll('left')
		},
		rightSelectAllChange (status) {
			this.rightSelectAllStatus = status
			this.selectAll('right')
		}
	},
	watch: {
		allData: {
			immediate: true,
			handler (value) {
				value.forEach((item) => {
					item.checkStatus = false
				})
				this.totalData = JSON.parse(JSON.stringify(value))
			}
		},
		styleObject: {
			immediate: true,
			handler (value) {
				this.sliceLength = Math.ceil(parseInt(value.height) / this.itemHeight) + 1
			}
		},
		totalData: {
			deep: true,
			handler (val) {
				this.$emit('change', val)
			}
		},
		// 穿梭条件判断
		transIndexObj: {
			immediate: true,
			deep: true,
			handler (val) {
				if (val !== {}) {
					const transIndex = val.transIndex
					const leftVal = val.leftVal
					const rightVal = val.rightVal
					const totalData = []
					this.allData.forEach(item => {
						let transfer;
						if (item[transIndex] === leftVal) {
							transfer = 'left'
						} else if (item[transIndex] === rightVal) {
							transfer = 'right'
						}
						totalData.push(Object.assign(item, { transfer }))
					})
					this.totalData = totalData
					this.initData()
					this.initTransfer()
				}
			}
		},

	}
}
</script>

<style lang='scss' scoped>
@import url("../assets/font_icon/iconfont.css");

/*	隐藏CheckBox属性原来的样式*/
input[type="checkbox"] {
	/* visibility 属性规定元素是否可见*/
	visibility: hidden;
}

.checkbox-container {
	position: relative;
	.label-unchecked1 {
		position: absolute;
		width: 16px;
		height: 16px;
		line-height: 16px;
		cursor: pointer;
		border: 1px solid #ccc; /*改变复选框的边框颜色也可以不要边框*/
		border-radius: 2px;
	}
	.label-checked1 {
		position: absolute;
		width: 16px;
		height: 16px;
		line-height: 16px;
		cursor: pointer;
		border: 1px solid #ccc; /*改变复选框的边框颜色也可以不要边框*/
		background-color: #66f;
		border-radius: 2px;
	}
}

.label-unchecked {
	position: absolute;
	top: 6px;
	width: 16px;
	height: 16px;
	line-height: 16px;
	cursor: pointer;
	border: 1px solid #ccc; /*改变复选框的边框颜色也可以不要边框*/
	border-radius: 2px;
}

/* checked 预先选定复选框或单选按钮。*/
.label-checked {
	position: absolute;
	top: 6px;
	width: 16px;
	height: 16px;
	line-height: 16px;
	cursor: pointer;
	border: 1px solid #ccc; /*改变复选框的边框颜色也可以不要边框*/
	background-color: #66f;
	border-radius: 2px;
}

// 穿梭框部分
.n-transfer {
	// width: 550px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	text-align: left;
	color: rgba(0, 0, 0, 0.65);
}

.n-transfer-arrow {
	.n-transfer-arrow-left,
	.n-transfer-arrow-right {
		width: 20px;
		height: 20px;
		border: 1px solid #d9d9d9;
	}
}

.n-transfer-left,
.n-transfer-right {
	border: 1px solid #d9d9d9;
	border-radius: 4px;

	.n-transfer-title {
		display: flex;
		align-items: center;
		height: 39px;
		border-bottom: 1px solid #d9d9d9;
		.n-transfer-title-content {
			display: flex;
			align-items: center;
		}
	}

	.n-transfer-search {
		padding: 12px;
		.n-transfer-search-border {
			input {
				padding: 0 24px 0 8px;
				height: 32px;
				border: 1px solid #d9d9d9;
				border-radius: 2px;
			}
			input:focus {
				outline: none !important;
			}
		}
	}

	.n-transfer-body {
		height: 100%;
		overflow: auto;
		.n-transfer-item {
			height: 33px;
			line-height: 33px;
		}
	}
}

.n-transfer-arrow-right,
.n-transfer-arrow-left {
	border: 1px solid #d9d9d9;
	border-radius: 2px;
	display: flex;
	align-items: center;
}
</style>