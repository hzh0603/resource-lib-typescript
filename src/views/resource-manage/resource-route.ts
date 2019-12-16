export default {
    path: 'resource',
    component: () => import('./index.vue'),
    meta: {
        breadcrumb: {
            label: '资源管理'
        }
    },
    children: [
        {
            path: 'resource-list',
            component: () => import('./resource-list/resource-list.vue'),
            meta: {
                breadcrumb: {
                    label: '资源列表'
                }
            }
        },
        // {
        //     path: 'resource-list/add',
        //     name: 'resource-list/add',
        //     component: () => import('./resource-detail/resource-detail.vue'),
        //     meta: {
        //         breadcrumb:{
        //             label: '新增资源'
        //         }
        //     }
        // },
        //  {
        //     path: 'resource-list/update',
        //     name: 'resource-list/update',
        //     component: () => import('./resource-detail/resource-detail.vue'),
        //     meta: {
        //         breadcrumb:{
        //             label: '修改资源'
        //         }
        //     }
        // }
    ]
};