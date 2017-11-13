define(["css!components/static.css","css!components/hot/hot.css"],function(){
	var Hot = {
		template:"#hot_tpl",
		data:function(){
			return {
				info:[]
			}
		},
		created:function(){
			//请求数据
			this.$http.get('data/hot.json')
				.then(function(res){
				if( res && res.data.errno === 0 ){
					this.info = res.data.data.info
				}
			})
		}
	}
	return Hot
})