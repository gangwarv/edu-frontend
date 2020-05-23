const Config = () => import("../views/app-setup/config");

export default [
  {
    path: "config",
    name: "config",
    component: Config,
    children: [
        {
          path: "/admission",
          name: "config-admission",
          template: `<h2>Admission</h2>`
        }
    ]
  },
];
