<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="changeSubject(-1)">全部</a>
                </li>
                <li v-for="(subject, index) in subjectNestedList">
                  <a :title="subject.title" href="#" @click="changeSubject(index)">{{ subject.title }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="item in subSubjectList">
                  <a :title="item.title" href="#" @click="changeTwoSubject(item.id)">{{ item.title }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="销量" href="javascript:void(0);" @click="searchBuyCount()">销量
                  <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                  <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-if="data.total > 0">
            <ul class="of" id="bna">
              <li v-for="course in data.records" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img width="auto" height="150" :src="course.cover" class="img-responsive" :alt="course.title">
                    <div class="cc-mask">
                      <a :href="'/course/' + course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/' + course.id" :title="course.title" class="course-title fsize18 c-333">{{ course.title }}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green" >
                      <i class="c-fff fsize12 f-fA">{{ course.price > 0 ? course.price + '¥' : '免费' }}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ course.buyCount }}人学习</i>
                      |
                      <i class="c-999 f-fA">9634评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首</a>
            <a
              v-show="data.hasPrevious"
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
              v-show="data.hasNext"
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)">末</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from '@/api/course'
export default {

  data(){
    return {
      page:1,
      data:{},
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      searchObj: {}, // 查询表单对象
      oneIndex:-1,
      twoIndex:-1,
      buyCountSort:"",
      gmtCreateSort:"",
      priceSort:""
    }
  },
  created(){
    //初始化数据
    this.initCourseInfo()
    //显示一级分类
    this.initSubject()
  },
  methods: {
    //查询第一页数据
    initCourseInfo(){
      courseApi.getCourseList(1, 8, this.searchObj)
        .then(response => {
          this.data = response.data.data
        })
    },
    //查询所有的分类
    initSubject(){
      courseApi.getAllSubject()
        .then(response => {
          this.subjectNestedList = response.data.data.list
        })
    },
    //分页切换
    gotoPage(page) {

      courseApi.getCourseList(page, 8, this.searchObj)
        .then(res => {
          this.data = res.data.data
        })
    },
    //切换一级分类
    changeSubject(i){
      // console.log('shabi' + i)
      // console.log(this.subjectNestedList[i].children)

      //清空二级分类的id
      this.searchObj.subjectId = ''

      //如果小于0那便是全部，不显示二级分类
      if(i < 0){
        this.subSubjectList = []
        this.searchObj.subjectParentId = ''
        //查询课程
        this.gotoPage(this.page)
        return 0
      }

      //把一级分类的id放到searchObj
      this.searchObj.subjectParentId = this.subjectNestedList[i].id
      //显示二级分类的值
      this.subSubjectList = this.subjectNestedList[i].children


      //查询课程
      this.gotoPage(this.page)

    },
    //切换二级分类
    changeTwoSubject(id){
      this.searchObj.subjectId = id
      this.gotoPage(this.page)
    },
    //根据销量排序
    searchBuyCount(){
      //用searchObj的值来控制查询条件
      this.searchObj.buyCountSort = 'ok'
      this.searchObj.gmtCreateSort = ''
      this.searchObj.priceSort = ''
      //用页面的值来控制样式的显示
      this.buyCountSort = this.searchObj.buyCountSort
      this.gmtCreateSort = this.searchObj.gmtCreateSort
      this.priceSort = this.searchObj.priceSort

      this.gotoPage(1)
    },
    searchGmtCreate(){
      this.searchObj.gmtCreateSort = 'ok'
      this.searchObj.buyCountSort = ''
      this.searchObj.priceSort = ''

      this.buyCountSort = this.searchObj.buyCountSort
      this.gmtCreateSort = this.searchObj.gmtCreateSort
      this.priceSort = this.searchObj.priceSort

      this.gotoPage(1)
    },
    searchPrice(){
      this.searchObj.priceSort = 'ok'
      this.searchObj.buyCountSort = ''
      this.searchObj.gmtCreateSort = ''

      this.buyCountSort = this.searchObj.buyCountSort
      this.gmtCreateSort = this.searchObj.gmtCreateSort
      this.priceSort = this.searchObj.priceSort

      this.gotoPage(1)
    }

  }

};
</script>
