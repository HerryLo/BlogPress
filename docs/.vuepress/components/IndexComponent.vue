<template>
    <div class="index-container">
        <div class="demo-card-wide mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title"></div>
        </div>
        <div class="card">
            <div class="content">
                <div class="title">前端开发技术文章</div>
                <div>从事前端开发职业，19年初开始构建自己的个人博客，输出</div>
            </div>
            <div class="see">查看</div>
        </div>
        <div class="card">
            <div class="content">
                <div class="title">前端开发技术文章</div>
                <div>从事前端开发职业，19年初开始构建自己的个人博客，输出</div>
            </div>
            <div class="see">查看</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IndexComponent',
    created() {},
    destroyed() {},
    mounted() {
        
    },
    methods: {

    }
}
</script>

<style lang="stylus">
    .index-container  {
        display: flex;
        flex-direction: column;

        .card {
            display: flex;
            justify-content:space-between;
            align-items: center;
            padding: 20px;
            box-shadow: 0px 0px 5px 1px #eee;
            background: rgba(215,232,224,0.5);
            margin-bottom: 20px;

            .title {
                color: #3eaf7c;
                padding-bottom: 10px;
            }

            .index-start {
                background: #3eaf7c;
                width: 150px;
                text-align: center;
                height: 60px;
                border-radius: 10px;
                color: #fff;
                line-height: 60px;
                font-size: 22px;
            }
        }
        .demo-card-wide.mdl-card {
            width: 100%;
            padding-bottom: 20px;
        }
        .demo-card-wide > .mdl-card__title {
            color: #fff;
            height: 300px;
            background: linear-gradient(270deg, #28e0b0, #c328e0, #28a1e0, #e0286b)  center / cover;
            background-size: 800% 800%;
            -webkit-animation: AnimationName 30s ease infinite;
            -moz-animation: AnimationName 30s ease infinite;
            animation: AnimationName 30s ease infinite;
            text-align: center;
            line-height: 300px;
            font-size: 24px;
            box-shadow: 0px 0px 5px 1px #eee;
            border-radius: 10px;
        }
        @-webkit-keyframes AnimationName {
            0%{background-position:0% 50%}
            50%{background-position:100% 50%}
            100%{background-position:0% 50%}
        }
        @-moz-keyframes AnimationName {
            0%{background-position:0% 50%}
            50%{background-position:100% 50%}
            100%{background-position:0% 50%}
        }
        @keyframes AnimationName { 
            0%{background-position:0% 50%}
            50%{background-position:100% 50%}
            100%{background-position:0% 50%}
        }
    }
</style>