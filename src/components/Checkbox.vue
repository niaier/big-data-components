<!-- 组件说明 -->
<template>
	<div class="n-checkbox">
		<label
			:style="{
				display: 'inline-block',
				position: 'relative',
				width: '16px',
			}"
		>
			<span
				class="checkbox-indeterminate"
				:style="{
					display: 'inline-block',
					position: 'relative',
					width: '16px',
				}"
			>
				<span
					:style="{}"
					:class="{
						'checkbox-inner-default': true,
						'checkbox-inner-checked':
							(checkedStatus && !isSelectAllBox) ||
							(checkedStatus &&
								isSelectAllBox &&
								!halfCheckStatus),
						'checkbox-inner-half':
							halfCheckStatus && isSelectAllBox,
					}"
				></span>

				<input
					type="checkbox"
					class="checkbox-input"
					v-model="checkedStatus"
				/>
			</span>
		</label>
	</div>
</template>

<script>
//import x from ''
export default {
	name: 'NCheckbox',
	components: {

	},
	props: {
		checkStatus: {
			type: Boolean,
			default: false
		},
		halfCheckStatus: {
			type: Boolean,
			default: false
		},
		isSelectAllBox: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			checkedStatus: false
		};
	},
	computed: {

	},
	methods: {
		change () {
		}
	},
	watch: {
		checkStatus: {
			immediate: true,
			handler (value) {
				this.checkedStatus = value
			}
		},
		checkedStatus (value) {
			this.$emit('change', value)
		}
	}
}
</script>

<style lang='scss' scoped>
//@import url()
.n-checkbox {
	display: inline-block;
	position: relative;
	width: 16px;
	height: 16px;
	text-align: left;
	/*	隐藏CheckBox属性原来的样式*/
	input[type="checkbox"] {
		/* visibility 属性规定元素是否可见*/
		visibility: hidden;
	}

	.n-checkbox-checked {
		display: block;
		position: relative;
		height: 16px;
		width: 16px;
	}

	.checkbox-indeterminate {
		display: block;
		position: relative;
		width: 16px;
		height: 16px;
		border: 0;
	}
	.checkbox-inner-default {
		border: 1px solid #d9d9d9;
		border-radius: 2px;
		display: block;
		position: absolute;
		width: 16px;
		height: 16px;
		top: 50%;
		transform: translateY(-6px);
	}

	.checkbox-inner-half:after {
		display: block;
		position: absolute;
		width: 8px;
		height: 8px;
		top: 50%;
		left: 50%;
		background-color: #1890ff;
		border: 0;
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;
		content: " ";
	}

	.checkbox-inner-checked {
		// border: 1px solid #d9d9d9;
		// border-radius: 2px;
		// display: block;
		// position: absolute;
		// width: 16px;
		// height: 16px;
		background-color: #1890ff;
	}

	.checkbox-inner-checked:after {
		display: block;
		position: absolute;
		border: 2px solid #fff;
		width: 6px;
		height: 9px;
		border-top: 0;
		border-left: 0;
		top: 7px;
		left: 3px;
		transform: rotate(45deg) scale(1) translate(-50%, -50%);
		opacity: 1;
		content: " ";
	}

	.checkbox-input {
		display: block;
		position: absolute;
	}

	.n-checkbox-checked:after {
		position: absolute;
		width: 8px;
		height: 8px;
		top: 4px;
		left: 4px;
		background-color: #1890ff;
		border: 0;
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;
		content: " ";
	}
}
</style>