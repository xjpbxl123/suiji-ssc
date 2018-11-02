<template>
    <div id="vueMain">
        <FindLive2d :liveWH='abc'>
            <div>123</div>
        </FindLive2d>
        <router-view></router-view>
    </div>
</template>


<style scoped lang='scss'>
    .boxss {
        color: blue
    }
</style>

<script>
    export default {
        data() {
            return {
                abc: {
                    width: 400,
                    height: 600
                }
            }
        },
        find: {
            a() {

            }
        },
        created() {
            console.log(this.$findLive2d)
            console.log('mark----')
        }
    }
</script>