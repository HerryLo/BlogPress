<template>
    <div class="ArtCard">
        <div class="itemCard"
            v-for="item in list" 
            v-bind:key="item.path">
            <a v-bind:href="item.path">
                <div>{{item.title}}</div>
            </a>
            <div class="detail">{{item.detail}}</div>
        </div>
    </div>
</template>

<script>
import { AllDataList } from '../artConfig'

export default {
    data() {
        return {
            list: AllDataList
        }
    }
}
</script>

<style lang="stylus">
    .itemCard {
        padding: 40px 0px;
        padding-left: 10px;
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