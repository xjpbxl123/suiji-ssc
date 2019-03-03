<template>
  <div class="login">
    <div class="div-rc">
      <div class="computations-div">
        <button @click="getReduce('low')" class="computations">-</button>
        <input class="rc" type="text" v-model="lowR">
        <button @click="getAdd('low')" class="computations">+</button>
        <button>--分割线--</button>
        <button @click="getReduce('high')" class="computations">-</button>
        <input class="rc" type="text" v-model="highR">
        <button @click="getAdd('high')" class="computations">+</button>
      </div>

      <button class="run-start" @click="getStart">开始交集</button>
      <button class="run-start" @click="getClear">清空所有</button>
      <button class="tx" v-text="this.resultData.length"></button>
      <textarea v-text="this.resultData.join(' ')" class="txtx" ref="tx"></textarea>
      <button @click="getCopy">复制</button>
    </div>
    <div class="main">
      <div class="item-div" v-for="(val,index) in dataArray" :key="index">
        <button class="Allnum" v-text="getNum(val)"></button>
        <button @click="getWork(false,index)">清空</button>
        <textarea v-model="val.num" class="tarea"></textarea>
        <input class="check" type="checkbox" v-model="val.isChecked">
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
    getReduce(status) {
      this.lowR = Number(this.lowR)
      this.highR = Number(this.highR)
      status === 'low' ? this.lowR === 0 ? 0 : (this.lowR -= 1) : this.highR === 0 ? 0 : (this.highR -= 1)

    },
    getAdd(status) {
      status === 'low' ? (this.lowR += 1) : (this.highR += 1)

    },
    getClear() {
      this.dataArray = Array.from({ length: 50 }, () => {
        return { num: "", isChecked: true };
      });
      this.comData = []
    },
    getStart() {
      if (Number(this.lowR) > Number(this.highR)) return console.error('容错参数出错')
      this.comData = []
      this.resultData = []
      let result
      this.dataArray.forEach((val) => {
        result = val.num.split(' ')
        if (result.length > 10 && val.isChecked) this.comData.push(result)
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
    this.dataArray = Array.from({ length: 50 }, () => {
      return { num: "", isChecked: true };
    });
  },
  mounted() {

  }
};
</script>


<style scoped lang="scss">
.check {
  margin-left: 7px;
}
.computations {
  background: pink;
}
.computations-div {
  margin-right: 30px;
}
.run-start {
  background: skyblue;
  margin-right: 20px;
}
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
  margin-top: 70px;
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
    height: 76px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    margin-left: 20px;
    > button {
      height: 31px;
    }
  }
  .tarea {
    width: 70px;
  }
}
</style>