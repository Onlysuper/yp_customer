
//  输入框公用验证规则

var notNull = (rule, value, callback) => {
    if (!value) {
      return callback(new Error("请填写这里的信息哦!"));
    } else {
      callback();
    }
};
 const Layout = {
    state: {
        notNull: notNull
    },
    getters: {
    },
    mutations: {
        
    },
    actions: {
    },
    modules: {
    }
};

export default Layout