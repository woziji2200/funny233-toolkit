const AppList = [
    {icon: '', title: '转换工具', type: 'line', name: 'line'},
    {icon: 'heart', title: '进制转换', type: 'task', name: 'DecimalConversion', recommend: true},

    {icon: '', title: '其他', type: 'line', name: 'line'},
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