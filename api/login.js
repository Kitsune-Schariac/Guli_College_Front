import request from "@/utils/request";
export default {
  //登录
  login(member) {
    return request ({
      url: '/educenter/member/login',
      method: 'post',
      data: member
    })
  },

  //根据token获取用户信息
  getUserInfo(){
    return request({
      url: '/educenter/member/auth/getLoginInfo',
      method: 'get'
    })
  }
}
