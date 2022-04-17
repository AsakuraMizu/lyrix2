import type { Provider } from './interface';
import FakeProvider from './fake';
import KugouProvider from './kugou';
import NetEaseCloudProvider from './netease';
import QQProvider from './qq';

const providers: Provider[] = [
  new KugouProvider(),
  new NetEaseCloudProvider(),
  new QQProvider(),
];
if (import.meta.env.DEV) providers.unshift(new FakeProvider());

export default providers;

export * from './interface';
