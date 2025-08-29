export interface SendMessage {
  send(email: string, title: string, content: string): Promise<void>
}
