import { WriteFileOptions, MakeDirectoryOptions } from 'fs';
import * as types from '../types';

export type WriteFileOption = types.WithOptions<WriteFileOptions> & { recursive?: boolean };
export type FindPathOption = { recursive?: boolean };
export type ReadFileOption = types.WithOptions<{ encoding: BufferEncoding; flag?: string } | BufferEncoding>;
export type MkdirOption = types.WithOptions<MakeDirectoryOptions & { recursive: true }>;
export type ExistsOption = types.WithOptions<{}>;
export type FindUpOptions = types.WithOptions<{ cwd: string }>;

export * from '../types';
