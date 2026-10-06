/**
 * Web Audio API Engine for "Pengembaraan Lestari: Rahsia Air & Udara"
 * 100% offline, procedural sound effects and dynamic 8-bit/16-bit BGM.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmInterval: number | null = null;
  private currentBgmTheme: string | null = null;
  private masterGain: GainNode | null = null;

  private riverGain: GainNode | null = null;
  private riverNoiseSource: AudioBufferSourceNode | null = null;
  private riverFilter: BiquadFilterNode | null = null;
  private birdInterval: number | null = null;
  private birdGain: GainNode | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Initialize and update continuous dynamic river ambient sound (louder as player approaches river at south)
  public updateRiverAmbient(volume: number) {
    if (this.isMuted) {
      if (this.riverGain && this.ctx) {
        this.riverGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      return;
    }
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      // Start continuous looping realistic water stream buffer if not already running
      if (!this.riverNoiseSource) {
        const bufferSize = this.ctx.sampleRate * 3;
        const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
        const dataL = buffer.getChannelData(0);
        const dataR = buffer.getChannelData(1);
        
        let lastOutL = 0;
        let lastOutR = 0;
        // Pink-brownish smoothed noise for natural water flow & babbling brook
        for (let i = 0; i < bufferSize; i++) {
          const whiteL = Math.random() * 2 - 1;
          const whiteR = Math.random() * 2 - 1;
          lastOutL = (lastOutL * 0.94) + (whiteL * 0.06);
          lastOutR = (lastOutR * 0.94) + (whiteR * 0.06);
          dataL[i] = lastOutL * 3.5;
          dataR[i] = lastOutR * 3.5;
        }

        this.riverNoiseSource = this.ctx.createBufferSource();
        this.riverNoiseSource.buffer = buffer;
        this.riverNoiseSource.loop = true;

        this.riverFilter = this.ctx.createBiquadFilter();
        this.riverFilter.type = 'lowpass';
        this.riverFilter.frequency.setValueAtTime(550, this.ctx.currentTime);
        this.riverFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

        this.riverGain = this.ctx.createGain();
        this.riverGain.gain.setValueAtTime(0, this.ctx.currentTime);

        this.riverNoiseSource.connect(this.riverFilter);
        this.riverFilter.connect(this.riverGain);
        this.riverGain.connect(this.masterGain);

        this.riverNoiseSource.start();
      }

      if (this.riverGain && this.riverFilter) {
        // As player gets closer, volume increases up to 0.55 and higher frequencies open up
        const targetVol = Math.max(0, Math.min(0.55, volume * 0.55));
        this.riverGain.gain.setTargetAtTime(targetVol, this.ctx.currentTime, 0.08);

        const targetFreq = 300 + volume * 550; // Opens up water splash frequencies
        this.riverFilter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Bird chirp procedural sound for garden / plantation (melodic morning warbler)
  public playBirdChirp(volume: number = 0.25) {
    if (this.isMuted || volume <= 0.02) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      // Realistic avian song variation
      const variations = [2600, 2900, 3200, 3500];
      const baseFreq = variations[Math.floor(Math.random() * variations.length)];
      
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 900, this.ctx.currentTime + 0.04);
      osc.frequency.exponentialRampToValueAtTime(baseFreq - 200, this.ctx.currentTime + 0.11);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume * 0.35, this.ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.11);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.11);

      // Follow-up warble
      setTimeout(() => {
        if (this.isMuted || !this.ctx || !this.masterGain) return;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        const f2 = baseFreq + 450;
        osc2.frequency.setValueAtTime(f2, this.ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(f2 + 800, this.ctx.currentTime + 0.04);
        osc2.frequency.exponentialRampToValueAtTime(f2 - 350, this.ctx.currentTime + 0.12);

        gain2.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain2.gain.linearRampToValueAtTime(volume * 0.3, this.ctx.currentTime + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

        osc2.connect(gain2);
        gain2.connect(this.masterGain);
        osc2.start();
        osc2.stop(this.ctx.currentTime + 0.12);
      }, 95);
    } catch {}
  }

  // Stop river ambient when leaving map/unmounting
  public stopAmbient() {
    try {
      if (this.riverNoiseSource) {
        this.riverNoiseSource.stop();
        this.riverNoiseSource.disconnect();
        this.riverNoiseSource = null;
      }
      if (this.riverGain) {
        this.riverGain.disconnect();
        this.riverGain = null;
      }
      if (this.riverFilter) {
        this.riverFilter.disconnect();
        this.riverFilter = null;
      }
    } catch {}
  }

  // Play a simple synthesized tone
  public playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.15, gainVal: number = 0.3) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio error if browser blocks
    }
  }

  // SFX: Player Footstep
  public playFootstep() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110 + Math.random() * 30, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {}
  }

  // SFX: Item Pickup (Trash or Bucket)
  public playPickup() {
    this.playTone(440, 'square', 0.08, 0.25);
    setTimeout(() => this.playTone(660, 'square', 0.12, 0.3), 80);
    setTimeout(() => this.playTone(880, 'square', 0.2, 0.35), 180);
  }

  // SFX: Water scoop / splash
  public playWaterSplash() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const bufferSize = this.ctx.sampleRate * 0.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.3);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      whiteNoise.start();
    } catch {}
  }

  // SFX: Fire extinguish / hiss
  public playFireHiss() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      noise.start();
    } catch {}
  }

  // SFX: Quiz Correct Answer (Bright major triad)
  public playCorrect() {
    this.playTone(523.25, 'triangle', 0.1, 0.3); // C5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.1, 0.3), 90); // E5
    setTimeout(() => this.playTone(783.99, 'triangle', 0.1, 0.3), 180); // G5
    setTimeout(() => this.playTone(1046.50, 'square', 0.3, 0.4), 270); // C6
  }

  // SFX: Quiz Incorrect Answer (Gentle error tone)
  public playWrong() {
    this.playTone(330, 'sawtooth', 0.15, 0.2);
    setTimeout(() => this.playTone(280, 'sawtooth', 0.25, 0.25), 140);
  }

  // SFX: Gentle Breeze / Cloud Whoosh
  public playWhoosh() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const bufferSize = this.ctx.sampleRate * 0.45;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.2);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.45);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.005, this.ctx.currentTime + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      noise.start();
    } catch {}
  }

  // SFX: Level Fanfare / Chapter Intro Chime
  public playLevelFanfare() {
    const notes = [
      { f: 523.25, d: 0.1 },  // C5
      { f: 659.25, d: 0.1 },  // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.5, d: 0.25 }, // C6
      { f: 1318.5, d: 0.35 }, // E6
    ];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n.f, 'triangle', n.d, 0.28), idx * 110);
    });
  }

  // SFX: Victory Fanfare
  public playVictory() {
    const notes = [
      { f: 523.25, d: 0.12 }, // C
      { f: 659.25, d: 0.12 }, // E
      { f: 783.99, d: 0.12 }, // G
      { f: 1046.5, d: 0.25 }, // C
      { f: 880.0, d: 0.12 }, // A
      { f: 1046.5, d: 0.45 }, // C
    ];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n.f, 'triangle', n.d, 0.35), idx * 150);
    });
  }

  // Procedural Dynamic BGM loop
  public playBGM(theme: 'menu' | 'drought' | 'rain' | 'fire' | 'victory') {
    if (this.currentBgmTheme === theme) return;
    this.stopBGM();
    this.currentBgmTheme = theme;
    this.initContext();

    let step = 0;
    let melody: number[] = [];
    let speed = 400; // ms

    if (theme === 'menu') {
      // Cheerful adventure motif: C - G - Am - F
      melody = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 440.00, 349.23];
      speed = 350;
    } else if (theme === 'drought') {
      // Dry, minor, slow sparse motif
      melody = [220.00, 261.63, 293.66, 329.63, 261.63, 220.00, 196.00, 220.00];
      speed = 550;
    } else if (theme === 'rain') {
      // Soothing water cycle flow: Pentatonic major
      melody = [392.00, 440.00, 523.25, 587.33, 659.25, 587.33, 523.25, 440.00];
      speed = 320;
    } else if (theme === 'fire') {
      // Urgent, fast, pulsing minor
      melody = [146.83, 174.61, 220.00, 293.66, 220.00, 174.61, 146.83, 293.66];
      speed = 220;
    } else if (theme === 'victory') {
      melody = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.5];
      speed = 300;
    }

    this.bgmInterval = window.setInterval(() => {
      if (this.isMuted) return;
      const freq = melody[step % melody.length];
      const isAcc = step % 4 === 0;
      this.playTone(
        freq,
        theme === 'fire' ? 'sawtooth' : 'triangle',
        isAcc ? 0.22 : 0.12,
        isAcc ? 0.15 : 0.08
      );
      step++;
    }, speed);
  }

  public stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.currentBgmTheme = null;
  }
}

export const sound = new SoundEngine();
