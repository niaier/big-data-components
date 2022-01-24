<template>
	<div class="home" :style="{ height: '100%' }">
		<a-layout :style="{ height: '100%' }">
			<a-layout-header
				:style="{ position: 'fixed', zIndex: 1, width: '100%' }"
			>
				<div class="logo" />
				<h1
					:style="{
						color: '#fff',
					}"
				>
					BIG-DATA-COMPONENTS
				</h1>
			</a-layout-header>

			<a-layout-sider
				width="200"
				style="background: #fff; margin-top: 64px"
			>
				<a-menu
					mode="inline"
					:default-selected-keys="['1']"
					:default-open-keys="['sub1']"
					:style="{ height: '100%', borderRight: 0 }"
				>
					<a-menu-item key="1" @click="gotoPage('Home')">
						<a-icon type="user" />
						<span>Home</span>
					</a-menu-item>
					<a-sub-menu key="sub2">
						<span slot="title"><a-icon type="laptop" />Demo</span>
						<a-menu-item key="5" @click="gotoPage('DemoTransfer')">
							穿梭框 Transfer
						</a-menu-item>
					</a-sub-menu>
					<a-sub-menu key="sub3">
						<span slot="title"
							><a-icon
								type="notification"
								to="/origin"
							/>origin</span
						>
						<a-menu-item key="9" to="/originTransfer">
							穿梭框 Transfer
						</a-menu-item>
					</a-sub-menu>
				</a-menu>
			</a-layout-sider>

			<a-layout style="padding: 0 24px 24px; margin-top: 64px">
				<a-layout-content
					:style="{
						background: '#fff',
						padding: '24px',
						margin: 0,
						minHeight: '280px',
					}"
				>
					<router-view></router-view>
				</a-layout-content>
			</a-layout>
		</a-layout>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Home',
	components: {
	},
	data () {
		return {
		}
	},
	created () {

	},
	methods: {
		gotoPage (name) {
			this.$router.push({ name: name });
		}
	}
}
</script>


<style>
#components-layout-demo-basic {
	text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
	background: #7dbcea;
	color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
	line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
	background: #3ba0e9;
	color: #fff;
	line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
	background: rgba(16, 142, 233, 1);
	color: #fff;
	min-height: 120px;
	line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
	margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
	margin: 0;
}
</style>
