import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from './helper'
import { store } from '@/store/helper'
import { fetchSession } from '@/api'
import { gptConfigStore, homeStore } from '@/store/homeStore'
import { modelList } from '@/api/model'
import { mlog } from '@/api'

interface SessionResponse {
  auth: boolean
  model: 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI'
}

export interface AuthState {
  token: string | undefined
  session: SessionResponse | null
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    token: getToken(),
    session: null,
  }),

  getters: {
    isChatGPTAPI(state): boolean {
      return state.session?.model === 'ChatGPTAPI'
    },
  },

  actions: {
    async getSession() {
      try {
        const { data } = await fetchSession<SessionResponse>()
        this.session = { ...data }
        homeStore.setMyData({session: data });

        // 获取模型列表并设置默认模型
        try {
          const modelResponse = await modelList();
          if (modelResponse && modelResponse.data && modelResponse.data.length > 0) {
            homeStore.setMyData({modelList: modelResponse.data});
            mlog('模型列表获取成功，第一个模型:', modelResponse.data[0].modelName);
            
            // 模型列表加载完成后，重新初始化模型配置
            const { reinitModelConfig } = await import('@/store/homeStore');
            reinitModelConfig();
          }
        } catch (modelError) {
          mlog('获取模型列表失败，使用默认配置:', modelError);
        }

        let str = localStorage.getItem('gptConfigStore');
        if( ! str ) setTimeout( ()=>  gptConfigStore.setInit() , 500); 
        return Promise.resolve(data)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    setToken(token: string) {
      this.token = token
      setToken(token)
    },

    removeToken() {
      this.token = undefined
      removeToken()
    },
  },
})

export function useAuthStoreWithout() {
  return useAuthStore(store)
}