const scan = {
  state: {
    scanData: {}
  },
  mutations: {
    SET_SCAN: (state, scan) => { // 扫描参数
      state.scanData = scan
    }
  }
}

export default scan
