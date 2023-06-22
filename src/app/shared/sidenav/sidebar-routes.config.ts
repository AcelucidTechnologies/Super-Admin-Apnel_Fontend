export const SideNaveMenueRoute = [
  {
    label: 'Dashboard',
    icon: 'pi pi-fw pi-cog',
    routerLink: ['/dashboard']
  },
  {
    label: 'Roles & Permission',
    icon: 'pi pi-user-plus',
    items: [
      {
        label: 'Admin List',
        icon: 'pi pi-list',
        routerLink: ['/roleandpermission/adminlist'],
        routerLinkActiveOptions: { exact: true },
        routerLinkActive: 'active'
      },
      {
        label: 'Permitted Module List',
        icon: 'pi pi-list',
        routerLink: ['/modulepermission/rolelist'],
        routerLinkActiveOptions: { exact: true },
        routerLinkActive: 'active'
      },
    ],
  },
  {
    label: 'Leave',
    icon: 'pi pi-user-plus',
    items: [

      {
        label: 'ProfileList',
        icon: 'pi pi-list',
        routerLink: ['/leaveMgmt/profile-list'],
        routerLinkActiveOptions: { exact: true },
        routerLinkActive: 'active'
      },
      {
        label: 'Team',
        icon: 'pi pi-list',
        routerLink: ['/leaveMgmt/team'],
        routerLinkActiveOptions: { exact: true },
        routerLinkActive: 'active'
      },
      {
        label: 'Calender',
        icon: 'pi pi-list',
        routerLink: ['/leaveMgmt/calender'],
        routerLinkActiveOptions: { exact: true },
        routerLinkActive: 'active'
      },
      {
        label: 'Leave Tracker',
        icon: 'pi pi-list',
        routerLink: ['/leaveMgmt/leave-tracker'],
        routerLinkActiveOptions: { exact: true },
        routerLinkActive: 'active'
      },
      {
        label: 'Leave Approve',
        icon: 'pi pi-list',
        routerLink: ['/leaveMgmt/leave-approve-disapprove'],
        routerLinkActiveOptions: { exact: true },
        routerLinkActive: 'active'
      },
      {
        label: 'Assets',
        icon: 'pi pi-list',
        routerLink: ['/asset/asset-list'],
        routerLinkActiveOptions: { exact: true },
        routerLinkActive: 'active'
      },
    ],
  },
  {
    label: 'CMS',
    icon: 'pi pi-file',
    items: [
      {
        label: 'Landing-page',

        icon: 'pi pi-clone',
        routerLink: ['/cms/cms-landing'],
      },
    {
      label: 'Banner Special',

      icon: 'pi pi-clone',
      routerLink: ['/cms/banner'],
    },
    {
      label: 'Feature Product',

      icon: 'pi pi-list',
      routerLink: ['/cms/feature'],
    },
    {
      label: 'Slider',
      icon: 'pi pi-list',
      routerLink: ['/cms/slider'],
    },
    {
      label: 'Special-Offer',

      icon: 'pi pi-list',
      routerLink: ['/cms/special-offer'],
    },
    {
      label: 'Page setup',

      icon: 'pi pi-list',
      routerLink: ['/cms/page'],
    },
    ]
  },
  {
    label: 'Order',
    icon: 'pi pi-shopping-cart',
    items: [
      {
        label: 'Create Order',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: ['/order/editOrder'],
      },
      {
        label: 'Confirmed Order',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/order/confirmOrder'],
      },
      {
        label: 'Delivered Order',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/order/deliveredOrder'],
      },
      {
        label: 'Return Order',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/order/returnOrder'],
      },
      {
        label: 'Pending Order',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/order/pendingOrder'],
      },
      {
        label: 'Order Status',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/order/order-status'],
      },
      {
        label: 'Shipping Order',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/order/shipment'],
      },

    ],
  },


  {
    label: 'Catalogue',
    icon: 'pi pi-folder',
    items: [
      {
        label: 'Product',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: ['/product/productlist'],
      },
      {
        label: 'Category',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/product/categorylist'],
      },
      {
        label: 'Product-option',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/product/productOptionList'],
      },
    ],
  },

  {
    label: 'Marketing',
    icon: 'pi pi-id-card',
    items: [
      {
        label: 'Coupons',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: ['/marketing/coupanList']
      },
      // {
      //     label: 'Rewards',
      //     items: [
      //         {
      //             label: 'Redemption',
      //             icon: 'pi pi-fw pi-money-bill',
      //             routerLink: ['/marketing/redemption']
      //         }
      //     ]
      // },
      {
        label: 'Live Chat',

        icon: 'pi pi-clone',
        routerLink: ['/marketing/live-chat']
      },
      {
        label: 'Push Notification',

        icon: 'pi pi-clone',
        routerLink: ['/marketing/push-notification']
      },
      {
        label: 'Seo',

        icon: 'pi pi-clone',
        routerLink: ['/marketing/seo']
      },
      {
        label: 'Analytics Tracking',

        icon: 'pi pi-clone',
        routerLink: ['/marketing/analytics-tracking']
      },
    ]
  },


  {
    label: 'User',
    icon: 'pi pi-users',
    items: [
      {
        label: 'User List',
        icon: 'pi pi-list',
        routerLink: ['/user/userlist'],
      },
      // {
      //   label: 'Query List',
      //   icon: 'pi pi-question-circle',
      //   routerLink: ['/user/querycontent'],
      // },
    ],
  },

  {
    label: 'Leads',
    icon: 'pi pi-user',
    items: [
      {
        label: 'Leads List',
        icon: 'pi pi-list',
        routerLink: ['/leads/leadslist'],
      },
    ],
  },
  {
    label: 'Subscription',
    icon: 'pi pi-id-card',
    items: [
      {
        label: 'Subscription Plan',
        icon: 'pi pi pi-list',
        routerLink: ['/subscription/subscription-list']
      },
      {
        label: 'Add Coupon',
        icon: 'pi pi pi-list',
        routerLink: ['/subscription/add-coupan']
      },
      {
        label: 'Add Addons',
        icon: 'pi pi pi-list',
        routerLink: ['/subscription/add-addons']
      },
      {
        label: 'Payment',
        icon: 'pi pi pi-list',
        routerLink: ['/subscription/payment']
      },
    ]
  },



  {
    label: 'Rating & Review',
    icon: 'pi pi-star',
    items: [
      {
        label: 'Rating List',
        icon: 'pi pi-list',
        routerLink: ['/rating/ratinglist'],
      },
      {
        label: 'Product List',
        icon: 'pi pi-list',
        routerLink: ['/review/reviewlist'],
      },
      {
        label: 'Reviewer List',
        icon: 'pi pi-list',
        routerLink: ['/reviewer/reviewerlist'],
      },
      {
        label: 'Setting',
        icon: 'pi pi-star',
        items: [

          {
            label: 'Rating and Review List',
            icon: 'pi pi-list',
            routerLink: ['/usertypesettings/ratingReviewDetails'],
          },

          {
            label: 'Rating Criteria List',
            icon: 'pi pi-list',
            routerLink: ['/ratesettings/ratingcriterialist'],
          },
          {
            label: 'UserType List',
            icon: 'pi pi-list',
            routerLink: ['/usertypesettings/usertypelist'],
          },

        ]
      },



      // },
      // {
      //   label: 'User',
      //   icon: 'pi pi-users',
      //   items: [
      //     {
      //       label: 'User List',
      //       icon: 'pi pi-list',
      //       routerLink: ['/user/userlist']
      //     },
      //     // {
      //     //   label: 'Query List',
      //     //   icon: 'pi pi-question-circle',
      //     //   routerLink: ['/user/querycontent']
      //     // },
      //   ]
      // },
      // {
      //     label: 'Bundle',
      //     items: [
      //         {
      //             label: 'Bundle List',
      //             icon: 'pi pi-list',
      //             routerLink: ['/bundle/bundlelist']
      //         },
      //     ]
      // },
      // {
      //     label: 'Influencers',
      //     items: [
      //         {
      //             label: 'Edit Basic Cost',
      //             icon: 'pi pi-user-edit',
      //             routerLink: ['/influencers/influencerlist']
      //         },
      //         {
      //             label: 'Edit Influencer Cost',
      //             icon: 'pi pi-plus-circle',
      //             routerLink: ['/influencers/influencercost']
      //         },
      //         {
      //             label: 'Add Influencer Details',
      //             icon: 'pi pi-plus',
      //             routerLink: ['/influencers/influencerdetails']
      //         },
      //     ]
      // },

      // {
      //   label: 'Leads',
      //   icon: 'pi pi-user',

      //   items: [
      //     {
      //       label: 'Rating Criteria List',
      //       icon: 'pi pi-list',
      //       routerLink: ['/ratesettings/ratingcriterialist'],
      //     },
      //     {
      //       label: 'UserType List',
      //       icon: 'pi pi-list',
      //       routerLink: ['/usertypesettings/usertypelist'],
      //     },
      //   ],
      // },
    ],
  },

];
