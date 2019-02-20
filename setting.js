/**
 * 配置管理实现文件
 * @version 1.0
 * @author liejiangmai
 * @module setting
 */

//  set 写入配置
//  get 读取配置
//  batch 批量写入配置

let DT_SETTING = {};
let DT_PERMISSION = {};

/**
 * 写入配置
 * @param {*} _key 
 * @param {*} _value 
 *     setting.set(
 *          "component-ui-abc", {
 *              "SHOW_MODULE_OK": true
 *          }
 *     );
 *     // 取设置配置信息
 *     var set = setting.get("component-ui-abc");
 */
export function set(_key,_value) {
    //copy origin data;
   const _ret =  Object.assign(get(_key),_value)
    DT_SETTING[_key] = _ret;
    console.log('set++++++',DT_SETTING)
}

/**
 * 读取配置
 * @param {*} key 
 * 
 */
export function get(_key) {
    console.log('get++++++',DT_SETTING[_key])
    return DT_SETTING[_key] || {};
}

/**
 * 批量写入配置
 * @param {*} _map
 *   批量更新设置
 *      setting.batch({
 *          "component-ui-abc": {
 *              "funcABC": true
 *          },
 *          "component-ui-def": {
 *              "funcDEF": true
 *          }
 *      });
 *     // 取设置配置信息
 *     var set = setting.get("component-ui-abc");
 * 
 */
export function batch(_map) {
    for(let _key in _map) {
        set(_key,_map[_key])
    }
    console.log('+++++batch',DT_SETTING)
}

/**
 * 写入权限 模块的权限，arr是后端返回
 * @param {*} arr 权限
 * @param {*} funcMap 权限功能映射
 * 
 *      单项设置更新，设置项合并
 *      setting.setPermission(
 *          ['has_a_permission', 'has_b_permission'],
 *          {
 *              "has_a_permission": {
 *                  "component-key": {
 *                      "switch-a": true
 *                   }
 *              }
 *          }
 *     );
 * 
 */
export function setPermission(arr,funcMap) {
    arr.forEach((_permission) => {
        const item = funcMap[_permission];
        for(key in item) {
            Object.assign(DT_PERMISSION[key],item[key]);
        }
    })
}

/**
 *  
 *
 * @export 单项设置更新，设置项合并
 * @param {*} options
 * @param   {String} options.key           模块key
 * @param   {String} options.switcher      开关 
 *      setting.isShow(
 *          "key": "component-ui-abc",
 *          "switcher": "SHOW_MODULE_OK"
 *     );
 */
export function isShow(options) {
    // 判断业务线配置开关
    let hasSet = (DT_SETTING[options.key]||{})[options.switcher] !== false;  // 默认不配置就返回显示true
    // 判断是否有用户权限控制开关
    hasSet = hasSet && ((DT_PERMISSION[options.key]||{})[options.switcher] === true)
    return hasSet;
}



