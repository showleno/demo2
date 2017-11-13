define(["lib/vue-router","components/news/news", "components/hot/hot"],function(VueRouter, News, Hot){
	var routes = [
		{
			//news组件
			path:"/news",
			name:"news",
			component:News//定义组件
		},
		{
			//hot组件
			path:"/hot",
			name:"hot",
			component:Hot
		},
		{
			path:"*",
			redirect:"/news"
		}
	]
	var router = new VueRouter({
		routes : routes
	})
	return router
})