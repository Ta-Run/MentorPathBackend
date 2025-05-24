class Logger {
  info (...params: any[]) {
    console.log(...params); 
  }
    
  error (...params: any[]) {
    console.log('Error Occurred');
    console.error(...params);
  }
}

export const logger = new Logger();
