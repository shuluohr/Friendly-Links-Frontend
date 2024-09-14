import myAxios from "../plugins/myAxios.ts";
import {getCurrentUserState, setCurrentUserState} from "../states/user.ts";

export const getCurrentUser = async () => {
    // const currentUser =  getCurrentUserState()
    // if (currentUser){
    //     return currentUser
    // }
    //缓存中不存在用户数据，则从远程中获取
    const res = await myAxios.get('/user/current')
    if (res.data.code === 20000){
        setCurrentUserState(res.data.data)
        return res.data.data
    }
    return null;
}
