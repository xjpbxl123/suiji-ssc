<template>
  <div class="boxs">
    <!-- <div class="boxm" @click="getCopy">copy</div>
    <textarea ref="textarea" name="" id="" cols="30" rows="10">sucsesss</textarea>-->
    <div class="box-one">
      <button @click="getStart" class="startll">startll</button>
      <button>{{this.sanxingResult}}</button>
      <button>{{this.onlineCount}}</button>
    </div>
    <div class="link-on" @click="getSend">链接服务-------链接服务</div>
    <div class="box-row">
      <div :style="val.bg" class="box-main" v-for="val,index in forData" :key="index">
        <div>
          <!-- <button @click="getCreate(index)">创建</button> -->
          <!-- <div>
            <span>总组数</span>
            <input type="text" v-model="val.num">
          </div>
          <div>
            <span>大地注数</span>
            <input type="text" v-model="val.bottomNum">
          </div>
          <div>
            <span>大地个数</span>
            <input type="text" v-model="val.geshu">
          </div>-->
          <!-- <div>
            <span>容错</span>
            <input type="text" v-model="val.rongC.left">
            <span>-</span>
            <input type="text" v-model="val.rongC.right">
          </div>-->
          <div class="isAllright">
            <span>全对</span>
            <textarea class="allRight-t" ref="allRight" v-model="val.rightIndex">{{getIsAll(val.isRight,index)}}</textarea>
            <!-- <button @click="getReset(val.isRight,index)" class="reset">reset</button> -->
            <button @click="getCopyallRight(index)" class="getCopyallRight">复制</button>
          </div>
          <div>
            <button @click="getResult(index)" class="startB">容错</button>
            <input type="text" value="1">
            <span>--</span>
            <input type="text" value="8">
          </div>
          <div>
            <div>容错对应的索引</div>
            <textarea v-model="successRong[index]" class="result-tt">111111</textarea>
          </div>
          <div class="success-re">
            <div>结果</div>
            <textarea v-model="resultEnd[index].join(' ')" ref="numResult" class="result-t"></textarea>
            <span>{{resultEnd[index].length}}</span>
            <button
              class="res_s"
              :class="{isRed:val.red,isBlack:val.black}"
              @click="getResultCopy(index)"
            >复制</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.res_s {
  background: blue;
}
.isBlack {
  background: black !important;
}
.allRight-t {
  width: 30px;
  height: 30px;
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
</style>
<script>
import { makeDadi, ARRNUM } from "./index.js";
import { setTimeout, clearTimeout } from "timers";

export default {
  data() {
    return {
      onlineCount: 0,
      markCreate: [],
      arrNum: [],
      sanxingResult: false,
      allRight: [],
      successRong: [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      resultEnd: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ],
      jujeZhu: [],
      rightIndex: [],
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
    onlineCount(val) {
      if (val === 5) {
        this.readyResult();
      }
      if (val === 6) {
        this.readyResult();
        this.isRedBlack();
      }
      if (val === 7) {
        this.isRedBlack();
      }
    }
  },
  methods: {
    isRedBlack() {
      let r;
      let t = setTimeout(() => {
        clearTimeout(t);
        this.rightIndex.forEach((val, index) => {
          console.log(this.rightIndex);
          r = this.jujeZhu[index] / 1 - this.resultEnd[index].length;
          if (val === this.forData[index].rightIndex) {
            this.$set(this.forData[index], "red", true);
            return;
          }
          if (Math.abs(r) <= 19) {
            this.$set(this.forData[index], "black", true);
            return;
          }
          this.$set(this.forData[index], "red", false);
          this.$set(this.forData[index], "black", false);
        });
      }, 5000);
    },
    readyResult() {
      let t = setTimeout(() => {
        // this.jujeZhu = this.resultEnd;
        clearTimeout(t);
        this.forData.forEach((val, index) => {
          this.jujeZhu[index] = this.resultEnd[index].length;
          this.rightIndex.splice(index, 1, val.rightIndex);
        });
      }, 20000);
    },
    getIsAll(isRightArr, i_index) {
      if (!(isRightArr.length && isRightArr[0].length > 1)) {
        return;
      }
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

      // this.rightIndex.splice(i_index, 1, arr.join(","));
      this.$set(this.forData[i_index], "rightIndex", arr.join(","));
    },
    getReset(getIsAll, i_index) {
      this.getIsAll(getIsAll, i_index);
    },
    getResult(index) {
      let r = this.successRong[index].replace(/\s/g, "").split(",");
      this.makeResult(r, index);
    },
    getResultsRight(index) {
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

      // this.jujeZhu.splice(i_index, 1, re);
      this.resultEnd.splice(i_index, 1, re);
    },
    getserverData(data) {
      this.onlineCount++;
      this.sanxingResult = data.result.substring(0, 3);

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

      this.markCreate.forEach((valx, index_x) => {
        this.getAgain(parseInt(valx));
      });
      if (this.onlineCount >= 2) {
        let timeid = setTimeout(() => {
          clearTimeout(timeid);
          this.markCreate.forEach((valx, index_x) => {
            this.getResultsRight(parseInt(valx));
          });
        }, 2000);
      }
    },
    getAgain(index) {
      let params = this.forData[index];

      let resultArr = Array.from({ length: parseInt(params.num) }, () => {
        return this.getComputed(params);
      });
      this.$set(params, "createNum", resultArr);
    },
    getSend() {
      this.$socket.send("pianoClassroom.getonline", { a: 12 });
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
      console.log(this.markCreate);
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
      Array.from({ length: 21 }, (val, index) => {
        this.getCreate(index);
      });
    }
  },
  created() {
    this.$socket.eventOnByVue({
      "pianoClassroom.getonline": this.getserverData
    });
  },
  components: {}
};
</script>
