import CollectionPage from './CollectionPage.jsx'

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  return (
    <CollectionPage
      title="Athletes"
      subtitle="The people putting in the work."
      resource="users"
      endpoint={apiUrl}
      columns={[
        { key: 'name', label: 'Name', render: (user) => <strong>{[user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || 'Athlete'}</strong> },
        { key: 'username', label: 'Username', render: (user) => user.username || '—' },
        { key: 'team', label: 'Team', render: (user) => user.team?.name || (typeof user.team === 'string' ? user.team : 'Unassigned') },
        { key: 'points', label: 'Points', render: (user) => <strong className="points-value">{user.totalPoints ?? 0}</strong> },
      ]}
    />
  )
}

export default Users