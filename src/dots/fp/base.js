

// EXAMPLE:
/**
 * 命令式、函数式
 */
//User 对象
let joeUser = {
    name: 'joe',
    email: 'joe@example.com',
    prefs: {
        languages: {
            primary: 'sp',
            secondary: 'en'
        }
    }
};

//全局的 indexURLs，映射不同的语言
let indexURLs = {
    'en': 'http://mysite.com/en',  //English
     'sp': 'http://mysite.com/sp', //Spanish
    'jp': 'http://mysite.com/jp'   //Japanese
}

const showIndexPage = (url) => {
  console.log(url);
};

//命令式:
const getUrlForUser = (user) => {
  //todo
  if (user == null) {        // 没有登录进来
    return indexURLs['en'];  // 返回默认页
  }
  if (user.prefs.languages.primary && user.prefs.languages.primary != 'undefined') {
    if (indexURLs[user.prefs.languages.primary]) { //如果翻译存在
      return indexURLs[user.prefs.languages.primary];
    } else {
      return indexURLs['en'];
    }
  }
}
//调用
showIndexPage(getUrlForUser(joeUser));


// 函数式编程版本：
// (起初有点难理解，但是更健壮、无缺陷)
// 用到的函数式编程技术：Functor、Maybe Monad 和柯里化
const R = require('ramda');
const prop = R.prop;
const path = R.path;
const curry = R.curry;
const Maybe = require('ramda-fantasy').Maybe;

const getURLForUser = (user) => {
    // Monad-> 存储了user 并且有map方法。也有chain方法
    // Maybe(user) 可能有user 也有可能user为空
    return Maybe(user) //将 user 封装到一个 Maybe 对象
        // 读取user 的首选语言
        .map(path(['prefs', 'languages', 'primary'])) //使用 Ramda 来获取首选语言
        .chain(maybeGetUrl); // 传递参数 language 给 maybeGetUrl，得到 URL 或者null Monad
}

// 柯里化来将它转换为一个函数参数 即 maybeGetUrl 现在只需要 language 参数
const maybeGetUrl = R.curry(function(allUrls, language) {
    return Maybe(allUrls[language]); // 返回 Monad(url | null)
})(indexURLs); // 传递 indexURLs 而不是全局访问


function boot(user, defaultURL) {
   showIndexPage(getURLForUser(user).getOrElse(defaultURL));
}

boot(joeUser, 'http://site.com/en'); //'http://site.com/sp'
boot(undefined, 'http://site.com/en'); //'http://site.com/en'
