import { makeAutoObservable } from 'mobx';

function generateColor() {
  const hue = Math.floor(Math.random() * 256); // integers 0-255
  const sat = Math.floor(Math.random() * 51) + 50; // integers 50-100
  const lum = 40;

  return `hsl(${hue}, ${sat}%, ${lum}%)`;
}

class PicksStore {
  picks: Record<
    string,
    {
      value: string;
      color: string;
    }
  >;

  constructor() {
    const fromStorage = localStorage.getItem('picksItems');
    this.picks = fromStorage ? JSON.parse(fromStorage) : {};

    makeAutoObservable(this, undefined, {
      autoBind: true,
    });
  }

  addToPicks(pick: string) {
    const newPicks = { ...this.picks };
    newPicks[pick] = {
      value: pick,
      color: generateColor(),
    };
    this.picks = newPicks;
    localStorage.setItem('picksItems', JSON.stringify(this.picks));
  }

  removeFromPicks(pick: string) {
    const newPicks = {
      ...this.picks,
    };
    delete newPicks[pick];

    this.picks = newPicks;
    localStorage.setItem('picksItems', JSON.stringify(this.picks));
  }

  clearAll() {
    this.picks = {};
  }

  get listPicks() {
    return Object.entries(this.picks)?.map(([k, v]) => ({
      key: k,
      value: v.value,
      color: v.color,
    }));
  }
}

export default new PicksStore();
