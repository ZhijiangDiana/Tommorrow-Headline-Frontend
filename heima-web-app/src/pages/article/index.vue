<template>
  <div class="wrapper">
    <TopBar text="文章"/>
    <web ref="webview" class="webview" :src="staticUrl"></web>
  </div>
</template>

<style scoped>
  .wrapper {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
	}

	.webview {
    width: 750px;
    position: absolute;
    top: 90px;
    bottom: 0px;
    right: 0px;
    left: 0px;
  }
</style>

<script>
  import TopBar from '@/compoents/bars/article_top_bar'
  import Api from "@/apis/article/api";

  const modal = weex.requireModule('modal')

  export default {
    name: 'HeiMa-Article',
    components: { TopBar },
    props: ['staticUrl'],
    data() {
        return {
          user: {},
          article: {}
        }
    },
    created() {
      Api.setVue(this);
    },
    mounted() {
      this.decodeParams()
      this.startReadArticle()
    },
    destroyed() {
      this.endReadArticle()
    },
    methods: {
      decodeParams() {
        // 获取当前页面 URL 的参数
        const params = new URLSearchParams(this.staticUrl);

        // 获取某个参数值
        this.user.token = params.get('token');
        this.user.equipmentId = params.get('equipmentId');
        this.article.articleId = params.get('articleId');
        this.article.title = params.get('title');
        this.article.authorId = params.get('authorId');
        this.article.authorName = params.get('authorName');
        this.article.publishTime = params.get('publishTime');

        console.log(this.article);
      },
      startReadArticle() {
        console.log(`开始阅读${this.article.articleId}`)
        Api.startRead(this.article.articleId).then(response => {
          if (response.code != 200) {
            modal.toast({ message: response.errorMessage, duration: 3 });
          }
        }).catch(error => {
          modal.toast({ message: error.message,duration:3})
        })
      },
      endReadArticle() {
        console.log(`结束阅读${this.article.articleId}`)
        Api.endRead(this.article.articleId).then(response => {
          if (response.code != 200) {
            modal.toast({ message: response.errorMessage, duration: 3 });
          }
        }).catch(error => {
          modal.toast({ message: error.message,duration:3})
        })
      }
    }
  }
</script>