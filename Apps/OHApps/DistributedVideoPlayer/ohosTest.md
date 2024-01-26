# DistributedVideoPlayer 测试用例归档

## 用例表

| 测试功能         | 预置条件                                     | 输入                                           | 预期输出               | 是否自动 | 测试结果 |
| ---------------- | -------------------------------------------- | ---------------------------------------------- | ---------------------- | -------- | -------- |
| 打开应用         | 设备正常运行                                 |                                                | 成功拉起应用           | 是       | Pass     |
| 获取权限         | 设备正常运行                                 | 点击权限弹窗允许按钮                           | 授权后成功进入首页     | 是       | Pass     |
| 关闭应用         |                                              | 点击左上角返回按钮                             | 成功退出应用           | 是       | Pass     |
| 打开应用         | 设备正常运行                                 |                                                | 成功拉起应用           | 是       | Pass     |
| 单击播放按钮     | 位于首页，控制栏处于显示状态                 | 单击播放按钮                                   | 正常执行               | 是       | Pass     |
| 双击页面         | 位于首页                                     | 双击屏幕                                       | 正常执行               | 是       | Pass     |
| 滑动Slider进度条 | 位于首页，控制栏处于显示状态                 | 滑动Slider进度条                               | 正常执行               | 是       | Pass     |
| 左右滑动屏幕     |                                              | 左右滑动屏幕                                   | 正常执行               | 是       | Pass     |
| 调整倍速         | 位于首页，控制栏处于显示状态，展开倍速选择框 | 点击倍速文本                                   | 正常执行               | 是       | Pass     |
| 切换视频         | 位于首页，控制栏处于显示状态                 | 点击视频列表图标                               | 展开视频列表侧边栏     | 是       | Pass     |
| 截图             | 位于首页，控制栏处于显示状态                 | 点击截图按钮                                   | 成功截图并显示截图窗口 | 是       | Pass     |
| 选择设备弹窗     | 位于首页                                     | 点击流转图标                                   | 弹出选择设备弹窗       | 是       | Pass     |
| 设置流转模式     | 位于首页                                     | 点击设置图标，进入设置页面后选择“多端协同”模式 | 成功进入设置页面并选择 | 是       | Pass     |