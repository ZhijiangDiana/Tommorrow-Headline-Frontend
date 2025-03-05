// ============  主页路由MODEL  ==================
import Layout from '@/compoents/layouts/layout_main'
import Home from '@/pages/home/index'
import Article from '@/pages/article/index'
import CommentRepay from '@/pages/comment-repay/index'
import Search from '@/pages/search/index'
import Login from '@/pages/login/index'
import Screen from '@/pages/load_screen/index'
import SearchResult from '@/pages/search_result/index'
import MyPersonal from "@/pages/my-personal/my-personal.vue";
import FollowerFollowing from "@/pages/my-personal/follower_following/follower-following.vue";
import History from "@/pages/my-personal/history/history.vue";
import Star from "@/pages/my-personal/star/star.vue";

let routes = [
    {
        path: '/',
        component: Layout,
        children:[
            {
                path:'/home',
                name:'Home',
                component: Home
            },{
                path: '/my-personal',
                name: 'my-personal',
                component: MyPersonal
            }
        ]
    },{
        path:'/screen',
        name: 'screen',
        component:Screen
    },{
        path:'/login',
        name: 'login',
        component:Login
    },{
        path:'/article',
        name: 'article-info',
        component:Article,
        props:true
    },{
        path: '/comment-repay',
        name: 'comment-repay',
        component: CommentRepay,
        props: true,
    },{
        path:'/search',
        name: 'search',
        component:Search
    },{
        path:'/search_result',
        name: 'search_result',
        component:SearchResult,
        props:true
    },{
				path: '/my-personal/follower_following',
				name: 'follower_following',
				component: FollowerFollowing
		},{
		path: '/my-personal/history',
		name: 'history',
		component: History
	},{
		path: '/my-personal/star',
		name: 'star',
		component: Star
	}
]

export default routes;
