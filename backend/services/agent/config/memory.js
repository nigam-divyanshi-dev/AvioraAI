//func to get memory and in chat we will send it and later send it to llm
//check in redis whether the memory or data or key exists. if exist return that. if not then use api to fetch then return in redis then further.
//first build key which will be used to store data in redis.

import redis from "../../../shared/redis/redis.js"
import { getMessages } from "../utils/getMessages.js"

export const getMemory = async (conversationId) => {
    const key =`messages-${conversationId}`;
    const cached = await redis.get(key)
    if (cached) {
        return JSON.parse(cached)
    }

    const messages= await getMessages(conversationId)
    await redis.set(key, JSON.stringify(messages), 'EX', 60 * 60 * 24)  // Set expiration time to 24 hours
    
    return messages
}

export const addMessage= async (conversationId, role, content) => {
    const key =`messages-${conversationId}`;
    const rawMessages = await redis.get(key)
    const messages = rawMessages ? JSON.parse(rawMessages) : []
    messages.push({ role, content })
    if (messages.length > 20) {
        messages.shift()  // Remove the oldest message
    }
    await redis.set(key, JSON.stringify(messages) )  
}