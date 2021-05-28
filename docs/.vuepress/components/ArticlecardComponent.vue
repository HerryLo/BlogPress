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
    name: 'ArticlecardComponent',
    data() {
        return {
            list: [],
            path: this.type,
            typeDesc: this.desc
        }
    },
    props: ['type', 'desc'],
    mounted() {
        const $site = this.$site;
        const pages = $site.pages;
        const themeConfig = $site.themeConfig;
        const sidebar = themeConfig.sidebar;
        const currentSidebar = sidebar[`/${this.path}/`];

        let sidebarList = [];
        // console.log(currentSidebar)
        if(this.typeDesc === 'principle'){
            // 二维数组取第二个
            sidebarList = sidebarList.concat(currentSidebar[1].children)
        }else if(currentSidebar[0] instanceof Object) {
            // 二维数组取第一个
            sidebarList = sidebarList.concat(currentSidebar[0].children)
        }else {
            sidebarList = sidebarList.concat(currentSidebar)
        }

        const list = [];    
        sidebarList.forEach((item)=> {
            let page = null;
            if(item instanceof Object) {
                const path = item.path;
                const date = path.split('/').pop();
                page = pages.filter(page => page.regularPath.includes(date));
            }else if(item && typeof item === 'string') {
                page = pages.filter(page => page.regularPath.includes(item)); 
            }
            if(page && page.length){
                const frontmatter = page[0].frontmatter;
                frontmatter.createDate = frontmatter.date;
                if(frontmatter.tags.length) {
                    frontmatter.tagList = frontmatter.tags.split('，');
                }
                list.push(page[0]);
            }
        })
        this.list = list
    },
    methods: {
        
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