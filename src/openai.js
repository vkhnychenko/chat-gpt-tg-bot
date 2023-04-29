import { Configuration, OpenAIApi } from "openai"
import {createReadStream} from 'fs'
import config from 'config'

class OpenAI {
    roles = {
        ASSISTANT: 'assistant',
        USER: 'user',
        SYSTEM: 'system'
    }

    constructor(){
        const configuration = new Configuration({
            apiKey: config.get('OPENAI_API_KEY'),
          });
        this.openai = new OpenAIApi(configuration);
    }

    async chat(messages){
        try{
            const response = await this.openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages,
            })
            console.log(`Message from chatGPT:`, response.data)
            return response.data.choices[0].message
        } catch (e) {
            console.log('Error while gpt chat', e.message)
        }
    }

    async transcription(filePath){
        try{
            const response = await this.openai.createTranscription(
                createReadStream(filePath),
                'whisper-1'
            )
            return response.data.text
        }catch (e){
            console.log('Error while transcription', e.message)
        }
    }
}

export const openai = new OpenAI()