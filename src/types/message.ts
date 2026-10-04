export interface Message {
  id: string;
  text: string;
  type: 'incoming' | 'outcoming';
  timestamp: number
}