<template>
    <div class="ArtCard">
        <a class="itemCard"
            v-for="item in list"
            v-bind:href="item.path" 
            v-bind:key="item.path">
            <div class="title" v-bind:href="item.path">
                <div>{{item.frontmatter.title}}</div>
            </div>
            <div class="detail">创建时间: {{item.frontmatter.createDate}}</div>
            <div class="detail tags">
                <div 
                    class="tag"
                    v-bind:key="tage"
                    v-for="tage in item.frontmatter.tagList">
                    {{tage}}
                </div>
            </div>
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
        let list = [];
        let dataList = this.$site.pages
        // 类型过滤
        dataList = dataList.filter((item)=> {
            return !['/', '/front/', '/react/', '/essay/'].includes(item.path)
        })
        console.log(dataList)
        // 排序
        dataList.sort((a,b)=> {
            let ADate = new Date(a.frontmatter.data).getTime()
            let BDate = new Date(b.frontmatter.data).getTime()
            return BDate - ADate 
        })
        // 判断是否符合this.path
        dataList.forEach((item)=> {
            if( (item.frontmatter.tags && this.path == 'all' && item.path.indexOf('/essay') < 0) ||
                (item.path.indexOf(this.path) > -1)) {
                // 创建时间 
                item.frontmatter.createDate = new Date(item.frontmatter.data).toLocaleString();
                item.frontmatter.tagList = item.frontmatter.tags.split('，')
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
            margin-top: 10px;
            font-size: 14px;
        }

        .tags {
            color #ec4646;
            display: flex;
            align-items center
            .tag  {
                border-radius: 10px;
                border: 1px solid;
                padding: 2px 5px;
                font-weight 900
                font-size 12px
                margin-right 5px
            }
        }
    }

    .itemCard:hover {
        background: rgba(215, 232, 224, 1)!important;
    }
    .itemCard:nth-child(2n+1){
        background: rgba(215, 232, 224, 0.5);
    }
</style>