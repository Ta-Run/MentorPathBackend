export class MentorResult {
  status: number;
  message: string;
  data?: any;
  constructor(status: number, message: string, data?: any) {
    this.status = status;
    this.message = message?.charAt(0)?.toUpperCase() + message?.slice(1)?.toLowerCase() || message;
    this.data = data;
  }
}