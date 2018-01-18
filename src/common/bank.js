const banks = [{ "code": "1", "name": "中国工商银行" },
{ "code": "2", "name": "中国银行" },
{ "code": "3", "name": "中国建设银行" },
{ "code": "4", "name": "中国农业银行" },
{ "code": "5", "name": "招商银行" },
{ "code": "6", "name": "中国邮政储蓄银行" },
{ "code": "7", "name": "中国光大银行" },
{ "code": "8", "name": "上海浦东发展银行" },
{ "code": "10", "name": "兴业银行" },
{ "code": "11", "name": "平安银行" },
{ "code": "12", "name": "广东发展银行" },
{ "code": "13", "name": "中信银行" },
{ "code": "14", "name": "交通银行" },
{ "code": "15", "name": "中国民生银行" },
{ "code": "42", "name": "杭州银行" },
{ "code": "44", "name": "苏州银行" },
{ "code": "45", "name": "农村商业银行" },
{ "code": "46", "name": "华夏银行" },
{ "code": "47", "name": "南京银行" },
{ "code": "48", "name": "东莞银行" },
{ "code": "49", "name": "北京银行" },
{ "code": "61", "name": "贵阳银行" },
{ "code": "62", "name": "宁波银行" },
{ "code": "101", "name": "汉口银行" },
{ "code": "102", "name": "杭州联合农村商业银行" },
{ "code": "121", "name": "宁夏银行股份有限公司" },
{ "code": "122", "name": "廊坊银行" },
{ "code": "125", "name": "台州银行股份有限公司" },
{ "code": "141", "name": "上海银行" },
{ "code": "142", "name": "徽商银行" },
{ "code": "161", "name": "葫芦岛银行" },
{ "code": "162", "name": "农村合作信用社" },
{ "code": "163", "name": "长沙银行" },
{ "code": "181", "name": "浙江泰隆商业银行" },
{ "code": "182", "name": "锦州银行" },
{ "code": "183", "name": "广东华兴银行" },
{ "code": "201", "name": "乐山市商业银行" },
{ "code": "221", "name": "渤海银行" },
{ "code": "241", "name": "江苏银行" },
{ "code": "261", "name": "成都银行" },
{ "code": "262", "name": "洛阳银行" },
{ "code": "281", "name": "青岛银行" },
{ "code": "301", "name": "富滇银行" },
{ "code": "321", "name": "包商银行" },
{ "code": "381", "name": "天津银行" },
{ "code": "382", "name": "桂林银行" },
{ "code": "383", "name": "晋中银行" },
{ "code": "401", "name": "邯郸银行" },
{ "code": "402", "name": "香港上海汇丰银行" },
{ "code": "403", "name": "齐鲁银行" },
{ "code": "422", "name": "中原银行" },
{ "code": "441", "name": "郑州银行" },
{ "code": "442", "name": "盛京银行" },
{ "code": "461", "name": "甘肃银行" },
{ "code": "481", "name": "香港星展銀行" },
{ "code": "501", "name": "日照银行" },
{ "code": "502", "name": "承德银行" },
{ "code": "503", "name": "河北银行" },
{ "code": "504", "name": "广东南粤银行" },
{ "code": "505", "name": "内蒙古银行" },
{ "code": "506", "name": "广州银行" },
{ "code": "507", "name": "营口银行" },
{ "code": "521", "name": "邢台银行" },
{ "code": "522", "name": "乌海银行" },
{ "code": "523", "name": "晋商银行" },
{ "code": "524", "name": "东亚银行" },
{ "code": "526", "name": "哈尔滨银行股份有限公司" },
{ "code": "527", "name": "潍坊银行" },
{ "code": "531", "name": "龙江银行" },
{ "code": "533", "name": "长安银行" },
{ "code": "534", "name": "晋城银行" },
{ "code": "536", "name": "保定银行" },
{ "code": "561", "name": "恒丰银行" },
{ "code": "581", "name": "朝阳银行" },
{ "code": "601", "name": "西安银行" },
{ "code": "621", "name": "金华银行" },
{ "code": "641", "name": "齐商银行" },
{ "code": "10000003", "name": "渣打银行" },
{ "code": "10000007", "name": "兰州银行" },
{ "code": "10000008", "name": "广西北部湾银行股份有限公司" },
{ "code": "10000016", "name": "江西银行" },
{ "code": "10000021", "name": "浙商银行" },
{ "code": "10000026", "name": "武汉农村商业银行" },
{ "code": "10000032", "name": "江苏长江商业银行" },
{ "code": "10000033", "name": "沧州银行" },
{ "code": "10000039", "name": "南充市商业银行" },
{ "code": "10000040", "name": "洋县农村信用合作联社" },
{ "code": "10000042", "name": "泉州银行" },
{ "code": "10000063", "name": "长沙银行股份有限公司" },
{ "code": "10000087", "name": "成都农商银行" },
{ "code": "10000089", "name": "鞍山银行" },
{ "code": "10000090", "name": "奥地利中央合作银行" },
{ "code": "10000091", "name": "澳门清算行" },
{ "code": "10000092", "name": "澳新银行" },
{ "code": "10000097", "name": "比利时联合银行" },
{ "code": "10000099", "name": "城市商业银行" },
{ "code": "10000100", "name": "城市信用社" },
{ "code": "10000101", "name": "村镇银行" },
{ "code": "10000102", "name": "达州市商业银行" },
{ "code": "10000103", "name": "大华银行" },
{ "code": "10000104", "name": "大连银行" },
{ "code": "10000105", "name": "大同银行" },
{ "code": "10000106", "name": "大新银行" },
{ "code": "10000108", "name": "丹东银行" },
{ "code": "10000111", "name": "德国商业银行" },
{ "code": "10000114", "name": "德意志银行" },
{ "code": "10000117", "name": "东京三菱银行" },
{ "code": "10000119", "name": "东营银行" },
{ "code": "10000121", "name": "鄂尔多斯银行" },
{ "code": "10000124", "name": "法国外贸银行" },
{ "code": "10000125", "name": "法国兴业银行" },
{ "code": "10000126", "name": "丰业银行" },
{ "code": "10000127", "name": "福建海峡银行" },
{ "code": "10000128", "name": "抚顺银行" },
{ "code": "10000129", "name": "阜新银行" },
{ "code": "10000130", "name": "富邦华一银行" },
{ "code": "10000131", "name": "赣州银行" },
{ "code": "10000136", "name": "贵州银行" },
{ "code": "10000137", "name": "国家开发银行" },
{ "code": "10000139", "name": "国泰君安证券股份有限公司" },
{ "code": "10000141", "name": "哈密市商业银行" },
{ "code": "10000143", "name": "韩国产业银行" },
{ "code": "10000144", "name": "韩国企业银行" },
{ "code": "10000146", "name": "韩亚银行" },
{ "code": "10000147", "name": "荷兰合作银行" },
{ "code": "10000148", "name": "荷兰商业银行" },
{ "code": "10000149", "name": "恒生银行" },
{ "code": "10000150", "name": "衡水银行" },
{ "code": "10000151", "name": "湖北银行" },
{ "code": "10000153", "name": "花旗银行" },
{ "code": "10000155", "name": "华侨银行" },
{ "code": "10000156", "name": "华融湘江银行" },
{ "code": "10000157", "name": "华商银行" },
{ "code": "10000158", "name": "吉林银行" },
{ "code": "10000159", "name": "集友银行" },
{ "code": "10000160", "name": "济宁银行" },
{ "code": "10000161", "name": "嘉兴银行" },
{ "code": "10000162", "name": "建东银行" },
{ "code": "10000167", "name": "焦作中旅银行" },
{ "code": "10000168", "name": "九江银行" },
{ "code": "10000170", "name": "昆仑银行" },
{ "code": "10000172", "name": "莱商银行" },
{ "code": "10000173", "name": "凉山州商业银行" },
{ "code": "10000174", "name": "辽阳银行" },
{ "code": "10000175", "name": "廖创兴银行" },
{ "code": "10000176", "name": "临商银行" },
{ "code": "10000178", "name": "泸州市商业银行" },
{ "code": "10000181", "name": "马来亚银行" },
{ "code": "10000182", "name": "美国银行" },
{ "code": "10000183", "name": "蒙特利尔银行" },
{ "code": "10000184", "name": "绵阳市商业银行" },
{ "code": "10000185", "name": "摩根大通银行" },
{ "code": "10000188", "name": "南洋商业银行" },
{ "code": "10000189", "name": "宁波东海银行" },
{ "code": "10000190", "name": "宁波通商银行" },
{ "code": "10000191", "name": "宁夏黄河农村商业银行" },
{ "code": "10000192", "name": "农村合作银行" },
{ "code": "10000194", "name": "攀枝花市商业银行" },
{ "code": "10000196", "name": "平顶山银行" },
{ "code": "10000200", "name": "青海银行" },
{ "code": "10000202", "name": "曲靖市商业银行" },
{ "code": "10000207", "name": "瑞士信贷第一波士顿银行" },
{ "code": "10000209", "name": "瑞穗银行" },
{ "code": "10000210", "name": "三井住友银行" },
{ "code": "10000212", "name": "厦门国际银行" },
{ "code": "10000213", "name": "厦门银行" },
{ "code": "10000214", "name": "山口银行" },
{ "code": "10000216", "name": "上海—巴黎国际银行" },
{ "code": "10000218", "name": "上海商业银行" },
{ "code": "10000219", "name": "上饶银行" },
{ "code": "10000220", "name": "绍兴银行" },
{ "code": "10000222", "name": "石嘴山银行" },
{ "code": "10000223", "name": "首都银行" },
{ "code": "10000227", "name": "泰安银行" },
{ "code": "10000228", "name": "泰华农民银行" },
{ "code": "10000229", "name": "唐山银行" },
{ "code": "10000230", "name": "天津滨海农村商业银行" },
{ "code": "10000233", "name": "铁岭银行" },
{ "code": "10000234", "name": "威海市商业银行" },
{ "code": "10000235", "name": "温州银行" },
{ "code": "10000237", "name": "乌鲁木齐银行" },
{ "code": "10000239", "name": "西藏银行" },
{ "code": "10000243", "name": "新韩银行" },
{ "code": "10000245", "name": "新疆汇和银行" },
{ "code": "10000248", "name": "雅安市商业银行" },
{ "code": "10000250", "name": "烟台银行" },
{ "code": "10000251", "name": "阳泉市商业银行" },
{ "code": "10000252", "name": "宜宾市商业银行" },
{ "code": "10000254", "name": "意大利联合圣保罗银行" },
{ "code": "10000260", "name": "友利银行" },
{ "code": "10000261", "name": "玉溪市商业银行" },
{ "code": "10000262", "name": "枣庄银行" },
{ "code": "10000263", "name": "湛江市商业银行" },
{ "code": "10000265", "name": "张家口银行" },
{ "code": "10000268", "name": "浙江稠州商业银行" },
{ "code": "10000270", "name": "浙江民泰商业银行" },
{ "code": "10000273", "name": "支付业务收费专户" },
{ "code": "10000275", "name": "中国进出口银行" },
{ "code": "10000276", "name": "中国农业发展银行" },
{ "code": "10000277", "name": "中国银行间外汇交易中心" },
{ "code": "10000278", "name": "中国银联" },
{ "code": "10000280", "name": "中央国债登记结算有限责任公司" },
{ "code": "10000282", "name": "重庆农村商业银行" },
{ "code": "10000285", "name": "重庆银行" },
{ "code": "10000289", "name": "自贡市商业银行" },
{ "code": "10000292", "name": "深圳农村商业银行" },
{ "code": "10000293", "name": "秦皇岛银行" },
{ "code": "10000302", "name": "福建农村信用社农商银行" },
{ "code": "10000307", "name": "营口沿海银行" },
{ "code": "10000309", "name": "内蒙古自治区农村信用社联合社" },
{ "code": "10000310", "name": "辽宁省农村信用社联合社" },
{ "code": "10000311", "name": "黑龙江省农村信用社" },
{ "code": "10000313", "name": "江西省农村信用社联合社" },
{ "code": "10000315", "name": "广东省农村信用社联合社" },
{ "code": "10000316", "name": "云南省农村信用社联合社" },
{ "code": "10000317", "name": "浙江省农村信用社联合社" },
{ "code": "10000318", "name": "陕西省农村信用社联合社" },
{ "code": "10000319", "name": "河北省农村信用社联合社" },
{ "code": "10000320", "name": "山西省农村信用社联合社" },
{ "code": "10000333", "name": "安徽省农村信用社联合社" },
{ "code": "10000335", "name": "广西农村信用社" },
{ "code": "10000336", "name": "海南省农村信用社" },
{ "code": "10000346", "name": "河南省农村信用社" },
{ "code": "10000372", "name": "甘肃农村信用社" },
{ "code": "10000373", "name": "贵州省农村信用社联合社" },
{ "code": "10000374", "name": "湖南省农村信用社联合社" },
{ "code": "10000376", "name": "新疆维吾尔自治区农村信用社联合社" },
{ "code": "10000387", "name": "农村信用合作社" },
{ "code": "10000450", "name": "湖南省农村商业银行" },
{ "code": "10000451", "name": "海南银行" },
{ "code": "10000455", "name": "内蒙古农村商业银行" },
{ "code": "10000457", "name": "德州银行" },
{ "code": "10000458", "name": "裕信银行" },
{ "code": "10000459", "name": "摩根士丹利国际银行" },
{ "code": "10000461", "name": "常州市农村信用社" },
{ "code": "10000463", "name": "东方汇理银行" },
{ "code": "10000464", "name": "常德市农村商业银行" },
{ "code": "10000472", "name": "宝鸡市农村信用社" },
{ "code": "10000473", "name": "湖州银行" },
{ "code": "10000474", "name": "大众银行" },
{ "code": "10000475", "name": "库尔勒银行" },
{ "code": "10000483", "name": "本溪市商业银行" },
{ "code": "10000484", "name": "华美银行" },
{ "code": "10000631", "name": "四川省农村信用社联合社" }];
export {
  banks
}