// 独自のエラークラスを定義
export class ActivateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ActivateError';
    
    Object.setPrototypeOf(this, ActivateError.prototype);
  }
}