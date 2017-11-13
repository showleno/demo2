define(["css!components/static.css","css!components/news/news.css"],function(){
	var News = {
		template:"#tpl_carousel",
		data:function(){
			return {
				carousel:[],
				nav:[
					{
						"text":"新品到着",
						"url":"menu_01.png",
						"type":"news"
					},
					{
						"text":"人气搭配",
						"url":"menu_02.png",
						"type":"news"
					},
					{
						"text":"折扣专区",
						"url":"menu_03.png",
						"type":"news"
					},
					{
						"text":"全部分类",
						"url":"menu_04.png",
						"type":"news"
					}
				],
				items:[
					{"type":"clothes","url":"01.jpg"},
					{"type":"clothes","url":"02.jpg"},
					{"type":"clothes","url":"03.jpg"},
					{"type":"clothes","url":"04.jpg"},
					{"type":"clothes","url":"05.jpg"},
					{"type":"clothes","url":"06.jpg"},
					{"type":"clothes","url":"07.jpg"},
					{"type":"clothes","url":"08.jpg"},
					{"type":"clothes","url":"09.jpg"},
					{"type":"clothes","url":"10.jpg"},
					{"type":"clothes","url":"11.jpg"},
					{"type":"clothes","url":"12.jpg"}
				],
				product:[],
				list:[],
				//手势事件轮播图所需信号量
				x:0,		//记录手势坐标
				lock:true, 	//节流锁
				idx:0,
				num:8,		//图片长度
				timeOut:'',		//自动播放
				setTranstion:'all 1s ease 0s',
				setTransform:'none',
				width:document.documentElement.clientWidth,
				
				//横向滚动
				scrollx:0,
			}
		},
		created:function(){
			this.$http.get('data/news.json')
				.then(function(res){
				if( res && res.data.errno === 0 ){
					this.carousel = res.data.data.carousel;
					this.product = res.data.data.product;
					this.list = res.data.data.list;
					var first = this.carousel[0];
					this.carousel.push(first)
				}
			})
			
		},
		computed:{
		},
		mounted:function(){
			this.eventScroll();
			this.autoPlay();
		},	
		methods:{
			eventScroll: function(){
				var me = this;
				var onOff = true;
				window.addEventListener("scroll",function(){
					if (document.body.offsetHeight <= document.documentElement.scrollTop + window.innerHeight) {
						if(onOff){
							onOff = false;
							me.$http.get('data/news.json')
							.then(function(res){
								console.log(res.data.data.list)
								res.data.data.list.forEach(function(val,index){ 
			                           me.list.push(val);
			                    }); 
								onOff = true;
							})
						}
					}
				})
			},
			touchStart:function(e){
				clearInterval(this.timeOut);
				if(!this.lock){return};
					// 记录当前ul的坐标值
					this.x = e.touches[0].clientX;
					// // 将ul的过渡属性去掉
					this.setTranstion = "none";
			},
			touchMove:function(e){
				if(!this.lock){return};
				console.log(this.width)
					// 实时的让ul跟随手指移动
					if(this.idx===0 && ((e.touches[0].clientX-this.x)>0)){
						this.setTransform = "translateX("+((-this.num*this.width)+(e.touches[0].clientX-this.x))+"px)";
						console.log(this.width)
					}else{
				  		this.setTransform ="translateX("+(-this.idx*this.width+(e.touches[0].clientX-this.x))+"px)";
					}
			},
			touchEnd:function(e){
				if(!this.lock){return};
				console.log(3);
				this.lock = false;
				// 将过渡还原
				this.setTranstion = "all 1s ease 0s";
				// 手指离开的位置
				var leave_x = e.changedTouches[0].clientX;
				// 手指移动的距离
				var moved_x = leave_x-this.x; 
				// 如果手指移动超过100像素的距离 则根据移动的方向决定idx++还是idx--
				if(moved_x > 100 || moved_x < -100){
					if(moved_x>0){
						console.log("this.idx--")
						this.idx--;
						if(this.idx<0){
							this.idx=this.num-1;
						}
					}else{
						console.log("this.idx++")
						this.next();
					}
				}
				var me = this;
				this.setTransform = "translateX("+(-this.idx*this.width)+"px)";
				setTimeout(function(){
					console.log("锁开了")
					me.lock=true
					me.autoPlay();
				},1500)
			},
			changeCircle:function(circle){
				if(this.lock){
					// this.lock = false;
					this.idx = circle-1;
					this.setTransform = "translateX("+(-this.idx*this.width)+"px)";
				}
			},
			next: function(){
				this.setTranstion = "all 1s ease 0s";
				// clearTimeout(this.timeOut)
				this.idx++;
				if(this.idx>=this.num){
					var me = this;
					// 因为向左滑动图片到最后一张的时候，这个时候应该等待过渡动画完成之后再取消过渡，然后再瞬移
					setTimeout(function(){
					    	me.idx=0;
							me.setTranstion = "none";
							me.setTransform = "translateX(0px)";
							me.lock = true;
					},1500)
				}
				this.setTransform = "translateX("+(-this.idx*this.width)+"px)";
			},
			autoPlay: function(){
				clearInterval(this.timeOut);
				var me = this;
				this.timeOut = setInterval(function(){
					me.next();
				},2000)
			},
			// scrollTouchStart:function(){
			// 	this.scrollx = e.touches[0].clientX;
			// },
			// scrollTouchMove: function(){
			// 	// 实时的让ul跟随手指移动
			// 	if(this.scrollIdx===0 && ((e.touches[0].clientX-this.scrollx)>0)){
			// 		this.setTransform = "translateX("+((-this.num*this.width)+(e.touches[0].clientX-this.x))+"px)";
			// 		console.log(this.width)
			// 	}else{
			//   		this.setTransform ="translateX("+(-this.idx*this.width+(e.touches[0].clientX-this.x))+"px)";
			// 	}
			// },
			// scrollTouchend:function(){

			// }
		}
	}
	return News;
})