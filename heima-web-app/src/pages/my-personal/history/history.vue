<template>
  <div class="wrapper" @touchmove.stop>
    <div class="top-body">
      <common_top_bar text="历史记录"></common_top_bar>
    </div>
    <div class="content-body">
      <list @touchmove.self class="item-container">
        <!-- 列表项，并绑定显示事件 -->
        <cell v-for="(item,key) in tabList" class="cell" @appear="show(item.id)" :key="key">
          <wxc-pan-item :ext-id="'1-' + (key)" @wxcPanItemClicked="wxcPanItemClicked(item)">
            <Item1 :data="item"/>
          </wxc-pan-item>
        </cell>
        <!-- 上来加载更多 -->
        <loading @loading="loadmore" :display="showmore?'show':'hide'">
          <loading-indicator class="loading-icon"></loading-indicator>
          <text class="loading-text">上拉加载更多...</text>
        </loading>
      </list>
    </div>
  </div>
</template>

<script>
import {Utils, WxcPanItem} from "weex-ui";
import ArticleWithHistory from "@/compoents/cells/article_with_history.vue";
import Api from "@/apis/my_personal/api";
import Common_top_bar from "@/compoents/bars/common_top_bar.vue";
import WxcTabPage from "@/compoents/tabs/home_tabs.vue";

const modal = weex.requireModule("modal")

export default {
  name: "history",
  components: {WxcTabPage, Common_top_bar, WxcPanItem, Item1: ArticleWithHistory},
  created() {
    this.tabPageHeight = Utils.env.getPageHeight()
    Api.setVue(this);

    this.$store.getToken().then(token => {
      this.token = token
    }).catch((e)=>{
      console.log(e)
    })
    this.$store.getEquipmentId().then(equipmentId=> {
      this.equipmentId = equipmentId
    }).catch((e)=>{
      console.log(e)
    })
  },
  mounted() {
    this.params.loaddir=1
    this.shownew=true
    this.load();
  },
  data: () => ({
    showmore: false,//是否显示loadmore动画
    tabList: [],//列表数据集合
    tabPageHeight: 1334,//列表总高度
    params:{
      loaddir:1,
      index:0,
      tag:"__all__",
      type: "__history__",
      size:10,
      maxBehotTime: 20000000000000,
    },//列表数据请求参数
    ashow : {},//列表展示行为记录表
    token: '',
    equipmentId: ''
  }),
  methods: {
    // 列表项在可见区域展示后的事件处理
    show:function(id){
      if(this.ashow[id]==undefined){
        this.ashow[id]=true;
      }
    },
    // 上拉加载更多
    loadmore:function(){
      this.showmore=true;
      console.log(`loadmore: ${this.showmore}`)
      this.params.loaddir=2
      this.load();
    },
    // 正常加载数据
    load : function(){
      Api.loaddata(this.params).then((d)=>{
        // console.log(`data: ${JSON.stringify(d.data)}`)
        this.tanfer(d.data,d.host);
        console.log(`tabList: ${JSON.stringify(this.tabList)}`)
      }).catch((e)=>{
        console.log(e)
      })
    },
    // 列表数据转换成View需要的Model对象
    tanfer : function(data,host){
      if(data.length==0){
        this.showmore=false;
        modal.toast({message:'没有数据了...',duration:3})
        return ;
      }
      // 将最大时间设置为最后一个article的阅读时间
      this.params.maxBehotTime = new Date(data[data.length-1].publishTime).getTime();
      let arr = []
      for(let i=0;i<data.length;i++){
        let ims = []
        if(data[i].images){
          let imagesArr = data[i].images.replace(/[\[\]]/ig,'').split(',')
          for(var j = 0;j<imagesArr.length;j++){
            // ims.push(host+imagesArr[j])
            ims.push(imagesArr[j])
          }
        }
        const { id: articleId, title, comment, authorId, authorName, publishTime } = data[i]
        const querystr = `?token=${this.token}&equipmentId=${this.equipmentId}&articleId=${articleId}&title=${title}&authorId=${authorId}&authorName=${authorName}&publishTime=${publishTime}`
        let tmp = {
          id: articleId,
          title: title,
          comment: comment,
          authorId: authorId,
          source: authorName,
          date: publishTime,
          type: ims.length==2?1:ims.length,
          image: ims,
          icon: '\uf06d',
          staticUrl: `${data[i].staticUrl}${querystr}`
        }
        arr.push(tmp);
      }
      // this.$router.push({
      //   name:'article-info',
      //   params:arr[0]
      // })
      if(this.params.loaddir!=0){
        arr = this.tabList.concat(arr);
      }else{
        arr = arr.concat(this.tabList);
      }
      this.tabList = arr;
      this.showmore=false;
    },
    // 列表项点击事件
    wxcPanItemClicked(item){
      this.$router.push({
        name:'article-info',
        params:item
      })
      console.log(item.staticUrl)
    }
  }
}
</script>

<style scoped lang="less">
@import '../../../styles/article';
.wrapper{
  background-color: @body-background;
  font-size: @font-size;
  font-family: @font-family;
  flex-direction : column;
  flex-wrap:wrap;
}
.top-body{
}
.content-body{
  flex: 1;
  flex-direction : column;
}
.item-container {
  width: 750px;
  background-color: #ffffff;
}
.cell {
  background-color: #ffffff;
}
</style>