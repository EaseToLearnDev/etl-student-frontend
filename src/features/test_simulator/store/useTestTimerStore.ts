import { create } from "zustand";
import useTestStore from "./useTestStore";

interface TestTimerStore {
  testDurationSec: number;
  remainingSec: number;
  timeSpent: number;
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
  timeSpent: 0,
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
      timeSpent: 0,
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
    const { _testEndMs, isExpired, timeSpent } = get();
    
    // Early return if test is expired or not started
    if (_testEndMs == null || isExpired) return;

    // Calculate remaining time in seconds
    const remaining = Math.max(0, Math.floor((_testEndMs - Date.now()) / 1000));

    // Increase overall time spent in test
    set({timeSpent: timeSpent + 1});

    // If test timer has run out
    if (remaining <= 0) {
      const { _testTimerId, startTestTimer } = get();
      const { testData, currentPointer } = useTestStore.getState();

      // Early return
      if (!testData) return;

      const isNotLastSection =
        currentPointer.sectionPos < testData.sectionSet.length - 1;
      const isPartiallyLock = testData?.sectionLock === "Partially_Lock";

      // If test is section locked then switch to next section and reset timer
      if (isPartiallyLock && isNotLastSection) {
        if (_testTimerId) clearInterval(_testTimerId);

        useTestStore.setState((state) => ({
        currentPointer: {
          ...state.currentPointer,
          sectionPos: state.currentPointer.sectionPos + 1,
        },
      }));
        
        const nextSectionIndex = currentPointer.sectionPos + 1;
        const nextSection = testData.sectionSet[nextSectionIndex];

        if (nextSection && nextSection.sectionTime) {
          set({
            remainingSec: 0,
            isRunning: false,
            isExpired: false,
            _testTimerId: null,
          });
          startTestTimer(nextSection.sectionTime);
        }
      }
      // If test is not section locked then reset timer since test has ended
      else {
        if (_testTimerId) clearInterval(_testTimerId);

        set({
          remainingSec: 0,
          timeSpent: 0,
          isRunning: false,
          isExpired: true,
          _testTimerId: null,
        });
        set({ isTestEndedModalOpen: true });
        return;
      }
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
    const { _testTimerId } = get();
    if (_testTimerId) clearInterval(_testTimerId);
    set({
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
