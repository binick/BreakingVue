import { requireAll } from './utils';

requireAll((require as any).context('./unit', true, /spec.ts$/));
