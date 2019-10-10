
<template>
  <el-container class="one-skin">
    <!--头部-->
    <el-header class="system-header" height="100px">
      <div class="header-top">
        <div class="official-phone">
          <span>官方咨询电话</span>
          <span class="phone">8888-8888888</span>
        </div>
        <div class="date-time">
          <span>{{ date | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
        </div>
      </div>
      <div class="header-bottom">
        <img src="../assets/images/red-logo.png"/>
        <span class="system-name">笑哈哈哈哈哈哈哈哈平台</span>
        <!--导航-->
        <div class="header-menu">
          <span v-for="(item,index) in systemList" :class="{isActive:index === isActive}" :key="index" @click="tabNav(index, item.systemId)">{{ item.name }}</span>
        </div>
        <!--用户信息-->
        <el-dropdown :hide-on-click="false" class="userInfo">
          <img src="../assets/images/red-logo.png"/>
          <span class="username">admin</span>
          <i class="el-icon-arrow-right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!--导航和内容-->
    <el-container>
      <el-row style="width: 100%;">
        <el-col :span="4">
          <!--导航-->
          <el-aside width="100%" class="system-aside">
            <!--菜单开始-->
            <el-menu default-active="1-1">
              <el-submenu v-for="(item,index) in menuList" :key="index" :index="(index+1).toString()">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{ item.menuName }}</span>
                </template>
                <el-menu-item-group v-for="(group,key) in item.children" :key="key">
                  <el-menu-item :index="`${index+1}-${key+1}`">{{ group.menuName }}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
        </el-col>
        <el-col :span="20">
          <!--内容-->
          <el-main class="system-main">
            <transition>
              <router-view></router-view>
            </transition>
          </el-main>
        </el-col>
      </el-row>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 实现头部导航选中变色
      isActive: 0,
      // 头部菜单数据
      systemList: [
        {
          systemId: '1',
          name: '智慧卡支付'
        }, {
          systemId: '2',
          name: '权限管理'
        }, {
          systemId: '3',
          name: '芝麻开门'
        }, {
          systemId: '4',
          name: '消息中心'
        }
      ],
      // 左侧菜单数据
      menuData: [
        {
          systemId: '1',
          menuName: '业务设置',
          icon: 'el-icon-s-tools',
          children: [
            {
              menuName: '发卡管理',
              url: '/aaa'
            }
          ]
        },
        {
          systemId: '1',
          menuName: '业务管理',
          icon: 'el-icon-s-data',
          children: [
            {
              menuName: '充值',
              url: '/b'
            }, {
              menuName: '转账',
              url: '/c'
            }
          ]
        },
        {
          systemId: '2',
          menuName: '用户授权',
          icon: 'el-icon-user-solid',
          children: [
            {
              menuName: '菜单授权',
              url: '/d'
            }, {
              menuName: '系统授权',
              url: '/e'
            }
          ]
        },
        {
          systemId: '2',
          menuName: '用户角色',
          icon: 'el-icon-trophy',
          children: [
            {
              menuName: '管理员',
              url: '/f'
            }, {
              menuName: '普通用户',
              url: '/g'
            }
          ]
        },
        {
          systemId: '3',
          menuName: '开门管理',
          icon: 'el-icon-unlock',
          children: [
            {
              menuName: '打开',
              url: '/h'
            }, {
              menuName: '关闭',
              url: '/i'
            }
          ]
        },
        {
          systemId: '4',
          menuName: '我的消息',
          icon: 'el-icon-chat-dot-square',
          children: [
            {
              menuName: '已读消息',
              url: '/k'
            }
          ]
        }
      ],
      // 左侧菜单数据
      menuList: [],
      // 顶部时钟
      date: new Date()
    };
  },
  mounted() {
    // 实现登录后直接过滤菜单，并选中第一个菜单
    let id = this.systemList.length > 0 ? this.systemList[0].systemId : '';
    this.tabNav(0, id);
    // 时间变动，声明一个变量指向Vue实例this，保证作用域一致
    let _this = this;
    this.timer = setInterval(() => {
      // 修改数据date
      _this.date = new Date();
    }, 1000);
  },
  methods: {
    tabNav(index, id) {
      // 切换头部导航()
      this.isActive = index; // 实现样式改变
      if (id) {
        this.menuList = this.menuData.filter(item => item.systemId === id); // 后期去过想要请求接口，直接换成axios请求接口
        // 打开第一个菜单路由
        if(this.menuList.length > 0 && this.menuList[0].children.length > 0) {
          // 路由跳转
          this.$router.push(this.menuList[0].children[0].url);
        }
      }
    }
  },
};
</script>

<style>
</style>
