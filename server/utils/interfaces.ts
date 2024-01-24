import { messageI, messageModel } from "../model/messageModel"
 
export const getRoomNameBydata = (senderId: string, receiverId: string): string => {

    if (senderId > receiverId) {
        return senderId + receiverId
    } else {
        return receiverId + senderId

    }
}

export const saveMessage = async (updateMsg: messageI) => {
    try {
        const message = await messageModel.create(updateMsg)
        console.log(message);

        await message.save()
    } catch (error: any) {
        new Error(`unable to send data to db ${error}`)
    }
}