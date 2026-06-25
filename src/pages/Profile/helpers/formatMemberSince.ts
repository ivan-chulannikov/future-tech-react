export const formatMemberSince = (createdAt: string) => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        year: 'numeric',
    }).format(new Date(createdAt));
};