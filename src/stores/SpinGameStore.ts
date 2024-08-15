import { makeAutoObservable } from 'mobx';
import PicksStore from './PicksStore';
import { toast } from 'react-toastify';

function getRandomRotation() {
  return Math.random() * 360;
}

export class SpinGameStore {
  isRunning = false;
  prevRotate = 0;
  style: React.CSSProperties = {};
  looseHistory = [] as string[];
  timeoutId: number | null = null;
  nextTurnTimeout: number | null = null;
  audio: HTMLAudioElement | null = null;

  constructor() {
    makeAutoObservable(this, undefined, {
      autoBind: true,
    });
  }

  addToLooseHistory(pick: string) {
    this.looseHistory.push(pick);
  }

  clearLooseHistory() {
    this.looseHistory = [];
  }

  removeInd(ind: number) {
    const pick = PicksStore.listPicks[ind].key;

    this.addToLooseHistory(pick);
    PicksStore.removeFromPicks(pick);
  }

  afterWin() {
    const items = localStorage.getItem('picksItems');
    const key = PicksStore.listPicks[0].key;

    if (items) {
      const parsed = JSON.parse(items);
      delete parsed[key];
      localStorage.setItem('picksItems', JSON.stringify(parsed));
    }
  }

  nextTurn() {
    if (PicksStore.listPicks.length === 1) {
      this.stopGame();
      this.afterWin();
      alert(PicksStore.listPicks[0].value + ' is winner');
      return;
    }

    const rotationDeg = getRandomRotation();
    const deltaDeg = 360 - rotationDeg;
    const segDeg = 360 / PicksStore.listPicks.length;
    const pickInd = Math.floor(deltaDeg / segDeg);

    this.style = {
      transition: `transform 100s cubic-bezier(0.25, 0.1, 0.25, 1)`,
      transform: `rotate(${rotationDeg + 1440 + this.prevRotate}deg)`,
    };

    this.timeoutId = setTimeout(() => {
      this.style = {
        transition: `transform 0s`,
        transform: `rotate(${rotationDeg + 1440}}deg)`,
      };
      this.prevRotate = rotationDeg + 1440 + this.prevRotate;
      toast(PicksStore.listPicks[pickInd].value);

      this.removeInd(pickInd);

      this.nextTurnTimeout = setTimeout(() => {
        this.nextTurn();
      }, 1500);
    }, 100000);
  }

  async startGame() {
    let sound = await import('../assets/club.mp3');
    this.audio = new Audio(sound.default);
    this.audio.play();
    this.clearLooseHistory();
    this.isRunning = true;

    this.nextTurn();
  }

  stopGame() {
    this.isRunning = false;
    this.style = {};

    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    if (this.nextTurnTimeout) {
      clearTimeout(this.nextTurnTimeout);
    }
  }
}

export default new SpinGameStore();
