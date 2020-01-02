export default {
    path: 'copyright',
    component: () => import(/* webpackChunkName: "about" */ './copyright-manage.vue'),
    meta: {
        breadcrumb: {
            label: '版权管理'
        }
    },
    children: [
        // {
        //     path: 'authorized',
        //     component: () => import('./authorized-unit/authorized-unit.vue'),
        //     meta: {
        //         breadcrumb: {
        //             label: '授权单位列表'
        //         }
        //     },
        // }, {
        //     path: 'authorized-detail/add',
        //     component: () => import('./authorized-unit/authorized-detail/authorized-detail.vue'),
        //     meta: {
        //         breadcrumb: {
        //             label: '新增授权单位'
        //         }
        //     }
        // }, {
        //     path: 'authorized-detail/update',
        //     component: () => import('./authorized-unit/authorized-detail/authorized-detail.vue'),
        //     meta: {
        //         breadcrumb: {
        //             label: '修改授权单位'
        //         }
        //     }
        // }, {
        //     path: 'appear-store',
        //     component: () => import('./appear-store/appear-store.vue'),
        //     meta: {
        //         breadcrumb: {
        //             label: '出库单列表'
        //         }
        //     }
        // },{
        //     path: 'appear-store/add',
        //     component: () => import('./appear-store/appear-store-detail/appear-store-detail.vue'),
        //     meta: {
        //         breadcrumb: {
        //             label: '新增出库单'
        //         }
        //     }
        // },{
        //     path: 'appear-store/update',
        //     component: () => import('./appear-store/appear-store-detail/appear-store-detail.vue'),
        //     meta: {
        //         breadcrumb: {
        //             label: '修改出库单'
        //         }
        //     }
        // },{
        //     path: 'outbound-list',
        //     component: () => import('./outbound-list/outbound-list.vue'),
        //     meta: {
        //         breadcrumb: {
        //             label: '出库作品列表'
        //         }
        //     }
        // },
        // {
        //     path: 'original-list',
        //     component: () => import('./original-copyright/original-copyright-list.vue'),
        //     meta: {
        //         breadcrumb: {
        //             label: '原创版权列表'
        //         }
        //     }
        // },
        // {
        //     path: 'original-detail/add',
        //     component: () => import('./original-copyright/original-detail/original-detail.vue'),
        //     meta: {
        //         breadcrumb: {
        //             label: '新增原创版权'
        //         }
        //     }
        // },
        // {
        //     path: 'original-detail/update',
        //     component: () => import('./original-copyright/original-detail/original-detail.vue'),
        //     meta: {
        //         breadcrumb: {
        //             label: '修改原创版权'
        //         }
        //     }
        // },
        {
            path: 'publish-list',
            component: () => import('./publishing-copyright/publishing-copyright.vue'),
            meta: {
                breadcrumb:{
                    label: '出版版权列表'
                }
            }
        },
        // {
        //     path: 'publish-detail/add',
        //     component: () => import('./publishing-copyright/publishing-copyright-detail/publishing-copyright-detail.vue'),
        //     meta: {
        //         breadcrumb:{
        //             label: '新增出版版权'
        //         }
        //     }
        // },
        // {
        //     path: 'publish-detail/update',
        //     component: () => import('./publishing-copyright/publishing-copyright-detail/publishing-copyright-detail.vue'),
        //     meta: {
        //         breadcrumb:{
        //             label: '修改出版版权'
        //         }
        //     }
        // },
    ]
}
