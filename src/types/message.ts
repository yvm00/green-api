export interface Message {
  idMessage: string;
  text: string;
  type: 'incoming' | 'outcoming';
  timestamp: number
}