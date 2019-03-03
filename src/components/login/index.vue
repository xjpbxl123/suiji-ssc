<template>
  <div class="login">
    <div class="div-rc">
      <input class="rc" type="text" v-model="lowR">
      <input type="button">
      <input class="rc" type="text" v-model="highR">
      <button @click="getStart">开始交集</button>
      <button class="tx" v-text="this.resultData.length"></button>
      <textarea v-text="this.resultData.join(' ')" class="txtx" ref="tx"></textarea>
      <button @click="getCopy">复制</button>
    </div>
    <div class="main">
      <div class="item-div" v-for="(val,index) in dataArray" :key="index">
        <button class="Allnum" v-text="getNum(val)"></button>
        <button @click="getWork(false,index)">清空</button>
        <textarea v-model="val.num" class="tarea"></textarea>
      </div>
    </div>
  </div>
</template>


<script>
import { ARRNUM } from "../home/index.js";

export default {
  data() {
    return {
      lowR: 0,
      highR: 0,
      dataArray: [],
      comData: [],
      resultData: []
    };
  },
  methods: {
    getStart() {
      this.comData = []
      this.resultData = []
      let re
      this.dataArray.forEach((val) => {
        re = val.num.split(' ')
        if (re.length > 10) {
          this.comData.push(re)
        }
      })
      this.getComputed(this.comData, this.lowR / 1, this.highR / 1)
    },
    getComputed(comData, lowR, highR) {
      let count = 0
      ARRNUM.forEach((num, index) => {
        count = 0
        comData.some((data) => {
          if (data.includes(num)) return
          count++
          if (count > highR) return true
        })
        if (count <= highR && count >= lowR) this.resultData.push(num)
      })
    },
    getWork(isWork, index) {
      if (isWork) return;
      this.$set(this.dataArray[index], 'num', '')
    },
    getNum(val) {
      let r = val.num.replace(/\s/g, '')
      if (r === '') return 0
      return val.num.split(' ').length
    },
    getCopy() {
      this.$refs.tx.select();
      document.execCommand("Copy");
    }
  },
  created() {
    this.dataArray = Array.from({ length: 30 }, () => {
      return { num: "" };
    });
  },
  mounted() {

  }
};
</script>


<style scoped lang="scss">
.rc {
  width: 20px;
  height: 20px;
}
.tx {
  margin-left: 100px;
}
.txtx {
  margin-right: 50px;
}
.div-rc {
  margin-left: 50px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  margin-right: 50px;
}
.Allnum {
  width: 50px;
}
.main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .item-div {
    display: flex;
    align-self: center;
    margin-bottom: 30px;
    margin-left: 20px;
  }
  .tarea {
  }
}
</style>