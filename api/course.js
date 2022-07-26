import request from "../utils/request";

export default {
  //条件分页查询课程
  getCourseList(page, limit, courseFrontvo) {
    return request({
      url: `eduservice/coursefront/getFrontCourseList/${page}/${limit}`,
      method: 'post',
      data: courseFrontvo
    })
  },
  //查询所有分类的方法
  getAllSubject(){
    return request({
      url: '/eduservice/edu-subject/getAllSubject',
      method: 'get'
    })
  }
}
