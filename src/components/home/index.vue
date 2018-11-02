<template>
    <div id="divBox">
        <div>
            <button class="btn" ref="btns" @click='buttonClick1'>appear</button>
            <button @click='buttonClick6'>buttonClick6</button>
            <button @click='buttonClick2'>buttonClick2</button>
            <button @click='buttonClick3'>buttonClick3</button>
            <button @click='buttonClick4'>buttonClick4</button>
            <button @click='buttonClick5'>buttonClick5</button>
            <button @click='buttonClick7'>做动作</button>
            <button @click='buttonClick8'>做表情</button>
            <button @click='buttonClick9'>做pose</button>
            <button @click='buttonClick10'>放大</button>
            <button @click='buttonClick11'>buttonClick11</button>
            <button @click='buttonClick12'>动画</button>

        </div>
        <div class="bg"></div>
        <!-- <canvas width="200" height="300" id="boxss"></canvas> -->

        <!-- <div id="fix">
            <div class="fix1"></div>
            <div class="fix2"></div>
        </div> -->
        <!-- <canvas width="500" height="700" id="canvas"></canvas> -->
        <!-- <blog-post>
            <h1 slot="header">
                About Me
            </h1>

            <p>Here's some page content, which will be included in vm.$slots.default, because it's not inside a named slot.</p>

            <p slot="footer">
                Copyright 2016 Evan You
            </p>

            <p>If I have some content down here, it will also be included in vm.$slots.default.</p>.
        </blog-post> -->
    </div>
</template>

<style scoped lang="scss">
    .bg {
        width: 200px;
        height: 200px;
        background-color: rgba(255, 0, 223, 0.1);
        opacity: 0.5;
    }

    #fix {
        position: fixed;
        left: 0;
        top: 0;

        .fix1 {
            width: 100px;
            height: 200px;
            background: yellow;
        }

        .fix2 {
            width: 200px;
            height: 200px;
            background: rgb(144, 193, 212);
        }
    }

    canvas {
        background: yellow;
    }

    #dibox {
        width: 500px;
        height: 600px;
        background: yellow;
    }

    #canvas {
        /* background: blue; */

        position: absolute;
        left: 0;
        top: 0;
    }

    .foo {
        color: red;
    }
</style>

<script>
    import jquery from "jquery";
    import Vue from "vue";
    import { setTimeout } from "timers";
    import vue from "vue";
    // import FindLive2D from './live.js'
    let mm = require("./live.js");
    let p = require("./images/more.png");
    let cx = {};
    let obj = { a: "123", b: cx };
    // let obj1 = {}

    export default {
        data() {
            return {
                can: 123,
                canSon1: "",
                canSon2: "",
                domBox: "",
                model: ""
            };
        },
        find: {
            b() {}
        },
        methods: {
            buttonClick6() {
                //   this.$FindLive2d.disappear();
                // this.$FindLive2d.addModel({
                //     name: "haru",
                //     configUrl: "/src/live2d/haru/haru.model.json"
                // });
                this.model.carryAnimationsEnd();
                console.log(cx);
            },
            buttonClick1() {
                this.model
                    .carryAnimations([{
                            startMotion: {
                                name: "tab_b",
                                id: 0
                            }
                        },
                        {
                            startMotion: {
                                name: "tab_b",
                                id: 1
                            },
                            textObj: {
                                text: "hellow world",
                                animation: true
                            }
                        },
                        {
                            startMotion: {
                                name: "tab_b",
                                id: 2,
                                soundUrl: "sounds/01.wav"
                            },
                            textObj: "close"
                        }
                    ])
                    .then(() => {
                        console.log(1233333333);
                    });
            },
            buttonClick2() {
                //
                //   this.can.canvas.width = 1000;
                //   this.can.canvas.height = 1000;
                //   this.can.animation({ width: 500, height: 500, time: "1s" }).then(() => {
                //     this.canSon1.scale({ scale: 0.5 });
                //   });
                //   this.can.init({ init: true, cWidth: 500, height: 500 });
                //   this.$router.push({ path: "/login" });
                // this.model.startMotion({ name: 'tab_b', id: 1 }).then(() => {

                // })
                this.model.mouseSpeakMotion({
                    text: '',
                    motion: {
                        name: "tab_b",
                        id: 2,
                        soundUrl: "sounds/01.wav",
                        newMotion: true
                    }
                });

                //   this.$FindLive2d.appear();
            },
            buttonClick3() {
                console.log(this.$FindLive2d.getAllModel());
                this.$FindLive2d.setPosition({ name: "haru", position: 1 });
            },
            buttonClick4() {
                this.$FindLive2d.setPosition({ name: "good", position: 1 });
            },
            buttonClick5() {
                // this.can.move({ x: 400, y: 500, time: "1s" }).then(data => {});
                this.can.addModel({
                    name: "aa",
                    configUrl: "/src/live2d/haru/haru_01.model.json"
                });
            },
            buttonClick7() {
                this.canSon1.startMotion({ name: "tap_body", id: 2 });
            },
            buttonClick8() {
                this.canSon1.startExpress({ name: "f05" });
            },
            buttonClick9() {
                this.canSon1.startPose({ pose: "haru.pose.json" });
            },
            buttonClick10() {
                this.canSon1.scale({ scale: 1.5 });
            },
            buttonClick11() {
                this.canSon1
                    .replacePart({
                        picArr: [
                            "haru_02.1024/texture_00.png",
                            "haru_02.1024/texture_01.png",
                            "haru_02.1024/texture_02.png"
                        ]
                    })
                    .then(() => {
                        alert(111);
                    });
            },
            buttonClick12() {
                this.canSon1
                    .mouseSpeak({
                        soundUrl: "sounds/tapBody_00.mp3",
                        startExpress: "f05",
                        mouseSpeed: 2
                    })
                    .then(() => {
                        // alert(1);
                    });
            }
        },
        mounted() {
            let obj = [{}, {}, {}];
            obj.forEach((val, index) => {
                delete obj[index];
            });
            console.log(obj.push(123));
            console.log(obj.length, 11111);
            console.log("-------===");
        },
        created() {
            this.$nextTick(() => {
                this.model = this.$FindLive2d.addModel({ name: "good", configUrl: "/src/live2d/momo/momo.model.json" },
                    model => {
                        this.$FindLive2d
                            .appear({
                                startX: 400,
                                startY: -300,
                                animation: true,
                                startOpacity: 0
                            })
                            .then(data => {});
                    }
                );
            });
        }
    };
</script>