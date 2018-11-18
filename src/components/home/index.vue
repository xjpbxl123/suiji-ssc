<template>
  <div class="box">
    <!-- <div class="boxm" @click="getCopy">copy</div>
    <textarea ref="textarea" name="" id="" cols="30" rows="10">sucsesss</textarea>-->
    <div @click="getSend">链接服务-------链接服务</div>
    <div @click="getIs">链接服务-------链接服务</div>
    <div @click="getIs">链接服务-------链接服务</div>
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
        </div>
        <div class="boxbottom">
          <div v-for="vals,indexs in val.createNum" :key="indexs">
            <div class="r-main">
              <textarea>{{vals.join(' ')}}</textarea>
              <div class="r-main-right">
                <div>
                  <span class="r-num">num</span>
                  <input type="checkbox" class="checkbox">
                  <span>{{indexs}}</span>
                  <!-- <span>复制</span> -->
                </div>
                <div class="result-div">
                  <!-- <span v-for="valss,indexss in val.isRight">{{val}}</span> -->
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
}
.checkbox {
  width: 30px;
  height: 30px;
}
</style>
<script>
import { makeDadi, ARRNUM } from "./index.js";

export default {
  data() {
    return {
      arrNum: [],
      sanxingResult: undefined,
      forData: [
        {
          num: 50,
          bottomNum: 610,
          geshu: 3,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(222, 55, 111, 0.7)" },
          createNum: [],
          isRight: []
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(111, 255, 11, 0.7)" },
          createNum: [],
          isRight: []
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(255, 255, 11, 0.7)" },
          createNum: [],
          isRight: []
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(15, 99, 11, 0.7)" },
          createNum: [],
          isRight: []
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(15, 199, 77, 0.7)" },
          createNum: [],
          isRight: []
        }
      ]
    };
  },
  methods: {
    getIs() {
      this.getserverData({ result: "78789" });
    },
    getserverData(data) {
      this.sanxingResult = data.result.substring(2);
      console.log(this.sanxingResult);
      console.log(this.sanxingResult);
      this.forData.forEach((val, index) => {
        val.createNum.forEach((vals, indexs) => {
          let r = vals.join(" ").indexOf(this.sanxingResult);
          if (r !== -1) {
            val.isRight[indexs].push("对");
          } else {
            val.isRight[indexs].push("对");
          }
        });
      });
    },
    getSend() {
      this.$socket.send("pianoClassroom.getonline", { a: 12 });
    },
    getCopy() {
      this.$refs.textarea.select();
      console.log(this.$refs.textarea);
      document.execCommand("Copy"); // 执行浏览器复制命令
    },
    getComputed(val) {
      console.dir(val);
      let reArr = [];
      let re1;
      let re2;
      let result;
      for (let i = 0; i < val.geshu; i++) {
        reArr.push(new Set(makeDadi(610)));
      }
      console.log([...reArr[0]]);
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
      let params = this.forData[index];
      let resultArr = Array.from({ length: 50 }, () => {
        return this.getComputed(params);
      });
      let isR = Array.from({ length: 50 }, () => {
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
