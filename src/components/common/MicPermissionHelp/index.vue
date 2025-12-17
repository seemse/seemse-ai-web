<template>
  <NModal
    v-model:show="showHelp"
    preset="card"
    :title="t('mj.micPermissionHelpTitle') || '麦克风权限帮助'"
    style="width: 90%; max-width: 600px; max-height: 80vh; overflow-y: auto"
    :auto-focus="false"
  >
    <div class="help-content">
      <div class="help-section">
        <h3 class="section-title">
          <SvgIcon icon="ri:microphone-line" class="icon" />
          {{ t('mj.micPermissionWhyTitle') || '为什么需要麦克风权限？' }}
        </h3>
        <p class="section-text">
          {{ t('mj.micPermissionWhyDesc') || '为了使用语音识别功能，我们需要访问您的麦克风来录制音频。您的隐私对我们非常重要，录音仅用于实时识别，不会被存储或分享。' }}
        </p>
      </div>

      <div class="help-section">
        <h3 class="section-title">
          <SvgIcon icon="ri:shield-check-line" class="icon" />
          {{ t('mj.micPermissionHowTitle') || '如何授予麦克风权限？' }}
        </h3>
        
        <div class="permission-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>{{ t('mj.micPermissionStep1Title') || '浏览器提示时点击"允许"' }}</h4>
              <p>{{ t('mj.micPermissionStep1Desc') || '当您首次使用语音功能时，浏览器会弹出权限请求，请点击"允许"。' }}</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>{{ t('mj.micPermissionStep2Title') || '检查浏览器设置' }}</h4>
              <p>{{ t('mj.micPermissionStep2Desc') || '如果错过了权限提示，请手动在浏览器设置中开启麦克风权限。' }}</p>
              <div class="browser-links">
                <NButton
                  text
                  type="primary"
                  size="small"
                  @click="openBrowserHelp('chrome')"
                >
                  Chrome
                </NButton>
                <NButton
                  text
                  type="primary"
                  size="small"
                  @click="openBrowserHelp('firefox')"
                >
                  Firefox
                </NButton>
                <NButton
                  text
                  type="primary"
                  size="small"
                  @click="openBrowserHelp('safari')"
                >
                  Safari
                </NButton>
                <NButton
                  text
                  type="primary"
                  size="small"
                  @click="openBrowserHelp('edge')"
                >
                  Edge
                </NButton>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>{{ t('mj.micPermissionStep3Title') || '系统设置检查' }}</h4>
              <p>{{ t('mj.micPermissionStep3Desc') || '确保操作系统也允许浏览器访问麦克风。' }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="help-section">
        <h3 class="section-title">
          <SvgIcon icon="ri:error-warning-line" class="icon" />
          {{ t('mj.micPermissionTroubleTitle') || '常见问题解决' }}
        </h3>
        
        <div class="troubleshooting">
          <div class="problem-item">
            <h4>{{ t('mj.micPermissionProblem1Title') || '权限被拒绝' }}</h4>
            <p>{{ t('mj.micPermissionProblem1Desc') || '请在浏览器设置中找到此网站，将麦克风权限改为"允许"，然后刷新页面重试。' }}</p>
          </div>

          <div class="problem-item">
            <h4>{{ t('mj.micPermissionProblem2Title') || '找不到麦克风设备' }}</h4>
            <p>{{ t('mj.micPermissionProblem2Desc') || '请确保麦克风已正确连接，并在系统设置中设为默认录音设备。' }}</p>
          </div>

          <div class="problem-item">
            <h4>{{ t('mj.micPermissionProblem3Title') || '浏览器不支持' }}</h4>
            <p>{{ t('mj.micPermissionProblem3Desc') || '请使用最新版本的 Chrome、Firefox、Safari 或 Edge 浏览器。' }}</p>
          </div>

          <div class="problem-item">
            <h4>{{ t('mj.micPermissionProblem4Title') || 'HTTPS 要求' }}</h4>
            <p>{{ t('mj.micPermissionProblem4Desc') || '某些浏览器要求使用 HTTPS 协议才能访问麦克风。请确保您通过安全连接访问此网站。' }}</p>
          </div>
        </div>
      </div>

      <div class="help-section">
        <h3 class="section-title">
          <SvgIcon icon="ri:lightbulb-line" class="icon" />
          {{ t('mj.micPermissionTipsTitle') || '使用小贴士' }}
        </h3>
        <ul class="tips-list">
          <li>{{ t('mj.micPermissionTip1') || '在安静的环境中使用语音功能，以获得最佳识别效果' }}</li>
          <li>{{ t('mj.micPermissionTip2') || '说话时保持适当的距离（约15-30厘米）' }}</li>
          <li>{{ t('mj.micPermissionTip3') || '如果识别效果不佳，请检查麦克风质量或尝试调整输入音量' }}</li>
          <li>{{ t('mj.micPermissionTip4') || '使用耳机麦克风可以减少背景噪音干扰' }}</li>
        </ul>
      </div>

      <div class="help-footer">
        <NButton
          type="primary"
          block
          @click="showHelp = false"
        >
          {{ t('common.confirm') || '我知道了' }}
        </NButton>
      </div>
    </div>
  </NModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NModal, NButton } from 'naive-ui'
import { SvgIcon } from '@/components/common'
import { t } from '@/locales'

interface Props {
  visible: boolean
}

interface Emit {
  (e: 'update:visible', visible: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const showHelp = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

const openBrowserHelp = (browser: string) => {
  const helpUrls = {
    chrome: 'https://support.google.com/chrome/answer/2693767',
    firefox: 'https://support.mozilla.org/zh-CN/kb/how-manage-your-camera-and-microphone-permissions',
    safari: 'https://support.apple.com/zh-cn/guide/safari/ibrw6c6f2d96/mac',
    edge: 'https://support.microsoft.com/zh-cn/microsoft-edge/管理网站权限-in-microsoft-edge-9583f7a4-5084-4734-9f4c-8f9e4a5a4b1e'
  }
  
  const url = helpUrls[browser as keyof typeof helpUrls]
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<style scoped>
.help-content {
  padding: 0 8px;
}

.help-section {
  margin-bottom: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--n-text-color);
}

.section-title .icon {
  margin-right: 8px;
  font-size: 20px;
}

.section-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--n-text-color-disabled);
  margin: 0;
}

.permission-steps {
  margin-top: 16px;
}

.step {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
}

.step-number {
  width: 24px;
  height: 24px;
  background: var(--n-color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  margin-right: 12px;
  flex-shrink: 0;
}

.step-content h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--n-text-color);
}

.step-content p {
  font-size: 13px;
  line-height: 1.5;
  color: var(--n-text-color-disabled);
  margin: 0 0 8px 0;
}

.browser-links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.troubleshooting {
  margin-top: 16px;
}

.problem-item {
  margin-bottom: 16px;
  padding: 12px;
  background: var(--n-color-modal);
  border-radius: 6px;
  border-left: 3px solid var(--n-color-warning);
}

.problem-item h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--n-text-color);
}

.problem-item p {
  font-size: 13px;
  line-height: 1.5;
  color: var(--n-text-color-disabled);
  margin: 0;
}

.tips-list {
  margin: 12px 0 0 0;
  padding-left: 20px;
}

.tips-list li {
  font-size: 13px;
  line-height: 1.6;
  color: var(--n-text-color-disabled);
  margin-bottom: 6px;
}

.help-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--n-border-color);
}

@media (max-width: 640px) {
  .help-content {
    padding: 0 4px;
  }
  
  .browser-links {
    flex-direction: column;
  }
  
  .step {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .step-number {
    margin-bottom: 8px;
  }
}
</style>