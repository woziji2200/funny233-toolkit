const AppList = [
    {icon: '', title: '转换工具', type: 'line', name: 'line'},
    {icon: 'code', title: 'Base系列', type: 'task', name: 'Base', recommend: true},

    {icon: '', title: '其他', type: 'line', name: 'line'},
    {icon: 'terminal', title: 'Bash', type: 'task', name: 'Bash', recommend: true},
    {icon: 'id-card', title: '自我介绍', type: 'task', name: 'Profile', recommend: true}
]

export function getAppList() {
    return AppList.map(i => {
        return {
            ...i,
            pid: -1
        }
    })
}
export function getComponents(){
    let components:any = {}
    AppList.forEach(i => {
        if (i.type === 'task') {
            components[i.name] = () => import(`./${i.name}.vue`)
        }
    })
    return components
}