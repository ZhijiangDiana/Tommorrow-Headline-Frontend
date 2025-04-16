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
	},
	loaddata : function(params){
		let url = this.vue.$config.urls.get('load_history');
		return this.vue.$store.getEquipmentId().then(equipmentId=> {
			return new Promise((resolve, reject) => {
				this.vue.$request.post(url,params,{}).then((d)=>{
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
	uploadImage : function(data){
		let url = this.vue.$config.urls.get('upload_image')
		return this.vue.$store.getEquipmentId().then(equipmentId => {
			return new Promise((resolve, reject) => {
				this.vue.$request.multipart(url,data).then((d)=>{
					resolve(d);
				}).catch((e)=>{
					reject(e);
				})
			})
		})
	},
	recoIdCard: function(data){
		let url = this.vue.$config.urls.get('reco_id_card')
		return this.vue.$store.getEquipmentId().then(equipmentId => {
			return new Promise((resolve, reject) => {
				this.vue.$request.post(url,data).then((d)=>{
					resolve(d);
				}).catch((e)=>{
					reject(e);
				})
			})
		})
	},
	getRealnameStatus: function(data) {
			let url = this.vue.$config.urls.get('get_realname_status')
		return this.vue.$store.getEquipmentId().then(equipmentId => {
			return new Promise((resolve, reject) => {
				this.vue.$request.post(url,data).then((d)=>{
					resolve(d);
				}).catch((e)=>{
					reject(e);
				})
			})
		})
	},
	restartRealname: function(data){
			let url = this.vue.$config.urls.get('restart_realname')
		return this.vue.$store.getEquipmentId().then(equipmentId => {
			return new Promise((resolve, reject) => {
				this.vue.$request.post(url,data).then((d)=>{
					resolve(d);
				}).catch((e)=>{
					reject(e);
				})
			})
		})
	},
	submitRealname: function (data) {
			let url = this.vue.$config.urls.get('submit_realname')
		return this.vue.$store.getEquipmentId().then(equipmentId => {
			return new Promise((resolve, reject) => {
				this.vue.$request.post(url,data).then((d)=>{
					resolve(d);
				}).catch((e)=>{
					reject(e);
				})
			})
		})
	}
}

export default new Api()
