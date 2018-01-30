//省市县orgcode 处理，把最后一个编码号，拆分为三个值得数组
const areaOrgcode = (orgcode) => {
    let province = orgcode.slice(0, 2) + '0000'
    let city = orgcode.slice(0, 4) + '00'
    let county = orgcode
    return [province, city, county]
}


// const AgentManage = () => { return (params) => { return http.get(base.oaIp, "/agent/add", params) } }
export {
    areaOrgcode
};

