export const MainNav = [
    {
        icon: 'pe-7s-home',
        label: 'Accueil',
        to: '#/dashboards/basic',
    },
];
export const ComponentsNav = [
    {
        icon: 'pe-7s-server',
        label: 'Docker',
        content: [
            {
                label: 'Containers',
                to: '#/elements/buttons-standard',
            },
            {
                label: 'Images',
                to: '#/elements/dropdowns',

            },
            {
                label: 'Networks',
                to: '#/elements/icons',
            },
            {
                label: 'Volumes',
                to: '#/elements/badges-labels',
            },
        ],
    },
];
export const FormsNav = [
    {
        icon: 'pe-7s-light',
        label: 'Controls',
        to: '#/forms/controls',
    },
    {
        icon: 'pe-7s-eyedropper',
        label: 'Layouts',
        to: '#/forms/layouts',
    },
    {
        icon: 'pe-7s-pendrive',
        label: 'Validation',
        to: '#/forms/validation',
    },
];
export const WidgetsNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'Dashboard Boxes',
        to: '#/widgets/dashboard-boxes',
    },
];
export const ChartsNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'ChartJS',
        to: '#/charts/chartjs',
    },
];