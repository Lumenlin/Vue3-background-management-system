// 用户管理模块的接口
import request from '@/utils/request'
import type { UserResponseData, User, AllRoleResponseData, SetRoleData } from './type'

// 枚举地址
enum API {
  //获取全部已有用户账号信息
  ALLUSER_URL = '/admin/acl/user/',
  //添加一个新的用户账号
  ADDUSER_URL = '/admin/acl/user/save',
  //更新已有的用户账号
  UPDATEUSER_URL = '/admin/acl/user/update',
  //获取全部职位,当前账号拥有的职位接口
  ALLROLEURL = '/admin/acl/user/toAssign/',
  //给已有的用户分配角色接口
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  //删除某一个账号
  DELETEUSER_URL = '/admin/acl/user/remove/',
  //批量删除的接口
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

// 获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`)

// 添加用户与修改已有用户
export const reqAddOrUpdateUser = (data: User) => {
  // 如果有id就是修改用户信息，没有id就是添加新用户
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}

// 获取全部职位以及当前用户已有的职位
export const reqAllRole = (userId: number) => request.get<any, AllRoleResponseData>(API.ALLROLE_URL + `${userId}`)

// 分配职位
export const reqSetUserRole = (data: SetRoleData) => request.post<any, any>(API.SETROLE_URL, data)

// 删除某个账号信息
export const reqRemoveUser = (userId: number) => request.delete<any, any>(API.DELETEUSER_URL + `${userId}`)

// 批量删除接口
export const reqSelectRemoveUser = (idList: number[]) => request.delete(API.DELETEALLUSER_URL, { data: idList })
