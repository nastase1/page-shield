export type PageShieldMessage =
  | { type: 'ACTIVATE_MODULE'; moduleId: string; settings: Record<string, unknown> }
  | { type: 'DEACTIVATE_MODULE'; moduleId: string }
  | { type: 'UPDATE_SETTINGS'; moduleId: string; settings: Record<string, unknown> }
  | { type: 'GET_STATE' }
  | {
      type: 'STATE_RESPONSE';
      activeModules: string[];
      settings: Record<string, Record<string, unknown>>;
    };

type ResponseFor<T extends PageShieldMessage> = T extends { type: 'GET_STATE' }
  ? Extract<PageShieldMessage, { type: 'STATE_RESPONSE' }>
  : undefined;

function send<T extends PageShieldMessage>(message: T): Promise<ResponseFor<T>> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, response => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve(response as ResponseFor<T>);
    });
  });
}

function sendToTab<T extends PageShieldMessage>(
  tabId: number,
  message: T,
): Promise<ResponseFor<T>> {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, response => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve(response as ResponseFor<T>);
    });
  });
}

type MessageHandler = (
  message: PageShieldMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: unknown) => void,
) => boolean | void;

function onMessage(handler: MessageHandler): void {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    return handler(message as PageShieldMessage, sender, sendResponse) ?? false;
  });
}

export const messageBus = { send, sendToTab, onMessage };
