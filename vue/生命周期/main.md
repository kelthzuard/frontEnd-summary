# 生命周期

![image](./img.png)

## beforeCreate

在此生命周期之前执行vue实例初始化和生命周期初始化，从而拥有生命周期。
在此钩子函数中无法访问实例数据，方法等。

## created

在此生命周期之前会初始化data和props，并且进行对象劫持。
在此阶段可以访问数据，更该数据。但不会触发update，也无法访问到dom。

## beforeMount

在此生命周期之前会调用complie函数将template转换成render函数。即虚拟dom代码，但此时还没有挂载。

- el挂载元素：指实例挂载的地方，el会替代掉指定的元素，所以不要挂载在html或者body上。
根元素的el一开始遍指定，组件的el指定为父元素。如果el未指定，则等待vm.render(el)才开始执行
- 渲染元素template或者render函数，指定要渲染的元素。如果两者都不存在，会将el所处的html作为template进行渲染。

## mounted

在此声明周期之前会将虚拟DOM进行挂载
所谓挂载的意思就是将虚拟的DOM插入到el中形成实际DOM。
在这一钩子函数中DOM已经生成，可以更改数据，更新视图，访问DOM元素等。

## beforeUpdate

此时可以获取到最新的数据，但不会更新数据和视图

## updated

此生命周期之前会执行数据更新和视图更新，在此钩子函数时DOM已经完成更新。

## beforeDestroy

## destroyed

## 子组件得生命周期

子组件得创建发生在beforemount 到 mounted之间，也就是
父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted ->父mounted  
父beforeupdate -> 子beforeupdate -> 子updated -> 父updated
