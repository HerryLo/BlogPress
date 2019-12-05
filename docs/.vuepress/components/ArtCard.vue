<template>
    <div class="ArtCard">
        <a class="itemCard"
            v-for="item in list"
            v-bind:href="item.path" 
            v-bind:key="item.path">
            <div class="title" v-bind:href="item.path">
                <div>{{item.frontmatter.title}}</div>
            </div>
            <div class="detail">上次更新：{{item.lastUpdated}}</div>
            <div class="detail tag">{{item.frontmatter.tags}}</div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'ArtCard',
    data() {
        return {
            list: [],
            path: this.type
        }
    },
    props: ['type'],
    mounted() {
        let dataList = this.$site.pages
        let list = [];
        // console.log(dataList, this.path);
        // 过滤
        dataList = dataList.filter((item)=> {
            return !['/', '/front/', '/react/', '/essay/'].includes(item.path)
        })
        // console.log(dataList)
        // 排序
        dataList.sort((a,b)=> {
            let ADate = new Date(a.frontmatter.data).getTime()
            let BDate = new Date(b.frontmatter.data).getTime()
            return BDate - ADate 
        })
        // 判断是否为数组
        try{
            this.path = (JSON.parse(this.path) instanceof Array) ? JSON.parse(this.path) : this.path
        }catch(e){
            // console.log(e);
        }

        dataList.forEach((item)=> {
            if( (item.frontmatter.tags && this.path == 'all') ||
                (item.path.indexOf(this.path) > -1)) {
                list.push(item)
            }
        })
        this.list = list
    }
}
</script>

<style lang="stylus">
    .itemCard {
        padding: 30px 0px;
        padding-left: 20px;
        border-radius: 10px;
        margin: 20px 0px;
        box-shadow: 0px 0px 5px 1px #eee;
        display block;

        .title {
            font-weight 700
            color #000
            font-size 18px
        } 

        .detail {
            color: #aaa;
            padding-left: 20px;
            margin-top: 10px;
            font-size: 14px;
        }

        .tag {
            color #ec4646
        }
    }

    .itemCard:hover {
        background: rgba(215, 232, 224, 1)!important;
    }
    .itemCard:nth-child(2n+1){
        background: rgba(215, 232, 224, 0.5);
    }
</style>