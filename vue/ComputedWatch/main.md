# watch和computed得不同

1. 业务上来讲，computed主要用于视图渲染，将多个变化值整合为一个。watch主要用于监听单个变化得数据，去处理相应得业务逻辑。
2. 原理上来讲，依赖收集发生得点不同。computed依赖收集发生在页面渲染得时候，watch发生在页面收集之前。
3. computed是懒更新，watch是及时更新
4. computed得更新需要渲染属性来帮助更新，watch不需要