<template>
  <div class="home">
    <a-layout>
      <a-layout-sider
        @mouseleave="mouseleave"
        @mouseenter="mouseenter"
        v-model="collapsed"
        width="180"
        collapsedWidth="50"
      >
        <!--logo图-->
        <div class="logo">
          <img
            v-if="collapsed"
            src="../assets/img/logo_1.png"
            alt="logo"
            class="logo-img"
          >
          <img
            v-if="!collapsed"
            src="../assets/img/logo_2.png"
            class="logo-img-collapsed"
          >
        </div>
        <!--导航栏-->
        <a-menu
          mode="inline"
          :defaultSelectedKeys="defaultSelectedKeys"
          theme="dark"
          :openKeys="openKeys"
          :triggerSubMenuAction="'click'"
          :inlineCollapsed="inlineCollapsed"
          ref="menu"
        >
          <template v-for="item in menuList">
            <a-menu-item
              v-if="!item.children"
              :key="item.key"
              @click="linkTo(item.menuUrl)"
            >
              <i
                class="iconfont icon-ziyuanguanli"
                v-if="item.key === 100000"
              ></i>
              <span v-if="!collapsed">{{item.title}}</span>
            </a-menu-item>
            <a-sub-menu
              :key="item.key"
              v-else
              @titleClick="openChange"
              :open="true"
            >
              <span slot="title">
                <i
                  class="iconfont icon-yunyingguanli"
                  v-if="item.key === 110000"
                ></i>
                <i
                  class="iconfont icon-expire"
                  v-if="item.key === 120000"
                ></i>
                <i
                  class="iconfont icon-sheft"
                  v-if="item.key === 130000"
                ></i>
                <i
                  class="iconfont icon-system"
                  v-if="item.key === 140000"
                ></i>
                <span v-if="!collapsed">{{ item.title }}</span>
              </span>
              <template v-for="item in item.children">
                <a-menu-item
                  v-if="!item.children"
                  :key="item.key"
                  @click="linkTo(item.menuUrl)"
                >
                  <span>{{ item.title }}</span>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
        </a-menu>
      </a-layout-sider>
      <!--右上角下拉框-->
      <a-layout>
        <a-layout-header class="layout-header">
          <h-breadcrumb class="breadcrumb"></h-breadcrumb>
          <a-dropdown class="dropdown">
            <!--用户名-->
            <span class="ant-dropdown-link"> {{userName}}
              <a-icon
                type="user"
                style="font-size: 20px"
              /> </span>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="showPswModal=true">密码修改</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="logOut">注销</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-layout-header>
        <a-layout-content class="content">
          <div class="router">
            <router-view />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--到期提醒-->
    <!-- <expire-remind-modal
      :show-modal="showModal"
      :expireData="expireData"
      @close="closeRemind"
    ></expire-remind-modal> -->
    <!--修改密码-->
    <!-- <modify-password-modal
      :show-modal="showPswModal"
      @ok="changePsw"
      @cancel="closePswModal"
    ></modify-password-modal> -->
  </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import httpClient from "../http";
    import { Result } from "../model/result";
    import modalService from "../components/hModal/modal-service";
    import * as _ from 'lodash';
    import localUtil from '../util/local-util';
    @Component
    export default class Home extends Vue {
    // 到期提醒框显示
    public showModal = false;
    // 修改密码框显示
    public showPswModal = false;
    // 到期提醒数据
    public expireData = [];
    // 导航栏默认选择key
    public defaultSelectedKeys: Array<any> = [];
    // 用户名
    public userName = String;
    // 导航栏展开与否
    public collapsed = true;
    // 导航栏inline显示
    public inlineCollapsed = true;
    // menu选择的key
    public openKeys: Array<any> = [];
    // menu选择的key的copy值
    public openKeysCopy: Array<any> = [];
    // 导航栏默认值
    public menuList: Array<any> = [];

    public created() {
        this.getPageData();
        // 刷新页面回显导航栏位置
        this.selectUrl(this.$router.currentRoute.path);
        // 查询到期提醒
        this.queryExpire();
    }

    public linkTo(str) {
        this.$router.push({ path: str });
    }

    public getPageData() {
        // 获取用户名
        this.userName = localUtil.getUserConfig().userName;
        // 获取menu菜单
        if (!_.isEmpty(localUtil.getMenuConfig())) {
        // 数据处理
        const menusList = localUtil.getMenuConfig().map(item => {
            if (item.operationBeans && item.operationBeans.length !== 0) {
            item.operationBeans.map(inx => {
                inx.key = inx.operationId;
                inx.title = inx.operationName;
            });
            item.children = item.operationBeans;
            }
            item.title = item.operationName;
            item.key = item.operationId;
            return item;
        });
        this.menuList = menusList;
        }
    }

    public queryExpire() {
        const roleList = localUtil.getOperationsConfig();
        if (roleList.includes(120000)) {
        httpClient
            .get(`/resourcelib/reminder/reminderAfterLogin/${new Date().getTime()}`)
            .then((result: Result<any>) => {
            if (result.code === "0") {
                this.showModal = true;
                // 传入到期提醒框的总数据
                this.expireData = result.data;
            } else {
                modalService.error({ content: result.msg });
            }
            });
        }
    }

    public selectUrl(url) {
        this.menuList.map(item => {
        if (item.menuUrl === url) {
            this.defaultSelectedKeys = [item.key];
        } else {
            if (item.children) {
            item.children.map(_item => {
                if (_item.menuUrl === url) {
                // 设置初始选择key值
                this.openKeysCopy = [item.key];
                this.defaultSelectedKeys = [_item.key];
                }
            });
            }
        }
        });
    }

    /**
     * 展开menu，只能展开menu的一个父节点
     */
    openChange(e) {
        if (this.openKeys[0] === e.key) {
        this.openKeys = [];
        } else {
        this.openKeys = [e.key];
        }
    }
    /**
     * 鼠标移入menu事件，赋值openkey
     */
    mouseenter() {
        this.openKeys = this.openKeysCopy;
        this.collapsed = false;
    }
    /**
     * 鼠标移出menu事件，记录选择的openkey，然后置空
     */
    mouseleave() {
        this.openKeysCopy = this.openKeys;
        this.openKeys = [];
        this.collapsed = true;
    }
    /**
     * 修改密码
     */
    changePsw(e) {
        const param = e;
        param.account = localUtil.getUserConfig().account;
        httpClient.post('/resourcelib/userManage/modifyUserPsw', param).then((result: Result<any>) => {
        if (result.code === "0") {
            modalService.success({
            content: "修改成功，请注销登录!",
            onOk: () => {
                // 注销操作
                localStorage.clear();
                window.name = "";
                this.$router.push("/login");
            }
            });
        } else {
            modalService.error({ content: result.msg });
        }
        });
    }
    /**
     * 关闭到期提醒框
     */
    closeRemind() {
        this.showModal = false;
    }
    /**
     * 关闭修改密码弹框
     */
    closePswModal() {
        this.showPswModal = false;
    }
    /**
     * 退出登录
     */
    logOut() {
        modalService.confirm({
        content: "是否注销?",
        onOk: () => {
            httpClient.get("/resourcelib/sso/logOut").then((result: Result<any>) => {
            if (result.code === "0") {
                localStorage.clear();
                window.name = "";
                this.$router.push("/login");
            }
            });
        }
        });
    }
}
</script>

<style lang="scss" scoped>
    .home {
        .content {
            padding: 10px;
            height: calc(100vh - 64px);

            .router {
                background-color: white;
                height: 100%;
                overflow: auto;
            }
        }

        .layout-header {
            background: #fff;
            padding: 0;

            .breadcrumb {
                float: left;
                width: 50%;
            }

            .dropdown {
                float: right;
                margin-right: 50px;
                height: 40px;
            }
        }

        .logo {
            text-align: center;
            margin-bottom: 10px;
            margin-top: 10px;

            .logo-img {
                width: 27px;
                height: 27px;
            }

            .logo-img-collapsed {
                width: 120px;
            }
        }

    }
</style>