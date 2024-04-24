import axios from "axios";
import {ElMessage} from "element-plus";
import {userInfo} from "@/net/user/index.js";
import {useUserStore} from "@/store/index.js";

const authItemName = "access_token";

const defaultFailure = (message, code, url) => {
  console.warn(`Request to ${url} failed with code ${code} and message ${message}`);
  ElMessage.warning(message);
}

const defaultError = (err) => {
    console.error(err);
    ElMessage.warning("系统出现错误，请联系管理员");
}

// 设定请求头
function accessHeader() {
    const token = getAccessToken();
    return token ? {
        'Authorization': `Bearer ${getAccessToken()}`
    } : {}
}

// 保存Token
function storeAccessToken(token, remember, expire) {
    const authObj = {token: token, expire: expire};
    // 存储前先移除原有token
    removeAccessToken();
    if(remember){
        localStorage.setItem(authItemName, JSON.stringify(authObj));
    }else {
        sessionStorage.setItem(authItemName, JSON.stringify(authObj));
    }
}

// 获取Token
function getAccessToken() {
    const str = localStorage.getItem(authItemName) || sessionStorage.getItem(authItemName);
    if(str){
        const authObj = JSON.parse(str);
        if(authObj.expire <= Date.now()) {
            removeAccessToken()
            ElMessage.warning("登录已过期，请重新登录");
            useUserStore().clearUserInfo()
            return null;
        }
        return authObj.token;
    }else {
        useUserStore().clearUserInfo()
        return null;
    }
}

// 删除Token
function removeAccessToken() {
    localStorage.removeItem(authItemName);
    sessionStorage.removeItem(authItemName);
}

// 判断是否验证
function isAuth() {
    return !getAccessToken();
}

function internalPost(url, data, header, success, failure = defaultFailure, error = defaultError) {
  axios.post(url, data, {
      headers: header
  }).then(( {data} ) => {
    if (data.code === 200){
        success(data.data);
    }else {
        failure(data.message, data.code, url);
    }
  }).catch((err) => error(err));
}

function internalGet(url, header, success, failure = defaultFailure, error = defaultError) {
    axios.get(url, {
        headers: header
    }).then(({data}) => {
        if(data.code === 200){
            success(data.data);
        }else{
            failure(data.message, data.code, url);
        }
    }).catch(err => error(err));
}

function internalPut(url, data, header, success, failure = defaultFailure, error = defaultError) {
    axios.put(url, data, {
        headers: header
    }).then(( {data} ) => {
        if (data.code === 200){
            success(data.data);
        }else {
            failure(data.message, data.code, url);
        }
    }).catch((err) => error(err));
}

function internalDelete(url, header, success, failure = defaultFailure, error = defaultError) {
    axios.delete(url, {
        headers: header
    }).then(( {data} ) => {
        if (data.code === 200){
            success(data.data);
        }else {
            failure(data.message, data.code, url);
        }
    }).catch((err) => error(err));
}

// put请求
function put(url, data, success, failure = defaultFailure){
    internalPut(url, data, accessHeader(), success, failure);
}

// delete请求
function deleteRequest(url, success, failure = defaultFailure){
    internalDelete(url, accessHeader(), success, failure);
}

// get请求
function get(url, success, failure = defaultFailure){
    internalGet(url, accessHeader(), success, failure);
}

// post请求
function post(url, data, success, failure = defaultFailure){
    internalPost(url, data, accessHeader(), success, failure);
}

/**
 * 登录请求
 * 由于使用Spring Security，登录请求需要特殊处理，添加特定的请求头
 */
function login(form, success, failure = defaultFailure){
    internalPost("/api/auth/login", {
        username: form.username,
        password: form.password,
        remember: form.remember
    }, {
        "Content-Type": "application/x-www-form-urlencoded"
    },(data) => {
        storeAccessToken(data.token, form.remember, data.expire);
        // 获取用户信息并存储
        userInfo();
        success(data);
    }, failure);
}

/**
 * 注销请求
 * @param success 成功回调
 * @param failure 失败回调
 */
function logout(success, failure = defaultFailure){
    get("/api/auth/logout",() => {
        ElMessage.success("退出登录成功");
        removeAccessToken();
        success()
    }, failure);
}

export { logout, login, post, get, isAuth, put, deleteRequest, getAccessToken }