import { create } from "zustand";

interface TestTimerStore {
  testDurationSec: number;
  remainingSec: number;
  finalRemainingSec: number | null;
  isRunning: boolean;
  isExpired: boolean;
  _testEndMs: number | null;
  _testTimerId: ReturnType<typeof setInterval> | null;
  isTestEndedModalOpen: boolean;

  startTestTimer: (durationSec: number) => void;
  pauseTestTimer: () => void;
  resumeTestTimer: () => void;
  stopTestTimer: () => void;
  _tick: () => void;
  setIsTestEndedModalOpen: (v: boolean) => void;
}

/**
 * Zustand store for managing a countdown timer in a test simulator.
 * Provides actions to start, pause, resume, and stop the timer, and tracks timer state.
 */
const useTestTimerStore = create<TestTimerStore>((set, get) => ({
  testDurationSec: 0,
  remainingSec: 0,
  isRunning: false,
  isExpired: false,
  _testEndMs: null,
  _testTimerId: null,
  finalRemainingSec: null,
  isTestEndedModalOpen: false,

  // Starts a new countdown timer with the specified duration in seconds.
  // Clears any existing timer and sets up a new interval to tick every second.
  startTestTimer: (durationSec) => {
    const { _testTimerId, _tick } = get();

    const now = Date.now();
    const endMs = now + durationSec * 1000;

    // clear old
    if (_testTimerId) clearInterval(_testTimerId);

    set({
      finalRemainingSec: null,
      testDurationSec: durationSec,
      remainingSec: durationSec,
      isRunning: true,
      isExpired: false,
      _testEndMs: endMs,
      _testTimerId: null,
    });

    const interval = setInterval(() => _tick(), 1000);
    set({ _testTimerId: interval });
  },

  // Internal tick function that calculates remaining time and handles timer expiration.
  // Automatically stops the timer when countdown reaches zero.
  _tick: () => {
    const { _testEndMs, isExpired } = get();
    if (_testEndMs == null || isExpired) return;

    const remaining = Math.max(0, Math.floor((_testEndMs - Date.now()) / 1000));

    if (remaining === 0) {
      const { _testTimerId } = get();
      if (_testTimerId) clearInterval(_testTimerId);
      set({
        remainingSec: 0,
        finalRemainingSec: 0,
        isRunning: false,
        isExpired: true,
        _testTimerId: null,
      });
      set({ isTestEndedModalOpen: true });
      return;
    }

    set({ remainingSec: remaining });
  },

  // Pauses the timer and preserves the current remaining time.
  // Can be resumed later using resumeTestTimer.
  pauseTestTimer: () => {
    const { _testTimerId, remainingSec, isRunning } = get();
    if (!isRunning) return;
    if (_testTimerId) clearInterval(_testTimerId);
    set({
      isRunning: false,
      _testTimerId: null,
      _testEndMs: null,
      remainingSec,
    });
  },

  // Resumes a paused timer with the previously saved remaining time.
  // Does nothing if timer is already running or has expired.
  resumeTestTimer: () => {
    const { isExpired, isRunning, remainingSec, startTestTimer } = get();
    if (isExpired || isRunning) return;
    startTestTimer(remainingSec);
  },

  setIsTestEndedModalOpen: (v) => set({ isTestEndedModalOpen: v }),

  // Completely stops the timer and marks it as expired.
  // Resets remaining time to zero and clears the interval.
  stopTestTimer: () => {
    const { _testTimerId, remainingSec } = get();
    if (_testTimerId) clearInterval(_testTimerId);
    set({
      finalRemainingSec: remainingSec,
      isRunning: false,
      isExpired: true,
      _testTimerId: null,
      _testEndMs: null,
      remainingSec: 0,
      isTestEndedModalOpen: false,
    });
  },
}));

export default useTestTimerStore;
