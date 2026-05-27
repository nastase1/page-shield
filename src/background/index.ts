import { messageBus } from '../core/MessageBus';
import type { PageShieldMessage } from '../core/MessageBus';

const FORWARDABLE: PageShieldMessage['type'][] = [
  'ACTIVATE_MODULE',
  'DEACTIVATE_MODULE',
  'UPDATE_SETTINGS',
  'GET_STATE',
];

messageBus.onMessage((message, _sender, sendResponse) => {
  if (!FORWARDABLE.includes(message.type)) return false;

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tabId = tabs[0]?.id;
    if (!tabId) return;

    chrome.tabs.sendMessage(tabId, message, response => {
      if (chrome.runtime.lastError) {
        // Content script unavailable on this page (chrome://, about:, etc.)
        return;
      }
      if (message.type === 'GET_STATE') sendResponse(response);
    });
  });

  return message.type === 'GET_STATE';
});
