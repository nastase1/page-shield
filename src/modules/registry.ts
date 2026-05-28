import type { ModuleManifest, ModuleImpl } from '../types/module';

// ── Vision & Colors ─────────────────────────────────────────────────────────
import { manifest as colorblindManifest }         from './colorblind/manifest';
import { colorblindModule }                        from './colorblind';
import { manifest as highContrastManifest }        from './high-contrast/manifest';
import { highContrastModule }                      from './high-contrast';
import { manifest as smartInvertManifest }         from './smart-invert/manifest';
import { smartInvertModule }                       from './smart-invert';
import { manifest as brightnessSatManifest }       from './brightness-saturation/manifest';
import { brightnessSaturationModule }              from './brightness-saturation';
import { manifest as linkHighlightManifest }       from './link-highlight/manifest';
import { linkHighlightModule }                     from './link-highlight';
import { manifest as textZoomManifest }            from './text-zoom/manifest';
import { textZoomModule }                          from './text-zoom';
import { manifest as customCursorManifest }        from './custom-cursor/manifest';
import { customCursorModule }                      from './custom-cursor';
import { manifest as nightModeManifest }           from './night-mode/manifest';
import { nightModeModule }                         from './night-mode';

// ── Epilepsy & Motion ────────────────────────────────────────────────────────
import { manifest as animationBlockerManifest }    from './animation-blocker/manifest';
import { animationBlockerModule }                  from './animation-blocker';
import { manifest as reducedMotionManifest }       from './reduced-motion/manifest';
import { reducedMotionModule }                     from './reduced-motion';
import { manifest as autoplayBlockerManifest }     from './autoplay-blocker/manifest';
import { autoplayBlockerModule }                   from './autoplay-blocker';
import { manifest as flashDetectorManifest }       from './flash-detector/manifest';
import { flashDetectorModule }                     from './flash-detector';
import { manifest as parallaxBlockerManifest }     from './parallax-blocker/manifest';
import { parallaxBlockerModule }                   from './parallax-blocker';

// ── Dyslexia & Reading ───────────────────────────────────────────────────────
import { manifest as fontSwitcherManifest }        from './font-switcher/manifest';
import { fontSwitcherModule }                      from './font-switcher';
import { manifest as textSpacingManifest }         from './text-spacing/manifest';
import { textSpacingModule }                       from './text-spacing';
import { manifest as readingRulerManifest }        from './reading-ruler/manifest';
import { readingRulerModule }                      from './reading-ruler';
import { manifest as readingMaskManifest }         from './reading-mask/manifest';
import { readingMaskModule }                       from './reading-mask';
import { manifest as lineHighlightManifest }       from './line-highlight/manifest';
import { lineHighlightModule }                     from './line-highlight';
import { manifest as bionicReadingManifest }       from './bionic-reading/manifest';
import { bionicReadingModule }                     from './bionic-reading';

// ── ADHD & Focus ─────────────────────────────────────────────────────────────
import { manifest as focusModeManifest }           from './focus-mode/manifest';
import { focusModeModule }                         from './focus-mode';
import { manifest as distractionBlockerManifest }  from './distraction-blocker/manifest';
import { distractionBlockerModule }                from './distraction-blocker';
import { manifest as pageSimplifierManifest }      from './page-simplifier/manifest';
import { pageSimplifierModule }                    from './page-simplifier';
import { manifest as pomodoroTimerManifest }       from './pomodoro-timer/manifest';
import { pomodoroTimerModule }                     from './pomodoro-timer';

// ── Motor & Navigation ───────────────────────────────────────────────────────
import { manifest as kbdFocusManifest }            from './keyboard-focus-highlight/manifest';
import { keyboardFocusHighlightModule }            from './keyboard-focus-highlight';
import { manifest as largeTargetsManifest }        from './large-click-targets/manifest';
import { largeClickTargetsModule }                 from './large-click-targets';
import { manifest as autoScrollManifest }          from './auto-scroll/manifest';
import { autoScrollModule }                        from './auto-scroll';
import { manifest as stickyKeysManifest }          from './sticky-keys-display/manifest';
import { stickyKeysDisplayModule }                 from './sticky-keys-display';
import { manifest as cursorHighlightManifest }     from './cursor-highlight/manifest';
import { cursorHighlightModule }                   from './cursor-highlight';

// ── Audio & Cognitive ────────────────────────────────────────────────────────
import { manifest as ttsManifest }                 from './text-to-speech/manifest';
import { textToSpeechModule }                      from './text-to-speech';
import { manifest as wordTooltipManifest }         from './word-tooltip/manifest';
import { wordTooltipModule }                       from './word-tooltip';
import { manifest as aiSimplifierManifest }        from './ai-simplifier/manifest';
import { aiSimplifierModule }                      from './ai-simplifier';
import { manifest as pageSummaryManifest }         from './page-summary/manifest';
import { pageSummaryModule }                       from './page-summary';

// ── Utility ──────────────────────────────────────────────────────────────────
import { manifest as syncSettingsManifest }        from './sync-settings/manifest';
import { syncSettingsModule }                      from './sync-settings';
import { manifest as a11yReportManifest }          from './accessibility-report/manifest';
import { accessibilityReportModule }               from './accessibility-report';

// ─── Add a new module here ────────────────────────────────────────────────────
// 1. Create src/modules/<name>/manifest.ts + index.ts
// 2. Import them above and add one { manifest, impl } entry below.
// ─────────────────────────────────────────────────────────────────────────────

export const moduleRegistry: ReadonlyArray<{ manifest: ModuleManifest; impl: ModuleImpl }> = [
  // Vision & Colors
  { manifest: colorblindManifest,        impl: colorblindModule           },
  { manifest: highContrastManifest,      impl: highContrastModule         },
  { manifest: smartInvertManifest,       impl: smartInvertModule          },
  { manifest: brightnessSatManifest,     impl: brightnessSaturationModule },
  { manifest: linkHighlightManifest,     impl: linkHighlightModule        },
  { manifest: textZoomManifest,          impl: textZoomModule             },
  { manifest: customCursorManifest,      impl: customCursorModule         },
  { manifest: nightModeManifest,         impl: nightModeModule            },
  // Epilepsy & Motion
  { manifest: animationBlockerManifest,  impl: animationBlockerModule     },
  { manifest: reducedMotionManifest,     impl: reducedMotionModule        },
  { manifest: autoplayBlockerManifest,   impl: autoplayBlockerModule      },
  { manifest: flashDetectorManifest,     impl: flashDetectorModule        },
  { manifest: parallaxBlockerManifest,   impl: parallaxBlockerModule      },
  // Dyslexia & Reading
  { manifest: fontSwitcherManifest,      impl: fontSwitcherModule         },
  { manifest: textSpacingManifest,       impl: textSpacingModule          },
  { manifest: readingRulerManifest,      impl: readingRulerModule         },
  { manifest: readingMaskManifest,       impl: readingMaskModule          },
  { manifest: lineHighlightManifest,     impl: lineHighlightModule        },
  { manifest: bionicReadingManifest,     impl: bionicReadingModule        },
  // ADHD & Focus
  { manifest: focusModeManifest,         impl: focusModeModule            },
  { manifest: distractionBlockerManifest, impl: distractionBlockerModule  },
  { manifest: pageSimplifierManifest,    impl: pageSimplifierModule       },
  { manifest: pomodoroTimerManifest,     impl: pomodoroTimerModule        },
  // Motor & Navigation
  { manifest: kbdFocusManifest,          impl: keyboardFocusHighlightModule },
  { manifest: largeTargetsManifest,      impl: largeClickTargetsModule    },
  { manifest: autoScrollManifest,        impl: autoScrollModule           },
  { manifest: stickyKeysManifest,        impl: stickyKeysDisplayModule    },
  { manifest: cursorHighlightManifest,   impl: cursorHighlightModule      },
  // Audio & Cognitive
  { manifest: ttsManifest,               impl: textToSpeechModule         },
  { manifest: wordTooltipManifest,       impl: wordTooltipModule          },
  { manifest: aiSimplifierManifest,      impl: aiSimplifierModule         },
  { manifest: pageSummaryManifest,       impl: pageSummaryModule          },
  // Utility
  { manifest: syncSettingsManifest,      impl: syncSettingsModule         },
  { manifest: a11yReportManifest,        impl: accessibilityReportModule  },
];
