const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  thatRole: state => state.user.thatRole,
  setting: state => state.user.setting,
  code: state => state.user.code,
  taskId: state => state.user.taskId,
  scanData: state => state.scan.scanData
}
export default getters
