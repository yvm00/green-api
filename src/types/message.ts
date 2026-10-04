export interface Message {
  id: string;
  text: string;
  status: 'incoming' | 'outcoming';
  timestamp: number
}