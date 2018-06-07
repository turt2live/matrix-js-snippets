import fs from 'fs';
import path from 'path';
import moment from "moment";
import winston from "winston";
import chalk from "chalk";

const TERM_COLORS = {
    error: "red",
    warn: "yellow",
    info: "blue",
    verbose: "white",
    silly: "grey",
};

/**
 * Configuration options for the log service
 */
class LogConfig {
    constructor() {
        this.file = "logs/matrix.log";
        this.console = true;
        this.writeFiles = true;
        this.consoleLevel = "info";
        this.fileLevel = "verbose";
        this.rotate = {
            size: 52428800, // bytes, default is 50mb
            count: 5,
        };
    }
}

let currentConfig = new LogConfig();
let transports = [];
let logger = null;

/**
 * Exposes an easy replacement for console.log
 */
export class LogService {

    /**
     * Configures the log service
     * @param {LogConfig|{file:string, console:boolean, consoleLevel: string, fileLevel: string, rotate:{size:number, count:number}}} logConfig The configuration to use
     */
    static configure(logConfig) {
        if (!logConfig) logConfig = new LogConfig();
        currentConfig = logConfig;

        const dir = path.join(logConfig.file, '..');
        try {
            fs.mkdirSync(dir);
        } catch (ex) {
            // Ignore errors
        }

        if (logConfig.writeFiles) {
            transports.push(new (winston.transports.File)({
                json: false,
                name: "file",
                filename: logConfig.file,
                timestamp: LogService._now,
                formatter: LogService._winstonFormatter,
                level: logConfig.fileLevel,
                maxsize: logConfig.rotate.size,
                maxFiles: logConfig.rotate.count,
                zippedArchive: false,
            }));
        }

        if (logConfig.console || !logConfig.writeFiles) {
            transports.push(new (winston.transports.Console)({
                json: false,
                name: "console",
                timestamp: LogService._now,
                formatter: LogService._winstonColorFormatter,
                level: logConfig.consoleLevel,
            }));
        }

        logger = new winston.Logger({
            transports: transports,
            levels: {
                error: 0,
                warn: 1,
                info: 2,
                verbose: 3,
                silly: 4
            }
        });
    }

    static _winstonColorFormatter(options) {
        options.level = chalk[TERM_COLORS[options.level]](options.level);
        return LogService._winstonFormatter(options);
    }

    static _winstonFormatter(options) {
        return options.timestamp() + ' ' + options.level + ' ' + (options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );
    }

    static _now() {
        return moment().format('MMM-D-YYYY HH:mm:ss.SSS Z');
    }

    static _doLog(level, module, messageOrObject) {
        if (!logger) {
            LogService.configure(new LogConfig());
        }

        if (typeof(messageOrObject) === 'object' && !(messageOrObject instanceof Error))
            messageOrObject = JSON.stringify(messageOrObject);

        if (messageOrObject instanceof Error) {
            const err = messageOrObject;
            messageOrObject = err.message + "\n" + err.stack;
        }

        const message = "[" + module + "] " + messageOrObject;
        logger.log(level, message);
    }

    /**
     * Logs a message at the level INFO
     * @param {string} module The module the message is being logged in
     * @param {*} message A string or object to log. Errors will be expanded.
     */
    static info(module, message) {
        LogService._doLog('info', module, message);
    }

    /**
     * Logs a message at the level WARN
     * @param {string} module The module the message is being logged in
     * @param {*} message A string or object to log. Errors will be expanded.
     */
    static warn(module, message) {
        LogService._doLog('warn', module, message);
    }

    /**
     * Logs a message at the level ERROR
     * @param {string} module The module the message is being logged in
     * @param {*} message A string or object to log. Errors will be expanded.
     */
    static error(module, message) {
        LogService._doLog('error', module, message);
    }

    /**
     * Logs a message at the level VERBOSE
     * @param {string} module The module the message is being logged in
     * @param {*} message A string or object to log. Errors will be expanded.
     */
    static verbose(module, message) {
        LogService._doLog('verbose', module, message);
    }

    /**
     * Logs a message at the level SILLY
     * @param {string} module The module the message is being logged in
     * @param {*} message A string or object to log. Errors will be expanded.
     */
    static silly(module, message) {
        LogService._doLog('silly', module, message);
    }
}

