import { requireAll } from './utils';

requireAll((require as any).context('../src', true, /.ts$/));