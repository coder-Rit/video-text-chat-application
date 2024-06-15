import mongoose, { ObjectId } from "mongoose"
import { messageI, messageModel } from "../model/messageModel"
import { UserModel } from "../model/userModel"

export const getRoomNameBydata = (senderId: string, receiverId: string): string => {

    if (senderId > receiverId) {
        return senderId + receiverId
    }


    return receiverId + senderId


}

export const saveMessage = async (updateMsg: messageI) => {
    try {
        let tempMsg = updateMsg
        tempMsg.delivery = "out"
        const message = await messageModel.create(tempMsg)
        console.log("messageSaved");
        
        await message.save()
    } catch (error: any) {
        new Error(`unable to send data to db ${error}`)
    }
}

export const userUpdate = async (id: string, context: any) => {
    try {

        await UserModel.findByIdAndUpdate(id, context)

    } catch (error: any) {
        new Error(`unable to send data to db ${error}`)
    }
}

 

export const updateMessageStatus = async (uuidList:string[],status:string) => {
    try {
        
        await messageModel.updateMany( {uuid:uuidList},{delivery:status})
        console.log("status updated",status);
        
    } catch (error: any) {
        new Error(`unable to send data to db ${error}`)
    }
}