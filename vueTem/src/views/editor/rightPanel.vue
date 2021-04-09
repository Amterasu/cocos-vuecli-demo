<template>
  <div id="PropertyView" style="right: 0; top: 0">
    <h1 id="PropertyViewHeader" class="f--hlc" style="cursor: default">
      <div class="property-header f--hlc">
        <div>画布</div>
      </div>
    </h1>
    <div
      class=""
      id="PropertyViewBody"
      style="max-height: calc(100% - 30px); overflow-y: scroll"
      v-show="!foldMenuStatus"
    >
      <div class="property-fields">
        <form class="ant-form ant-form-horizontal form_display">
          <am-input
            @change="changeX4Game"
            v-model="x"
            label="X轴位移"
            icon="px"
            :full="false"
            min="-9999"
          />
          <am-input
            @change="changeY4Game"
            v-model="y"
            label="Y轴位移"
            icon="px"
            :full="false"
            min="-9999"
          />
          <am-input
            @change="changeAngle4Game"
            v-model="angle"
            icon="degree"
            :full="false"
            min="-360"
          >
            <template slot="label">
              <div class="rotation" title="旋转"></div>
            </template>
          </am-input>
          <am-input
            @change="changeScale4Game"
            v-model="scale"
            label="缩放"
            icon="rate"
            :full="false"
            :step="0.1"
          />
        </form>
        <form class="ant-form ant-form-horizontal form_display2">
          <am-input
            @change="changeOpacity4Game"
            v-model="opacity"
            label="不透明度"
            showSlider
            min="0"
            max="100"
            icon="rate"
          />
        </form>
        <form
          class="ant-form ant-form-horizontal form_display2"
          style="padding-bottom: 20px"
        >
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="3"
            :file-list="fileList"
            :on-change="uploadChange"
            accept=".jpg,.jpeg,.png,.JPG,.JPEG"
            v-show="showImgUploadBtn"
          >
            <button
              type="button"
              class="ant-btn ant-btn-primary"
              style="margin-bottom: 10px"
            >
              <span>上传图片</span>
              <span> </span>
            </button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </form>
      </div>
    </div>
    <am-alert :show.sync="showAlert" v-model="alertText" type="error" />
  </div>
</template>

<script>
import amInput from '../../components/BaseToolInput'
import amColorPicker from '../../components/BaseColorPicker'
import amSwitchInput from '../../components/BaseSwitchInput'
import amToolTextarea from '../../components/BaseToolTextarea'
import amAlert from '../../components/BaseAlert'
import amConfirm from '../../components/BaseConfirm'
import { GAME2WEB_EVENTTYPE, E2G_EVENTTYPE } from '../../const/event'
// import { copyFile, saveConfig } from "../../utils/tools/node-utils";
import web2game from './web2game'

export default {
  data() {
    return {
      foldMenuStatus: false,
      x: 0,
      y: 0,
      angle: 0,
      scale: 1,
      opacity: 255,
      fileList: [],
      savePath: '',
      textCur: 'left',
      desCur: 'normal',
      styleCur: 'normal',
      weightCur: 'normal',
      colorSwitch: true,
      bgSwitch: true,
      showAlert: false,
      alertText: '',
      activeNode: null,
    }
  },
  created() {
    // this.savePath = path.join(
    //   path.resolve("."),
    //   "cocos-build/web-mobile/custom"
    // );
    // eventBus.on('GAMENODE_MOVED', (target) => {
    //   this.activeNode = target
    //   this.changePosition4Editor()
    // })
    // eventBus.on('GAMENODE_MOVEEND', (target) => {
    //   this.activeNode = target
    //   this.changePosition4Editor()
    //   this.changeNodeAttributeAndSave({
    //     x: this.x,
    //     y: this.y,
    //   })
    // })

    eventBus.on('WEB_MSG_TYPE.SELECT_NODE', (nodeInfo) => {
      this.activeNode = nodeInfo
      this.x = this.activeNode.x
      this.y = this.activeNode.y
      this.angle = this.activeNode.angle
      this.opacity = this.activeNode.opacity
      this.scale = this.activeNode.scale

      console.log(nodeInfo)
      this.$notify({
        title: '打开控制台看console',
        position: 'top-left',
        message:
          '可以直接获取节点信息，并且可以直接在web内进行修改（可以直接在右边的属性栏内修改节点属性），如果还能实现保存，就能实现编辑了。',
      })
    })
  },
  methods: {
    changePosition4Editor() {
      this.x = this.activeNode.x ? parseInt(this.activeNode.x) : 0
      this.y = this.activeNode.y ? parseInt(this.activeNode.y) : 0
    },
    changeColor(switchStatus, color) {
      console.log(switchStatus, color)
    },
    changeX4Game(newVal) {
      this.changeNodeAttribute4Game('x', this.x)
    },
    changeY4Game(newVal) {
      this.changeNodeAttribute4Game('y', this.y)
    },
    changeScale4Game(newVal) {
      this.changeNodeAttribute4Game('scale', this.scale)
    },
    changeAngle4Game(newVal) {
      console.log(this.angle)
      this.changeNodeAttribute4Game('angle', this.angle)
    },
    changeOpacity4Game(newVal) {
      this.changeNodeAttribute4Game('opacity', Math.ceil(this.opacity * 2.55))
    },
    changeNodeAttribute4Game(attribute, value) {
      if (typeof attribute == 'object') {
        for (let key in attribute) {
          web2game.setNodeAttribute({
            node: this.activeNode,
            key,
            value: attribute[key],
          })
        }
      } else {
        web2game.setNodeAttribute({
          node: this.activeNode,
          attribute,
          value,
        })
      }
    },
    changeNodeAttributeAndSave(attribute, value) {
      this.changeNodeAttribute4Game(attribute, value)
      // const gamesConfig = window.cocosGames;
      // const gameData = gamesConfig[1];
      // console.log(gamesConfig);
      // if (!gamesConfig[1].editorConfig) {
      //   gamesConfig[1].editorConfig = {};
      // }
      // if (gamesConfig[1].editorConfig[this.activeNode.increaseId]) {
      //   if (typeof attribute == "object") {
      //     for (let key in attribute) {
      //       gamesConfig[1].editorConfig[this.activeNode.increaseId][key] =
      //         attribute[key];
      //     }
      //   } else {
      //     gamesConfig[1].editorConfig[this.activeNode.increaseId][
      //       attribute
      //     ] = value;
      //   }
      // } else {
      //   gamesConfig[1].editorConfig[this.activeNode.increaseId] = {};
      //   for (let key in attribute) {
      //     gamesConfig[1].editorConfig[this.activeNode.increaseId][key] =
      //       attribute[key];
      //   }
      // }
      // console.log(4444);
      // saveConfig("window.cocosGames = " + JSON.stringify(gamesConfig));
    },

    isImage(fileName) {
      if (typeof fileName !== 'string') return
      let name = fileName.toLowerCase()
      return (
        name.endsWith('.png') ||
        name.endsWith('.jpeg') ||
        name.endsWith('.jpg') ||
        name.endsWith('.png') ||
        name.endsWith('.bmp')
      )
    },
    // 方法判断
    uploadChange(file, fileList) {
      if (!this.activeNode) return
      // 拿到当前上传图片的name，判断其后缀名是否符合
      let type = this.isImage(file.name)
      console.log(type)
      this.fileList = fileList
      let fileLength = this.fileList.length
      if (!type) {
        // 若不符合图片类型，则让当前上传的文件去除掉即可，即从上传对列删除本次上传
        this.fileList.splice(fileLength - 1, 1)
        this.$message.error('只允许上传图片')
        return
      }
      this.onUploadSuccess(file, fileList)
    },
    onUploadSuccess(file, fileList) {
      console.log(file, fileList)
      var reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = () => {
        console.log(reader.result) //获取到base64格式图片
        const img = new Image()
        img.src = reader.result
        let tex = new cc.Texture2D()
        tex.initWithElement(img)
        tex.handleLoadedTexture()
        this.activeNode.getComponent(
          cc.Sprite
        ).spriteFrame = new cc.SpriteFrame(tex)
        // const sp = new SpriteFrame()
        // sp.texture = tex
        // self.sp.spriteFrame = sp
      }
      // cc.loader.load(img, (err, texture) => {
      //   if (err) return
      //   this.activeNode.getComponent(
      //     cc.Sprite
      //   ).spriteFrame = new cc.SpriteFrame(texture)
      // })
      // const filePath = file.raw.path;
      // const imageType = file.raw.type;
      // const name = Date.now();
      // const type = imageType.split("/")[1];
      // copyFile(filePath, this.savePath, name + "." + type, () => {
      //   cc.log("进入回调");
      //   cc.log(this.savePath + "/" + name + "." + type);
      //   if (this.activeNode) {
      //     web2game.LOAD_CUSTOMIMG(name + "." + type, (err, texture) => {
      //       cc.log("加载成功");
      //       var spriteFrame = new cc.SpriteFrame(texture);
      //       this.activeNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      //       const gamesConfig = window.cocosGames;
      //       const gameData = gamesConfig[1];
      //       console.log(name + "." + type);
      //       if (!gamesConfig[1].editorConfig) {
      //         gamesConfig[1].editorConfig = {};
      //       }
      //       if (gamesConfig[1].editorConfig[this.activeNode.increaseId]) {
      //         gamesConfig[1].editorConfig[this.activeNode.increaseId].sprite =
      //           name + "." + type;
      //       } else {
      //         gamesConfig[1].editorConfig[this.activeNode.increaseId] = {};
      //         gamesConfig[1].editorConfig[this.activeNode.increaseId].sprite =
      //           name + "." + type;
      //       }
      //       saveConfig("window.cocosGames = " + JSON.stringify(gamesConfig));
      //     });
      //   }
      // });
      // fs.copyFile(filePath, this.savePath, (err)=>{
      //   console.log(123)
      // });
    },
  },
  computed: {
    showImgUploadBtn() {
      return this.activeNode && this.activeNode.getComponent(cc.Sprite)
    },
  },
  components: {
    amInput,
    amColorPicker,
    amSwitchInput,
    amToolTextarea,
    amAlert,
    amConfirm,
  },
}
</script>

<style  lang="scss" scoped>
</style>
