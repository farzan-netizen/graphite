import 'server-only'

import { EnvVariables } from '@/constants/env-variables'
import winston from 'winston'

// --- 1. Custom Format to Extract Caller Info ---
const callerInfoFormat = winston.format(info => {
  // Create a new Error object to capture the current stack trace
  const error = new Error()

  if (error.stack) {
    // The stack trace is a string of lines.
    // The first line is "Error", the second is the logger's internal call,
    // and the third line typically points to the original call site (the file that called logger.info()).
    const stackLines = error.stack.split('\n')

    // Attempt to find the line that contains the actual caller file path.
    // This line might vary depending on the environment, but often it's the 3rd or 4th line.
    // We look for the first line that matches the pattern "at functionName (filePath:lineNumber:columnNumber)"
    // and exclude lines containing "winston" or "logger" to skip internal calls.
    const callerLine = stackLines.find(
      line =>
        line.includes('(') &&
        !line.includes('winston') &&
        !line.includes('logger'),
    )

    if (callerLine) {
      // Extract the path/line/column from the parenthesis: (path/to/file.js:10:5)
      const match = callerLine.match(/\(([^:]+:\d+:\d+)\)/)

      if (match && match[1]) {
        // match[1] will be the full path, line, and column: e.g., /path/to/file.ts:10:5
        const [filePathAndLine] = match[1].split(':')

        info.filename = filePathAndLine
      }
    }
  }

  return info
})

// --- 2. Logger Configuration ---
export const logger = winston.createLogger({
  level: EnvVariables.LOG_LEVEL,
  format: winston.format.combine(
    // Run the custom format first to inject the filename property
    callerInfoFormat(),

    // Splat is needed if you are logging objects that contain formatting characters
    winston.format.splat(),

    // Timestamp format
    winston.format.timestamp(),

    // JSON format: ensures the new 'filename' property is included in the final log output
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
})
