<template>
    <div class="box">
        <!-- <div class="boxm" @click="getCopy">copy</div>
        <textarea ref="textarea" name="" id="" cols="30" rows="10">sucsesss</textarea> -->

       <div :style='val.bg' class="box-main" v-for="val,index in forData" :key="index">
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
                <div v-for="val,indexs in val.createNum" :key="indexs">
                    <div class="r-main">
                        <textarea>

                        </textarea>
                        <div class="r-main-right">
                            <div>
                                <span class="r-num">num</span>
                                <span>{{indexs}}</span>
                                <input type="checkbox">
                                <span>复制</span>
                            </div>
                              <div class="result-div">
                                <span>1</span>
                                <span>1</span>
                                <span>1</span>  
                             </div>
                           
                        </div>
                    </div>
                  
            </div>
            </div>
       </div>
    </div>
</template>

<style scoped>
.boxbottom {
  margin-top: 50px;
}
.result-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 8px;
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
</style>
<script>
import { makeDadi } from "./index.js";
export default {
  data() {
    return {
      arrNum: [],
      num: 50,
      forData: [
        {
          num: 50,
          bottomNum: 610,
          geshu: 3,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(222, 55, 111, 0.7)" },
          createNum: 0
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(111, 255, 11, 0.7)" },
          createNum: 0
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(255, 255, 11, 0.7)" },
          createNum: 0
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(15, 99, 11, 0.7)" },
          createNum: 0
        },
        {
          num: 50,
          geshu: 3,
          bottomNum: 610,
          rongC: { left: 1, right: 2 },
          bg: { backgroundColor: "rgba(15, 199, 77, 0.7)" },
          createNum: 0
        }
      ]
    };
  },
  methods: {
    getCopy() {
      this.$refs.textarea.select();
      console.log(this.$refs.textarea);
      document.execCommand("Copy"); // 执行浏览器复制命令
    },
    getComputed(val) {
      console.dir(val);
      let reArr = [];
      let re;
      for (let i = 0; i < val.geshu; i++) {
        reArr.push(new Set(makeDadi(610)));
      }
      re = new Set(
        [...reArr[0]].filter(val => {
          return reArr[1].has(val) && reArr[2].has(val);
        })
      );
      console.log("jahahah");
      console.log(re.size);
      console.log([...re]);
    },
    getCreate(index) {
      this.getComputed(this.forData[index]);
      //   this.$set(
      //     this.forData[index],
      //     "createNum",
      //     parseInt(this.forData[index].num)
      //   );
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
  created() {},
  components: {}
};
</script>
