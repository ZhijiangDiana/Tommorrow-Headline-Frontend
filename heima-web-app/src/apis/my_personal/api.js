function Api(){
    this.vue;
}
Api.prototype = {
    setVue : function(vue){
        this.vue = vue;
    },
    // 加载数据
    loaduserinfo : function(){
        let url = this.vue.$config.urls.get('load_userinfo')
        return this.vue.$store.getEquipmentId().then(equipmentId => {
            return new Promise((resolve, reject) => {
                this.vue.$request.get(url,{}).then((d)=>{
                    resolve(d);
                }).catch((e)=>{
                    reject(e);
                })
            })
        }).catch(e=>{
            return new Promise((resolve, reject) => {
                reject(e);
            })
        })
    },
	loadUserFans : function(){
		let url = this.vue.$config.urls.get('load_user_fans')
		return this.vue.$store.getEquipmentId().then(equipmentId => {
			return new Promise((resolve, reject) => {
				this.vue.$request.get(url,{}).then((d)=>{
					resolve(d);
				}).catch((e)=>{
					reject(e);
				})
			})
		}).catch(e=>{})
	},
	loadUserFollowing : function(){
		let url = this.vue.$config.urls.get('load_user_following')
		return this.vue.$store.getEquipmentId().then(equipmentId => {
			return new Promise((resolve, reject) => {
				this.vue.$request.get(url,{}).then((d)=>{
					resolve(d);
				}).catch((e)=>{
					reject(e);
				})
			})
		}).catch(e=>{})
	}
}

export default new Api()
