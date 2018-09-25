import { requireAll } from './utils';
import './spec';

requireAll((require as any).context('../src', true, /.ts$/));