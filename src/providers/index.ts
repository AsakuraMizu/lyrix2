import type { Provider } from './interface';
// import FakeProvider from './fake';
import KugouProvider from './kugou';
import NetEaseCloudProvider from './netease';

const providers: Provider[] = [new KugouProvider(), new NetEaseCloudProvider()];

export default providers;

export * from './interface';
