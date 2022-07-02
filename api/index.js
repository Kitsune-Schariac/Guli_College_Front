import request from "@/utils/request";
export default {
  getCourseTeacher(){
    return request({
      url: `/eduservice/indexfront/courseAndTeacher`,
      method: 'get'
    })
  }
}
