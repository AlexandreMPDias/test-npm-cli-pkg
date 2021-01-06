declare namespace Repositories {
	type Key<
		K extends keyof import('../assets/git/repositories').IRepoDeclaration = 'keys'
	> = import('../assets/git/repositories').IRepoDeclaration[K];
	type Environments = import('../assets/git/repositories').Environments;

	type Structure = import('../assets/git/repositories').Structure;

	type Data = import('../assets/git/repositories').Environments;
}
