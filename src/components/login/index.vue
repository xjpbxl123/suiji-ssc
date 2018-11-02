<template>
    <div>
        <div class="box">
            <div class="box1">11111</div>
            <canvas class="box2"></canvas>
        </div>
    </div>
</template>


<style scoped>
    .box {

        position: fixed;
        display: flex;
        flex-direction: column;
        left: 0;
        top: 200px;
    }

    .box1 {}

    .box2 {
        width: 400px;
        height: 400px;
        background: blue
    }
</style>


<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {

        },
        methods: {
            abc() {
                return new Promise((re, rj) => {
                    setTimeout(() => {
                        alert(1)
                        re('firset')
                    }, 3000)
                })
            }
        },
        created() {
            function F() {

            }
            F.prototype.ff = {
                a: 55
            }
            let m = new F()
            let m1 = new F()
            console.log(m.ff === m1.ff)
            m.ff.a = 22
            console.log(m1.ff.a)


        }
    }
</script>