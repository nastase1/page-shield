import type { ModuleImpl } from '../../types/module';
import { watchNodes } from '../../core/dom-utils';

const SAMPLE_MS = 100; // 10 fps sampling
const FLASH_WINDOW_MS = 1000;

interface Tracker {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lastLuma: number;
  flashes: number[];
  intervalId: ReturnType<typeof setInterval>;
}

const trackers = new Map<HTMLVideoElement, Tracker>();
let intersObs: IntersectionObserver | null = null;
let mutObs: MutationObserver | null = null;
let activeThreshold = 0.15;

function avgLuma(ctx: CanvasRenderingContext2D, w: number, h: number): number {
  try {
    const d = ctx.getImageData(0, 0, w, h).data;
    let sum = 0;
    for (let i = 0; i < d.length; i += 16) { // stride for perf
      sum += 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    }
    return sum / (d.length / 16) / 255;
  } catch { return 0; }
}

function startTracking(video: HTMLVideoElement) {
  if (trackers.has(video) || video.readyState < 2) return;
  const canvas = document.createElement('canvas');
  canvas.width = Math.min(video.videoWidth || 160, 160);
  canvas.height = Math.min(video.videoHeight || 90, 90);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const tracker: Tracker = {
    video, canvas, ctx, lastLuma: 0, flashes: [],
    intervalId: setInterval(() => {
      if (video.paused || video.ended) return;
      try { ctx.drawImage(video, 0, 0, canvas.width, canvas.height); } catch { return; }
      const luma = avgLuma(ctx, canvas.width, canvas.height);
      const delta = Math.abs(luma - tracker.lastLuma);
      tracker.lastLuma = luma;
      if (delta > activeThreshold) {
        const now = Date.now();
        tracker.flashes.push(now);
        tracker.flashes = tracker.flashes.filter(t => now - t < FLASH_WINDOW_MS);
        if (tracker.flashes.length >= 3) {
          video.pause();
          video.setAttribute('data-ps-flash-paused', '1');
          tracker.flashes = [];
        }
      }
    }, SAMPLE_MS),
  };
  trackers.set(video, tracker);
}

function stopTracking(video: HTMLVideoElement) {
  const t = trackers.get(video);
  if (!t) return;
  clearInterval(t.intervalId);
  trackers.delete(video);
}

function trackIfVisible(entries: IntersectionObserverEntry[]) {
  entries.forEach(e => {
    const v = e.target as HTMLVideoElement;
    e.isIntersecting ? startTracking(v) : stopTracking(v);
  });
}

function observeVideo(video: HTMLVideoElement) {
  intersObs?.observe(video);
}

export const flashDetectorModule: ModuleImpl = {
  activate(settings) {
    activeThreshold = ((settings.threshold as number) ?? 15) / 100;
    intersObs = new IntersectionObserver(trackIfVisible, { threshold: 0.1 });
    document.querySelectorAll<HTMLVideoElement>('video').forEach(observeVideo);
    mutObs = watchNodes(el => {
      if (el.tagName === 'VIDEO') observeVideo(el as HTMLVideoElement);
      el.querySelectorAll<HTMLVideoElement>('video').forEach(observeVideo);
    });
  },
  deactivate() {
    mutObs?.disconnect(); mutObs = null;
    intersObs?.disconnect(); intersObs = null;
    trackers.forEach((_, v) => stopTracking(v));
    trackers.clear();
    document.querySelectorAll('[data-ps-flash-paused]').forEach(el => el.removeAttribute('data-ps-flash-paused'));
  },
};
