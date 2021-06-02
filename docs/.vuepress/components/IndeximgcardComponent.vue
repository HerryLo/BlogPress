<template>
    <div class="imgCard">
        <a  
            class="img"
            v-for="item in list"
            v-bind:href="item.href"
            v-bind:key="item.href"
            target="_blank">
            <img v-bind:src="item.imgUrl" />
        </a>
    </div>
</template>

<script>
export default {
    name: 'IndeximgcardComponent',
    data() {
        return {
            list: [
                {
                    "href": "https://www.kuaikanmanhua.com/web/topic/2583/","imgUrl": "/image/bcmw2-qiw8c-2.jpg"
                }
            ]
        }
    },
    mounted() {

    }
}
</script>

<style lang="stylus">
    .imgCard {
        display: flex;
        align-items: center;
        justify-content space-around;
        .img {
            width 360px;
            img {
                border-radius 8px;
            }
        }
    }
</style>