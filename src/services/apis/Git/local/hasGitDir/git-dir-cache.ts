export class GitDirCache {
	private readonly cache: Record<string, boolean>;
	private readonly key: string;

	constructor(ctx: any, gitPath: string, relativeTo: string) {
		if (!ctx.git_dir_cache) {
			ctx.git_dir_cache = {};
		}
		this.cache = ctx.git_dir_cache;
		this.key = gitPath + '||' + relativeTo;
	}

	set = (result: boolean) => {
		this.cache[this.key] = result;
	};

	entryExistsInCache = () => {
		return this.key in this.cache;
	};

	exists = () => {
		return !!this.cache[this.key];
	};
}
