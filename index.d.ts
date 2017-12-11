export module "matrix-js-snippets" {
    interface inviteHandler {
        (roomId: string, userId: string, event: any): Promise<boolean> | boolean;
    }

    interface LogConfig {
        file: string;
        console: boolean;
        consoleLevel: string;
        fileLevel: string;
        rotate: {
            size: number;
            count: number;
        };
    }

    export class LogService {
        static configure(config: LogConfig);

        static info(module: string, message: any);

        static warn(module: string, message: any);

        static error(module: string, message: any);

        static verbose(module: string, message: any);

        static silly(module: string, message: any);
    }

    export function autoaccept(client: any, fn?: inviteHandler);
}