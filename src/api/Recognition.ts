import { mlog } from "./mjapi";
import { t } from '@/locales';

export interface recType {
	timeOut: number;
	asrLanguage?: string;
	listener?: (result: string) => void;
	onEnd?: () => void;
	onStart?: () => void;
	onError?: (error: string) => void;
}
export class Recognition {
	private recognition: any;
	private listener?: (result: string) => void;
	private isStop = false;
	private recOpt: recType = { timeOut: 2000 };
	private handleTime: any;
	private hTime: Date | undefined;
	private asrLanguage = "cmn-Hans-CN";
	private onEnd?: () => void;
	private onStart?: () => void;
	private onError?: (error: string) => void;
	private hasMicPermission = false;

	public setListener(fn: (result: string) => void) {
		this.listener = fn;
		return this;
	}

	public setOnEnd(fn: () => void) {
		this.onEnd = fn;
		return this;
	}

	public setOnError(fn: (error: string) => void) {
		this.onError = fn;
		return this;
	}

	public setOpt(opt: recType) {
		this.recOpt = opt;
		if (opt.listener) this.setListener(opt.listener);
		if (opt.onEnd) this.setOnEnd(opt.onEnd);
		if (opt.asrLanguage) this.setLang(opt.asrLanguage);
		if (opt.onStart) this.onStart = opt.onStart;
		if (opt.onError) this.setOnError(opt.onError);
		return this;
	}

	public setLang(lang: string) {
		this.asrLanguage = lang;
		return this;
	}

	// 检查麦克风权限
	private async checkMicrophonePermission(): Promise<boolean> {
		try {
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				throw new Error(t('mj.micBrowserNotSupported') || '浏览器不支持麦克风访问');
			}

			// 检查是否已经授予权限
			const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
			if (result.state === 'granted') {
				this.hasMicPermission = true;
				return true;
			} else if (result.state === 'prompt') {
				// 需要请求权限
				try {
					const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
					// 立即关闭流，我们只是检查权限
					stream.getTracks().forEach(track => track.stop());
					this.hasMicPermission = true;
					return true;
				} catch (error) {
					this.hasMicPermission = false;
					throw new Error(t('mj.micPermissionDenied') || '麦克风权限被拒绝');
				}
			} else {
				// 权限被拒绝
				this.hasMicPermission = false;
				throw new Error(t('mj.micPermissionDenied') || '麦克风权限被拒绝');
			}
		} catch (error) {
			this.hasMicPermission = false;
			throw error;
		}
	}

	public async start() {
		this.isStop = false;
		
		// 首先检查麦克风权限
		try {
			await this.checkMicrophonePermission();
		} catch (error) {
			console.error("麦克风权限检查失败:", error);
			this.onError?.(error instanceof Error ? error.message : (t('mj.micPermissionCheckFailed') || "麦克风权限检查失败"));
			return;
		}

		if (
			typeof window === "undefined" ||
			(!window.SpeechRecognition && !window.webkitSpeechRecognition)
		) {
			console.warn("当前浏览器不支持 SpeechRecognition，请使用 Chrome 或 Edge");
			this.onError?.(t('mj.micBrowserNotSupported') || "当前浏览器不支持语音识别，请使用 Chrome 或 Edge 浏览器");
			return;
		}

		if (!this.recognition) {
			const recognition = new (window.SpeechRecognition ||
				window.webkitSpeechRecognition)();
			this.recognition = recognition;
		}
		const recognition = this.recognition;

		recognition.interimResults = true;
		recognition.lang = this.asrLanguage;
		recognition.continuous = true;

		this.hTime = new Date();
		this.handleTime = setInterval(() => this.check(this), this.recOpt.timeOut);

		recognition.addEventListener("result", (event: any) => {
			let transcript = "";
			for (let index = 0; index < event.results.length; index++) {
				const item = event.results[index];
				if (transcript && this.asrLanguage.includes("Han")) transcript += "，";
				transcript += (item as unknown as SpeechRecognitionAlternative[])[0]
					?.transcript;
			}
			if (!transcript) return;
			this.hTime = new Date();
			this.listener?.(transcript);
		});

		recognition.addEventListener("end", () => {
			if (this.isStop) {
				clearInterval(this.handleTime);
				return;
			}
			setTimeout(() => recognition.start(), 1000);
		});

		recognition.addEventListener("error", (event: any) => {
			console.error("语音识别错误:", event.error);
			let errorMsg = t('mj.micPermissionCheckFailed') || "语音识别发生错误";
			switch (event.error) {
				case "not-allowed":
					errorMsg = t('mj.micPermissionDenied') || "麦克风权限被拒绝，请检查浏览器设置";
					break;
				case "no-speech":
					errorMsg = t('mj.micNoSpeechDetected') || "未检测到语音，请确保麦克风正常工作";
					break;
				case "network":
					errorMsg = t('mj.micNetworkError') || "网络错误，请检查网络连接";
					break;
				case "aborted":
					errorMsg = t('mj.micAborted') || "语音识别被中断";
					break;
			}
			this.onError?.(errorMsg);
			this.stop();
		});

		try {
			recognition.start();
			this.onStart?.();
		} catch (error) {
			console.error("启动语音识别失败:", error);
			this.onError?.(t('mj.micPermissionCheckFailed') || "启动语音识别失败，请检查麦克风设置");
		}
		
		return this;
	}

	private check(that: Recognition) {
		if (!that.hTime) return;
		const dt = new Date().getTime() - that.hTime.getTime();
		if (dt > that.recOpt.timeOut) {
			that.stop(); // 只在 stop 中触发 onEnd
		}
	}

	public stop() {
		if (this.isStop) return this; // 如果已经停止，直接返回
		this.isStop = true;
		this.recognition?.stop();
		clearInterval(this.handleTime);
		this.onEnd?.(); // 只在这里触发一次 onEnd
		return this;
	}

	// public stop() {
	//   this.isStop = true;
	//   this.recognition?.stop();
	//   return this;
	// }

	// private check(that: Recognition) {
	//   if (!that.hTime) return;
	//   const dt = new Date().getTime() - that.hTime.getTime();
	//   if (dt > that.recOpt.timeOut) that.stop();
	// }
}

export const supportLanguages: Record<string, string> = {
	"cmn-Hans-CN": "普通话 (中国大陆)",
	"cmn-Hans-HK": "普通话 (香港)",
	"yue-Hant-HK": "粵語 (香港)",
	"en-US": "English(United States)",
	"en-GB": "English(United Kingdom)",
	"en-IN": "English(India)",
	"es-ES": "Español",
	"fr-FR": "Français",
	"de-DE": "Deutsch",
	"it-IT": "Italiano",
	"ja-JP": "日本語",
	"ko-KR": "한국어",
	"ar-SA": "العربية",
	"pt-BR": "Português",
	"ru-RU": "Русский",
	"nl-NL": "Nederlands",
	"tr-TR": "Türkçe",
	"sv-SE": "Svenska",
	"hi-IN": "हिन्दी",
	"el-GR": "Ελληνικά",
	"he-IL": "עברית",
	"id-ID": "Bahasa Indonesia",
	"pl-PL": "Polski",
	"th-TH": "ไทย",
	"cs-CZ": "Čeština",
	"hu-HU": "Magyar",
	"da-DK": "Dansk",
	"fi-FI": "Suomi",
	"no-NO": "Norsk",
	"sk-SK": "Slovenčina",
	"uk-UA": "Українська",
	"vi-VN": "Tiếng Việt",
};

function sleep(time: number) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

//浏览器文字播放
export async function speakText(
	content: string,
	callback: (playing: boolean) => void
) {
	if (!window.speechSynthesis) return;
	if (speechSynthesis.speaking) {
		speechSynthesis.cancel();
		callback(false);
	}

	await sleep(300);

	const msg = new SpeechSynthesisUtterance(content);
	msg.lang = "zh";
	msg.rate = 1;
	msg.addEventListener("end", () => {
		callback(false);
	});
	msg.addEventListener("error", () => {
		callback(false);
	});
	callback(true);
	speechSynthesis.speak(msg);
}