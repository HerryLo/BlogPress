<template>
    <div class="ArtCard">
        <div class="itemCard"
            v-for="item in list" 
            v-bind:key="item.path">
            <a v-bind:href="item.path">
                <div>{{item.frontmatter.title}}</div>
            </a>
            <div class="detail">{{item.lastUpdated}}</div>
            <div class="detail">{{item.frontmatter.tags}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    },
    mounted() {
        let dataList = this.$site.pages
        // console.log(this.$site)
        dataList = dataList.filter((item)=> {
            return !['/', '/front/'].includes(item.path)
        })
        console.log(dataList)
        this.list = dataList
    }
}
</script>

<style lang="stylus">
    .itemCard {
        padding: 30px 0px;
        padding-left: 20px;
        border-radius: 10px;
        margin: 10px 0px;

        .detail {
            color: #aaa;
            padding-left: 20px;
            margin-top: 10px;
            font-size: 14px;
        }
    }

    .itemCard:hover {
        background: rgba(215, 232, 224, 0.3);
    }
    .itemCard:nth-child(2n){
        background: rgba(215, 232, 224, 0.3);
    }
</style>