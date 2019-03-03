<template>
  <div class="boxs">
    <!-- <div class="boxm" @click="getCopy">copy</div>
    <textarea ref="textarea" name="" id="" cols="30" rows="10">sucsesss</textarea>-->
    <div class="box-one">
      <button @click="getStart" class="startll">startll</button>
      <button>{{this.sanxingResult}}</button>
      <button>{{this.onlineCount}}</button>
      <input class="CQresult" v-model="CQresult" type="text">
      <button @click="startCQresult">computed</button>
      <button class="bbbttt" v-text="ifok"></button>
      <button class="isFirstWindow" @click="setFirstWindow" v-text="isFirstWindow?'第一位':'任意位'"></button>
      <button v-show="acceptSocket">被socket</button>
      <button v-show="isFirstWindow" v-text="isLazyEnd?'懒人end':'懒人ing'" @click="getLazy"></button>
      <button @click="getRouter" style="{marginLeft:400px}">交集容错</button>
    </div>
    <!-- <div class="link-on" @click="getSend">链接服务-------链接服务</div> -->
    <div class="box-row">
      <div :style="val.bg" class="box-main" v-for="(val,index) in forData" :key="index">
        <div>
          <div class="isAllright">
            <span>全对</span>
            <textarea class="allRight-t" ref="allRight" v-model="val.rightIndex"></textarea>
            <!-- <button @click="getReset(val.isRight,index)" class="reset">reset</button> -->
            <button @click="getCopyallRight(index)" class="getCopyallRight">复制</button>
          </div>
          <!-- <div>
            <button @click="getResult(index)" class="startB">容错</button>
            <input type="text" value="1">
            <span>--</span>
            <input type="text" value="8">
          </div>-->
          <div>
            <!-- <div>容错对应的索引</div> -->
            <textarea v-model="successRong[index]" class="result-tt">111111</textarea>
          </div>
          <div class="success-re">
            <div>结果</div>
            <textarea v-text="resultEnd[index].join(' ')" ref="numResult" class="result-t"></textarea>
            <span>{{resultEnd[index].length}}</span>
            <button
              class="res_s"
              :class="{isRed:val.red,isYellow:val.yellow,isPink:val.pink}"
              @click="getResultCopy(index)"
            >复制</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bbbttt {
  margin-left: 100px;
  margin-right: 50px;
}
.CQresult {
  width: 100px;
  margin-left: 100px;
}
.res_s {
  background: pink;
}
.isPink {
  background: blue;
}
.isYellow {
  background: yellow !important;
}
.allRight-t {
  width: 30px;
  height: 30px;
}
.result-tt {
  height: 50px;
}
.link-on {
  background: #ccc;
  height: 30px;
}
.box-one {
  width: 100%;
  background: blue;
  margin-bottom: 10px;
}
.success-re {
  display: flex;
  align-items: center;
}
.isRed {
  background: red !important;
}
.startll {
  width: 50px;
  height: 50px;
  background: pink;
}
.result-t {
  width: 50px;
  height: 30px;
  margin-right: 37px;
}
.result-tt {
  width: 195px;
}
.startB {
  background: rgba(78, 79, 33, 1);
}
.isAllright {
  display: flex;
  align-items: center;
}

.box-row {
  display: flex;
  flex-direction: row !important;
  flex-wrap: wrap;
}
.boxbottom {
  margin-top: 50px;
}
.result-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 8px;
  font-size: 12px;
}
.boxbottom > div {
  margin-bottom: 15px;
}
.box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  min-height: 1000px;
}
input {
  width: 50px;
}
.box-main {
  width: 197px;
  margin-bottom: 10px;
  margin-right: 7px;
  border-bottom: 5px solid red;
  /* flex: 1; */
}
textarea {
  width: 90px;
  height: 70px;
  padding: 0;
  margin: 0;
}
.r-main {
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.r-main-right {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.r-num {
  margin-right: 37px;
  font-size: 12px;
}
.checkbox {
  width: 60px;
  height: 60px;
}
.isFirstWindow {
  margin-right: 20px;
}
</style>
<script>
import { makeDadi, ARRNUM } from "./index.js";
import { setTimeout, clearTimeout } from "timers";

export default {
  data() {
    return {
      nowNum: '',
      totalNum: 33, //21
      acceptSocket: false,
      isFirstWindow: false,
      isLazyEnd: false,
      otherWindowNum: "",
      CQresult: "12345",
      arrs: [{ x: 1 }, { y: 2 }],
      onlineCount: 0,
      markCreate: [],
      arrNum: [],
      sanxingResult: false,
      allRight: [],
      successRong: [],
      resultEnd: [],
      jujeZhu: [],
      rightIndex: [],
      ifok: "ready",
      forData: [
        {
          num: 50,
          bottomNum: 610,
          geshu: 3,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(222, 55, 111, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(111, 255, 11, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(255, 255, 11, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(15, 99, 11, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(15, 199, 77, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },

        {
          num: 50,
          bottomNum: 610,
          geshu: 3,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(232, 25, 11, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },

        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(111, 255, 11, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(255, 255, 11, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(15, 99, 11, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(15, 199, 77, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },

        {
          num: 50,
          bottomNum: 610,
          geshu: 3,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(232, 25, 11, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(20, 77, 88, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          bottomNum: 610,
          geshu: 3,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(222, 55, 111, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(111, 255, 11, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(255, 255, 11, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(15, 99, 11, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(15, 199, 77, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },

        {
          num: 50,
          bottomNum: 610,
          geshu: 3,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(232, 25, 11, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(20, 77, 88, 0.7)" },
          createNum: [],
          isRight: [],
          rightIndex: ""
        }
      ]
    };
  },
  watch: {
    onlineCount(val) { }
  },
  methods: {
    getRouter() {
      this.$router.push({ path: "/login" });
    },
    getLazy() {
      this.$socket.send("pianoClassroom.lazy", {
        isLazy: "lazy"
      });
    },
    otherWindowStart() {
      let arrs = this.otherWindowNum.split(" ");
      this.nowNum = this.otherWindowNum
      arrs.forEach((val, index) => {
        this.ifok = "rea111dy";
        this.getserverData(val);
      });
    },
    startCQresult() {
      if (!this.isFirstWindow && this.CQresult === "12345") {
        this.acceptSocket = false;
        return this.otherWindowStart();
      }
      this.isFirstWindow && this.getSend(this.CQresult, true);
      this.isLazyEnd = false;
      let arrs = this.CQresult.split(" ");
      arrs.forEach((val, index) => {
        this.ifok = "rea111dy";
        this.getserverData(val);
      });
    },
    goto() {
      let a = this.arrs;
      a.splice(0, 1);
    },
    resetColor(color = { pink: false, red: false, yellow: false }, index) {
      this.$set(this.forData[index], "pink", color.pink);
      this.$set(this.forData[index], "red", color.red);
      this.$set(this.forData[index], "yellow", color.yellow);
    },
    isRedBlack(resolve) {
      let ids = setTimeout(() => {
        clearTimeout(ids);
        this.forData.forEach((val, index) => {
          let len = val.rightLength.length - 1;
          if (val.rightLength[len] === val.rightLength[len - 1]) {
            if (this.forData[index].yellow === true) {
              this.resetColor({ pink: true, red: false, yellow: false }, index);
            } else {
              if (this.forData[index].red === true) {
                this.resetColor(
                  { pink: false, red: false, yellow: true },
                  index
                );
              } else if (this.forData[index].pink === true) {
                this.resetColor(
                  { pink: true, red: false, yellow: false },
                  index
                );
              } else {
                this.resetColor(
                  { pink: false, red: true, yellow: false },
                  index
                );
              }
            }
          } else {
            this.$set(this.forData[index], "red", false);
            this.$set(this.forData[index], "yellow", false);
            this.$set(this.forData[index], "pink", false);
          }
        });
        this.ifok = "实战ok6or7";
        resolve();
      }, 1000);
    },
    readyResult() { },
    getIsAll(isRightArr, i_index) {
      let arr = [];
      isRightArr.forEach((val, index) => {
        let r = val.every((vals, indexs) => {
          if (vals === "错") {
            return false;
          } else {
            return true;
          }
        });
        if (r) {
          arr.push(index);
        }
      });
      this.$set(this.forData[i_index], "rightIndex", arr.join(","));
      this.forData[i_index].rightLength.push(arr.length);
    },
    getReset(getIsAll, i_index) {
      this.getIsAll(getIsAll, i_index);
    },
    getResult(index) {
      let r = this.successRong[index].replace(/\s/g, "").split(",");
      this.makeResult(r, index);
    },
    getResultsRight(index) {
      if (!!!this.forData[index].rightIndex.replace(/\s/g, "")) {
        return this.resultEnd.splice(index, 1, ["787"]);
      }
      let r = this.forData[index].rightIndex.replace(/\s/g, "").split(",");
      this.makeResult(r, index);
    },
    makeResult(resultArr, i_index) {
      let params = this.forData[i_index].createNum;
      let re = ARRNUM.filter(valNum => {
        return resultArr.some(val_index => {
          return !params[val_index].includes(valNum);
        });
      });

      this.resultEnd.splice(i_index, 1, re);
    },
    getserverData(data) {
      return new Promise(resolve => {
        this.sanxingResult = data;
        this.forData.forEach((val, index) => {
          val.createNum.forEach((vals, indexs) => {
            let r = vals.includes(this.sanxingResult);
            if (r) {
              val.isRight[indexs].push("对");
            } else {
              val.isRight[indexs].push("错");
            }
          });
        });
        if (this.forData[0].isRight[0].length > 4) {
          this.forData.forEach((val, index) => {
            this.getIsAll(val.isRight, index);
          });
        }
        this.markCreate.forEach((valx, index_x) => {
          this.getAgain(parseInt(valx));
        });
        this.onlineCount++;
        this.ifok = "count-Ok";

        if (this.onlineCount >= 5) {
          console.log("我要飞");
          console.dir(this.forData);
          console.dir(this.onlineCount);
          this.markCreate.forEach((valx, index_x) => {
            this.getResultsRight(parseInt(valx));
          });
          if (this.onlineCount === 5) {
            return resolve();
          }
          let timeid = setTimeout(() => {
            clearTimeout(timeid);
            if (this.onlineCount >= 6) {
              return this.isRedBlack(resolve);
            }
            this.ifok = "第5次ok";
          }, 1000);
        } else {
          resolve();
        }
      });
    },
    getAgain(index) {
      let params = this.forData[index];

      let resultArr = Array.from({ length: parseInt(params.num) }, () => {
        return this.getComputed(params);
      });
      this.$set(params, "createNum", resultArr);
    },
    getSend(num, resetFirst) {
      this.$socket.send("pianoClassroom.getFirst", {
        num: num,
        resetFirst: resetFirst
      });
    },
    getCopy() {
      this.$refs.textarea.select();
      console.log(this.$refs.textarea.select);
      document.execCommand("Copy"); // 执行浏览器复制命令
    },
    getCopyallRight(index) {
      this.$refs.allRight[index].select();
      document.execCommand("Copy");
    },
    getResultCopy(index) {
      this.$refs.numResult[index].select();
      document.execCommand("Copy");
    },
    getComputed(val) {
      let reArr = [];
      let re1;
      let re2;
      let result;
      for (let i = 0; i < val.geshu; i++) {
        reArr.push(new Set(makeDadi(610)));
      }
      re1 = [...reArr[0]].filter(val => {
        return reArr[1].has(val) && reArr[2].has(val);
      });

      re2 = ARRNUM.filter(val => {
        return reArr.every(setArr => {
          return !setArr.has(val);
        });
      });
      result = ARRNUM.filter(val => {
        return ![...re1, ...re2].includes(val);
      });
      return result;
    },
    getCreate(index) {
      this.markCreate.push(index);
      this.markCreate = [...new Set(this.markCreate)];
      // console.log(1);
      let params = this.forData[index];

      let resultArr = Array.from({ length: parseInt(params.num) }, () => {
        return this.getComputed(params);
      });
      let isR = Array.from({ length: parseInt(params.num) }, () => {
        return [];
      });
      this.$set(params, "isRight", isR);
      this.$set(params, "createNum", resultArr);
    },
    resetArr() {
      let num = 0;
      let result;
      this.arrNum = Array.from({ length: 1000 }, () => {
        result = num.toString().padStart(3, "00");
        num++;
        return result;
      });
    },
    getStart() {
      Array.from({ length: this.totalNum }, (val, index) => {
        this.getCreate(index);
      });
    },
    ResetData() {
      return new Promise(resolve => {
        this.forData = Array.from({ length: this.totalNum }, (val, index) => {
          return {
            num: 50,
            bottomNum: 610,
            geshu: 3,
            rongC: { left: 1, right: 2 },
            bg: { backgroundColor: "rgba(222, 55, 111, 0.7)" },
            createNum: [],
            isRight: [],
            rightIndex: "",
            rightLength: [],
            pink: false,
            red: false,
            yellow: false
          };
        });
        this.successRong = Array.from({ length: this.totalNum }, () => {
          return "";
        });
        this.resultEnd = Array.from({ length: this.totalNum }, () => {
          return [];
        });
        let id = setTimeout(() => {
          clearTimeout(id);
          resolve();
        }, 300);
      });
    },
    setSocket() {
      this.$socket.eventOnByVue({
        "pianoClassroom.getFirst": data => {
          console.log('wokk')
          if (this.isFirstWindow) return;
          this.acceptSocket = true;
          this.otherWindowNum = data.num;
        }
      });
      this.$socket.eventOnByVue({
        "pianoClassroom.lazy": data => {
          if (this.isFirstWindow) return this.isLazyEnd = data.isEnd;;
          if (this.nowNum === this.otherWindowNum) return
          this.startCQresult();
        }
      });
    },
    setFirstWindow(arrNum) {
      if (this.isFirstWindow) {
        return this.getSend(this.CQresult);
      }
      this.isFirstWindow = true;
    }
  },

  created() {
    this.ResetData().then(() => {
      let id = setTimeout(() => {
        clearTimeout(id);
        this.getStart();
        this.ifok = "第一次随机ok";
      }, 2000);
    });
    this.setSocket();
  },
  components: {}
};
</script>
