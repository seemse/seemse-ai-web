<script lang="ts" setup>
import { localGet, mlog } from '@/api';
import { ref, onMounted } from 'vue'
import {NImage} from 'naive-ui'
import { SvgIcon } from '@/components/common';


const pp = defineProps<{image:string}>();
const images =ref<string[]>([]);
const isLoading = ref(true);
const error = ref('');

const load= async ()=>{
    if (!pp.image) {
        isLoading.value = false;
        return;
    }
    
    try {
        isLoading.value = true;
        error.value = '';
        const r = await localGet(pp.image);
        if (r) {
            try {
                const parsedImages = JSON.parse(r);
                if (Array.isArray(parsedImages)) {
                    images.value = parsedImages.filter(img => img && img.trim() !== '');
                } else {
                    mlog('MjTextAttr: 解析的图片数据不是数组', r);
                }
            } catch (parseError) {
                mlog('MjTextAttr: JSON解析失败', parseError);
                error.value = '图片数据格式错误';
            }
        } else {
            mlog('MjTextAttr: 未找到图片数据', pp.image);
        }
    } catch (e) {
        mlog('MjTextAttr: 加载图片失败', e);
        error.value = '加载图片失败';
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    load();
});
</script>
<template>
<div class="flex flex-wrap justify-start items-baseline">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex items-center justify-center p-2 text-neutral-500">
        <SvgIcon icon="mdi:loading" class="animate-spin mr-2" />
        {{ $t('mjchat.loading') }}
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="error" class="flex items-center justify-center p-2 text-red-500">
        <SvgIcon icon="mdi:alert-circle" class="mr-2" />
        {{ error }}
    </div>
    
    <!-- 图片显示 -->
    <div v-else-if="images.length > 0" class="flex flex-wrap justify-start items-baseline">
        <div v-for="(img,k ) of  images" :key="k" class="p-1" >
            <NImage :src="img" preview class="rounded" :class="[images.length<=1?'w-[330px]':'w-[130px]']" >
                <template #placeholder>
                    <div class="w-full h-full flex items-center justify-center bg-gray-100 rounded">
                        <SvgIcon icon="mdi:image-outline" class="text-gray-400 text-2xl" />
                    </div>
                </template>
                <template #error>
                    <div class="w-full h-full flex items-center justify-center bg-red-50 rounded text-red-500">
                        <SvgIcon icon="mdi:image-broken" class="mr-1" />
                        {{ $t('mjchat.loadFail') || '加载失败' }}
                    </div>
                </template>
            </NImage>
        </div>
    </div>
</div>
</template>