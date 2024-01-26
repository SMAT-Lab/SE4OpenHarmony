/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */
export class GlobalContext {
    private constructor() {
    }
    // public static message_recv_func: (fromId: number, msg: string) => void;
    // public static message_recv_func_group: (fromId: number, msg: string) => void;
    // public static message_recv_func_invitation: (v0: string) => void;
    // public static message_recv_func_MUCParticipantPresence: (nike: string, presenceType: string, affiliationType: string) => void;
    // public static handle_subscription_request_func: (resultStr: string) => void;
    private static instance: GlobalContext;
    private _objects = new Map<string, Object>();
    public static getContext(): GlobalContext {
        if (!GlobalContext.instance) {
            GlobalContext.instance = new GlobalContext();
        }
        return GlobalContext.instance;
    }
    getValue(value: string): Object {
        let result = this._objects.get(value);
        if (!result) {
            throw new Error("this value undefined");
        }
        return result;
    }
    setValue(key: string, objectClass: Object): void {
        this._objects.set(key, objectClass);
    }
}
