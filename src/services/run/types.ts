export type Output<R = never> = void | string | R;

/**
 * A regular syncronous function or a string to be executed in the
 * command-line syncronously.
 *
 * If this value is a string, executes it in the terminal the returns the function's output.
 */
export type FuncOrCmdSync = string | (() => Output);

/**
 * A regular syncronous function or a string to be executed in the
 * command-line syncronously.
 *
 * If this value RETURNS a string, executes it in the terminal the returns the function's output.
 */
export type FuncOrCmdSyncMany = () => Output;

/**
 * A function that returns either a promise, or a string.
 * If it returns a string, executes it in the command line and waits for it to resolve, otherwise, waits
 * for the promise returned by the func to resolve
 */
export type FuncOrCmdAsync<R> = () => Output<Promise<R>>;

export type RetSingle<F extends FuncOrCmdAsync<any>> = null | (F extends () => Output ? ReturnType<F> : never);
