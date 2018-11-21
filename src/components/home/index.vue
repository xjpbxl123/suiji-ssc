<template>
  <div class="box">
    <!-- <div class="boxm" @click="getCopy">copy</div>
    <textarea ref="textarea" name="" id="" cols="30" rows="10">sucsesss</textarea>-->
    <div>
      <button @click="getStart" class="startll">startll</button>
      <button>{{this.sanxingResult}}</button>
    </div>
    <div @click="getSend">链接服务-------链接服务</div>
    <div class="box-row">
      <div :style="val.bg" class="box-main" v-for="val,index in forData" :key="index">
        <div>
          <button @click="getCreate(index)">创建</button>
          <div>
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
          </div>
          <div>
            <span>容错</span>
            <input type="text" v-model="val.rongC.left">
            <span>--</span>
            <input type="text" v-model="val.rongC.right">
          </div>
          <div class="isAllright">
            <span>全对</span>
            <textarea ref="allRight" v-model="val.rightIndex">{{getIsAll(val.isRight,index)}}</textarea>
            <button @click="getReset(val.isRight,index)" class="reset">reset</button>
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
            <button @click="getResultCopy(index)">复制</button>
          </div>
        </div>
        <div class="boxbottom">
          <div v-for="vals,indexs in val.createNum" :key="indexs">
            <div class="r-main">
              <textarea>{{vals.join(' ')}}</textarea>
              <div class="r-main-right">
                <div>
                  <span class="r-num">{{vals.length}}</span>
                  <input type="checkbox" class="checkbox">
                  <span>{{indexs}}</span>
                  <!-- <span>复制</span> -->
                </div>
                <div class="result-div">
                  <span v-for="valss,indexss in val.isRight[indexs]">{{valss}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.success-re {
  display: flex;
  align-items: center;
}
.startll {
  width: 50px;
  height: 50px;
  background: pink;
}
.result-t {
  width: 50px;
  margin-right: 50px;
}
.result-tt {
  width: 200px;
}
.startB {
  background: yellow;
}
.isAllright {
  display: flex;
  align-items: center;
}
.box {
  display: flex;
  flex-direction: column !important;
}
.box-row {
  display: flex;
  flex-direction: row !important;
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
  flex: 1;
}
textarea {
  width: 90px;
  height: 70px;
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
      successRong: ["", "", "", "", ""],
      resultEnd: [[], [], [], [], []],
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
        }
      ]
    };
  },
  methods: {
    getIsAll(isRightArr, i_index) {
      let arr = [];
      if (!(isRightArr.length && isRightArr[0].length > 1)) {
        return;
      }
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
      if (this.onlineCount >= 3) {
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
      Array.from({ length: 5 }, (val, index) => {
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
