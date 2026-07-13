import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import Button from './Button';
const meta = {
    title: 'Shared/Button',
    component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        children: 'Button',
    },
};
export const Accent: Story = {
    args: {
        children: 'Button',
        className: 'button--accent',
    },
};
export const WithIcon: Story = {
    args: {
        children: 'Read more',
        icon: 'arrow-yellow',
    },
};
export const Disabled: Story = {
    args: {
        children: 'Read more',
        disabled: true,
    },
};
export const ExternalLink: Story = {
    args: {
        children: 'Open website',
        href: 'https://example.com',
        target: '_blank',
        rel: 'noreferrer',
    },
};
export const RouterLink: Story = {
    args: {
        children: 'Open profile',
        to: '/profile',
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};
