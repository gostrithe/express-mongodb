/**
 * 新增/修改cookie的值
 * @param {string} name cookie的名字
 * @param {string|number} value cookie的值
 * @param {string|number} expires cookie的过期时间（string）/存活时间（秒）
 */
function setCookie(name, value, expires) {
    expires =
        typeof expires === "string"
            ? expires
            : new Date(
                  Date.now() - 8 * 3600 * 1000 + expires * 1000
              ).toString();
    document.cookie = `${name}=${value};expires=${expires}`;
}

/**
 * 删除指定的cookie
 * @param {string} name
 */
function deleteCookie(name) {
    document.cookie = `${name}=${null};expires=${new Date(
        Date.now() - 8 * 3600 * 1000 - 1
    ).toString()}`;
}

/**
 * 根据名称查询cookie的值
 * @param {string} name
 * @returns 该cookie的值
 */
function getCookie(name) {
    // c=300; a=100; b=200
    // return getCookies()[name];//性能不佳
    const reg = new RegExp(`${name}=([^;]*);?`);
    const execRet = reg.exec(document.cookie);
    return execRet ? execRet[1] : undefined;
}

/* 
查询所有cookie 
*/
function getCookies() {
    // c=300; a=100; b=200
    const cookiesObj = {};
    const cookiesStr = document.cookie;
    cookiesStr.split("; ").forEach((item) => {
        console.log(item); //a=123
        const kv = item.split("=");
        cookiesObj[kv[0]] = kv[1];
    });
    return cookiesObj;
}
