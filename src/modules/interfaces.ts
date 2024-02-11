
export interface Task {
    name: String; // 应用名称
    icon: String; // 应用图标
    class?: String;
    recommend?: boolean; // 是否显示在桌面
    title: String; // 应用标题
    pid: number; // App唯一标识
    type: String; // 应用类型，line为分割线，task为任务
}