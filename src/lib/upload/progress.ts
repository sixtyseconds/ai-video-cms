export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export class ProgressTracker {
  private onProgress?: (progress: UploadProgress) => void;

  constructor(onProgress?: (progress: UploadProgress) => void) {
    this.onProgress = onProgress;
  }

  update(loaded: number, total: number) {
    if (this.onProgress) {
      this.onProgress({
        loaded,
        total,
        percentage: Math.round((loaded / total) * 100)
      });
    }
  }
}