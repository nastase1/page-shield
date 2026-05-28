import type { ModuleImpl } from '../../types/module';
import { watchNodes } from '../../core/dom-utils';

let mutObs: MutationObserver | null = null;
const videoHandlers = new Map<HTMLVideoElement, () => void>();

function blockVideo(video: HTMLVideoElement) {
  if (videoHandlers.has(video)) return;
  video.autoplay = false;
  video.removeAttribute('autoplay');
  if (!video.paused) video.pause();
  const handler = () => { video.pause(); };
  video.addEventListener('play', handler);
  videoHandlers.set(video, handler);
}

function unblockVideo(video: HTMLVideoElement) {
  const handler = videoHandlers.get(video);
  if (handler) {
    video.removeEventListener('play', handler);
    videoHandlers.delete(video);
  }
}

function processEl(el: Element) {
  if (el.tagName === 'VIDEO') blockVideo(el as HTMLVideoElement);
  el.querySelectorAll<HTMLVideoElement>('video').forEach(blockVideo);
}

export const autoplayBlockerModule: ModuleImpl = {
  activate() {
    document.querySelectorAll<HTMLVideoElement>('video').forEach(blockVideo);
    mutObs = watchNodes(processEl);
  },
  deactivate() {
    mutObs?.disconnect();
    mutObs = null;
    videoHandlers.forEach((_, video) => unblockVideo(video));
    videoHandlers.clear();
  },
};
