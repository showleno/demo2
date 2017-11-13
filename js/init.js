define(["router/router","lib/vue","lib/vue-router","lib/vue-resource"], function(router, Vue, VueRouter, VueResource){
	//安装路由模块
	Vue.use(VueRouter);
	Vue.use(VueResource);
	var app = new Vue({
		el:"#app",
		router:router,
		data:function(){
			return {
				tab:[
					{
						"title":"最新",
						"href":"#news"
					},
					{
						"title":"人气",
						"href":"#hot"
					},
					{
						"title":"搭配",
						"href":"#wear"
					},
					{
						"title":"潮品",
						"href":"#fashion"
					},
					{
						"title":"视频",
						"href":"#video"
					}
				],
				//tab
				isActive:0,
				//logo翻转
				num:0
			}
		},
		created:function(){
		},
		mounted:function(){
			var me = this
			var timer = setInterval(function(){
				me.changeNum()
			},8000)
		},
		computed:{
			
		},
		methods:{
			// goBack:function(){
			// 	$router.go(-1)
			// },
			changeNum:function(){
				if(this.num === 0){
					this.num =180
				}else{
					this.num = 0
				}
			}
		}
	})
})