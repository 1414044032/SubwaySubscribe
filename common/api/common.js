// 获取模块内容
import getInstance from "@/common/api/request";

export const requestSendCode = (parms) => { return getInstance('SendVerifyCode').get('', parms) }
export const requestLogin = (parms) => { return getInstance('login').post('', parms)}
export const requestSetting = (parms) => { return getInstance('getSetting').get('', parms)}
export const requestsetSetting = (parms) => { return getInstance('setSetting').post('', parms)}
export const requestdelSetting = (parms) => { return getInstance('delSetting').get('', parms)}
export const requestcheckLogin = (parms) => { return getInstance('checkLogin').get('', parms)}
export const requestcheckPassCode = (parms) => { return getInstance('checkPassCode').get('', parms)}
export const requestcheckUserCount = (parms) => { return getInstance('checkUserCount').get('', parms)}
export const requestGetCode = (parms) => { return getInstance('getCode').get('', parms)}
