import {UserType} from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
    id: number;
    name: string;
    description?: string;
    expireTime?: Date;
    maxNum: number;
    password?: string;
    status: number;
    userId?: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoinTeamNum: number;
    hasJoinTeam: boolean;
}
