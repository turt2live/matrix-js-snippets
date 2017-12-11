declare module "matrix-js-snippets" {
    /**
     * Handler for filtering invites. Returns true if the invite should be accepted.
     */
    interface inviteHandler {
        /**
         * Handler for filtering invites. Returns true if the invite should be accepted.
         * @param {string} roomId The room ID the event is for
         * @param {string} userId The user ID the event is for
         * @param event The event that triggered this handler
         * @return {Promise<boolean> | boolean} Resolves (or returns) true if the invite should be accepted
         */
        (roomId: string, userId: string, event: any): Promise<boolean> | boolean
    }

    /**
     * Configuration options for the log service
     */
    interface LogConfig {
        /**
         * The file path to store logs at.
         * @example "logs/mybot.log"
         */
        file: string

        /**
         * Whether or not to log to the console
         */
        console: boolean

        /**
         * The level to log to the console at, if enabled
         */
        consoleLevel: "error"|"warn"|"info"|"verbose"|"silly"
        
        /**
         * The level to log to the file at
         */
        fileLevel: "error"|"warn"|"info"|"verbose"|"silly"

        /**
         * The log rotate settings
         */
        rotate: {
            /**
             * The maximum size, in bytes, to rotate the log file at
             */
            size: number

            /**
             * The number of logs to keep
             */
            count: number
        }
    }

    /**
     * Exposes an easy replacement for console.log
     */
    export class LogService {
        /**
         * Configures the log service
         * @param {"matrix-js-snippets".LogConfig} config
         */
        static configure(config: LogConfig): void

        /**
         * Logs a message at level INFO
         * @param {string} module The module the message is being logged in
         * @param message The message to log
         */
        static info(module: string, message: any): void

        /**
         * Logs a message at level WARN
         * @param {string} module The module the message is being logged in
         * @param message The message to log
         */
        static warn(module: string, message: any): void

        /**
         * Logs a message at level ERROR
         * @param {string} module The module the message is being logged in
         * @param message The message to log
         */
        static error(module: string, message: any): void

        /**
         * Logs a message at level VERBOSE
         * @param {string} module The module the message is being logged in
         * @param message The message to log
         */
        static verbose(module: string, message: any): void

        /**
         * Logs a message at level SILLY
         * @param {string} module The module the message is being logged in
         * @param message The message to log
         */
        static silly(module: string, message: any): void
    }

    /**
     * Directs a client to auto-accept invites with an optional filter
     * @param client The matrix-js-sdk client to accept invites on
     * @param {"matrix-js-snippets".inviteHandler} [filterFn] An optional callback filter for incoming invites
     */
    export function autoAcceptInvites(client: any, filterFn?: inviteHandler): void
}