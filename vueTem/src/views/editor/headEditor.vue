<template>
  <div class="topbar topicfixed">
    <div class="toppic">
      <div class="topside">
        <a
          href="##"
          class="logoLink"
        >im.qq.com</a>
        <ul
          id="topNav"
          class="topNav"
        >
          <li
            v-for='item in routerData'
            :key='item.path'
            active-class='current'
          >
            <router-link :to="item.path">
              {{item.name}}
            </router-link>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerData: [
        {
          name: '首页',
          path: '/index',
        },
        {
          name: '汉字笔顺生成器',
          path: '/hanzi',
        },
      ],
    }
  },
  created() {},
  methods: {},
}
</script>

<style scoped lang = scss>
div {
  margin: 0;
  padding: 0;
  font-family: Helvetica, Tahoma, Arial, 'Hiragino Sans GB',
    'Hiragino Sans GB W3', 'Microsoft YaHei', STXihei, STHeiti, Heiti, SimSun,
    sans-serif;
  font-size: 100%;
}

a:link,
a:visited {
  color: #333;
  text-decoration: none;
}
.topbar {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 150px;
  z-index: 2;
}

.toppic {
  max-width: 1170px;
  min-width: 980px;
  width: 80%;
  height: 75px;
  margin: 0 auto;

  a {
    &:link,
    &:visited {
      /*color: #fff;*/
      color: #333;
    }
  }
}

.topicfixed {
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;

  a {
    &:link,
    &:visited {
      color: #333;
    }
  }
}

.international .topicfixed .toppic a {
  &:link,
  &:visited {
    color: #333;
  }
}

.topside {
  float: left;
  width: 59%;
}

.logoLink {
  float: left;
  display: block;
  width: 31px;
  height: 0px;
  overflow: hidden;
  padding-top: 76px;
  font-size: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  background-image: url('/static/img/youyou.png');
  background-position: 0 50%;
  background-size: 31px 46px;
}
.topNav {
  float: left;
  width: 450px;
  li {
    float: left;
    margin-left: 20px;

    a {
      float: left;
      padding: 0 20px;
      line-height: 75px;
      font-size: 1.125em;

      &:hover {
        color: #3f92ff;
      }
    }

    &.current a {
      color: #3f92ff;
      font-weight: 600;
    }
  }
}

.topicfixed {
  height: 75px;
}
</style>
