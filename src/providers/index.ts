import type { Provider } from './interface';
import FakeProvider from './fake';
import KugouProvider from './kugou';

const providers: Provider[] = [new FakeProvider(), new KugouProvider()];

export default providers;

export * from './interface';
