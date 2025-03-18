function Api(){
    this.vue;
}
Api.prototype = {
    setVue : function(vue){
        this.vue = vue;
    },
    // 登录
    login: function(data){
        let url = this.vue.$config.urls.get('user_login')
        return this.vue.$request.postByEquipmentId(url,data)
    },
	register: function(data){
			let url = this.vue.$config.urls.get('user_register')
		return this.vue.$request.postByEquipmentId(url,data)
	},
	sendVerifyCode : function(data){
			let url = this.vue.$config.urls.get('send_code')
		return this.vue.$request.postByEquipmentId(url,data)
	}
}

export default new Api()
