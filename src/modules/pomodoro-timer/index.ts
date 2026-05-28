import type { ModuleImpl } from '../../types/module';
import { removeById, WIDGET_BASE } from '../../core/dom-utils';

const ID = 'ps-pomodoro';
type Phase = 'work' | 'break';

let intervalId: ReturnType<typeof setInterval> | null = null;
let timeLeft = 0;
let phase: Phase = 'work';
let running = false;
let workSec = 25 * 60;
let breakSec = 5 * 60;

function fmt(s: number) {
  return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
}

function render(w: HTMLElement) {
  const btn = w.querySelector<HTMLButtonElement>('[data-toggle]')!;
  const timeEl = w.querySelector('[data-time]')!;
  const phaseEl = w.querySelector('[data-phase]')!;
  timeEl.textContent = fmt(timeLeft);
  phaseEl.textContent = phase === 'work' ? '🍅 Focus' : '☕ Break';
  btn.textContent = running ? '⏸' : '▶';
  btn.style.background = running ? '#ef4444' : '#22c55e';
}

function tick(w: HTMLElement) {
  if (!running) return;
  timeLeft--;
  if (timeLeft <= 0) {
    phase = phase === 'work' ? 'break' : 'work';
    timeLeft = phase === 'work' ? workSec : breakSec;
    if (Notification.permission === 'granted') {
      new Notification('PageShield Timer', {
        body: phase === 'work' ? '☕ Break over — back to work!' : '🎉 Work session done! Take a break.',
      });
    }
  }
  render(w);
}

export const pomodoroTimerModule: ModuleImpl = {
  activate(settings) {
    removeById(ID);
    workSec = ((settings.workMinutes as number) ?? 25) * 60;
    breakSec = ((settings.breakMinutes as number) ?? 5) * 60;
    timeLeft = workSec;
    phase = 'work';
    running = false;

    const w = document.createElement('div');
    w.id = ID;
    w.style.cssText = `${WIDGET_BASE}bottom:20px;right:20px;padding:10px 14px;min-width:130px;text-align:center;`;
    w.innerHTML = `
      <div style="font-size:10px;color:#94a3b8;margin-bottom:4px" data-phase>🍅 Focus</div>
      <div style="font-size:22px;font-weight:700;letter-spacing:2px;color:#f1f5f9" data-time>${fmt(timeLeft)}</div>
      <div style="display:flex;gap:6px;margin-top:8px;justify-content:center">
        <button data-toggle style="border:none;border-radius:6px;background:#22c55e;color:#fff;padding:4px 10px;cursor:pointer;font-size:14px">▶</button>
        <button data-reset style="border:none;border-radius:6px;background:#475569;color:#fff;padding:4px 10px;cursor:pointer;font-size:12px">↺</button>
      </div>
    `;

    w.querySelector('[data-toggle]')!.addEventListener('click', () => {
      running = !running;
      render(w);
    });
    w.querySelector('[data-reset]')!.addEventListener('click', () => {
      running = false;
      phase = 'work';
      timeLeft = workSec;
      render(w);
    });

    document.body.appendChild(w);
    intervalId = setInterval(() => tick(w), 1000);
  },
  deactivate() {
    if (intervalId) { clearInterval(intervalId); intervalId = null; }
    running = false;
    removeById(ID);
  },
};
