<template>
    <div class="bar_bg">
        <image class="back" src="/static/images/buttons/fanhui.png" @click="back"/>
        <Search
                :icon="icon"
                @onSubmit="onSubmit"
                :value="value"
                :radius="62"
                :placeholder="placeholder"
                right-width="30"
                left-width="30" />
      <image class="home" @click="home" src="/static/images/buttons/close.png"/>
<!--        <text class="icon" @click="home">&#xf00d;</text>-->
    </div>
</template>

<script>
    import Search from '@/compoents/inputs/search';
    export default {
        name: "search_top_bar",
        components: {Search},
        props : {
            value : {
                type:String,
                default:'12'
            },
            placeholder:{
                type:String,
                default:'请输入...'
            }
        },
        data(){
            return {
                icon:'\uF002'
            }
        },
        methods:{
            back : function(){
                this.$router.back()
            },
            home : function(){
                this.$router.push('/home');
            },
            onSubmit : function(val){
                this.$emit('onSubmit', val);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../styles/common';
    .bar_bg{
        width: @screen-width;
        flex-direction: row;
        background-color: #ffffff;
        border-style: solid;
        height: @top-height;
        padding: 7px 15px 7px 20px;
        align-items: center;
        }
    .back {
      width: 32px;
      height: 32px;
      margin-left: 15px;
    }
    .home {
      width: 40px;
      height: 37px;
      margin-right: 15px;
    }
    .icon{
        color: #111111;
        font-size: 42px;
    }
</style>
