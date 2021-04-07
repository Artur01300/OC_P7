<template>
    <div id="app" v-cloak>
  
  <input type="file" ref="myFile" @change="selectedFile" accept="image/*"><br/>

  <div v-if="imageLoaded">
    Image size is {{image.size}}<br/>
    Image width and height is {{image.width}} / {{image.height}}
  </div>

</div>
</template>

<script>
export default {

// max size, 1000KB, width and height

Vue.config.productionTip = false;
Vue.config.devtools = false;

// max size, 100KB, width and height
const MAX_SIZE = 100000;
const MAX_WIDTH = 500;
const MAX_HEIGHT = 300;

const app = new Vue({
  el:'#app',
  data: {
    image:{
      size:'',
      height:'',
      width:''
    },
    imageError:''
  },
  methods:{
    selectedFile() {
      this.imageError = '';
      
      let file = this.$refs.myFile.files[0];
      
      if(!file || file.type.indexOf('image/') !== 0) return;
      this.image.size = file.size;
      if(this.image.size > MAX_SIZE) {
        this.imageError = `The image size (${this.image.size}) is too much (max is ${MAX_SIZE}).`;
        return;
      }
      
      let reader = new FileReader();
      
      reader.readAsDataURL(file);
      reader.onload = evt => {
        let img = new Image();
        img.onload = () => {
          this.image.width = img.width;
          this.image.height = img.height;
          console.log(this.image);
          if(this.image.width > MAX_WIDTH) {
            this.imageError = `The image width (${this.image.width}) is too much (max is ${MAX_WIDTH}).`;
            return;
          }
          if(this.image.height > MAX_HEIGHT) {
            this.imageError = `The image height (${this.image.height}) is too much (max is ${MAX_HEIGHT}).`;
            return;
          }
          
          
        }
        img.src = evt.target.result;
      }

      reader.onerror = evt => {
        console.error(evt);
      }
      
    }
  }
})

const app = new Vue({
  el:'#app',
  data: {
    image:{
      size:'',
      height:'',
      width:''
    },
    imageError:''
  },
  methods:{
    selectedFile() {
    const MAX_SIZE = 1000000; 
      this.imageError = '';
      
      let file = this.$refs.myFile.files[0];
      
      if(!file || file.type.indexOf('image/') !== 0) return;
      this.image.size = file.size;
      if(this.image.size > MAX_SIZE) {
        this.imageError = `The image size (${this.image.size}) is too much (max is ${MAX_SIZE}).`;
        return;
      }
      
      let reader = new FileReader();
      
      reader.readAsDataURL(file);
      reader.onload = evt => {
        let img = new Image();
        img.onload = () => {
          this.image.width = img.width;
          this.image.height = img.height;
          console.log(this.image);
          if(this.image.width > MAX_WIDTH) {
            this.imageError = `The image width (${this.image.width}) is too much (max is ${MAX_WIDTH}).`;
            return;
          }
          if(this.image.height > MAX_HEIGHT) {
            this.imageError = `The image height (${this.image.height}) is too much (max is ${MAX_HEIGHT}).`;
            return;
          }
          
          
        }
        img.src = evt.target.result;
      }

      reader.onerror = evt => {
        console.error(evt);
      }
      
    }
  }
})
</script>