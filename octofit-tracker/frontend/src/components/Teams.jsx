import CollectionPage from './CollectionPage.jsx'

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  return (
    <CollectionPage
      title="Teams"
      subtitle="Find your crew and see what you’re building together."
      resource="teams"
      endpoint={apiUrl}
      columns={[
        { key: 'name', label: 'Team', render: (team) => <strong>{team.name || 'Unnamed team'}</strong> },
        { key: 'description', label: 'About', render: (team) => team.description || '—' },
        { key: 'members', label: 'Members', render: (team) => team.members?.length ?? 0 },
        { key: 'points', label: 'Team points', render: (team) => <strong className="points-value">{team.points ?? 0}</strong> },
      ]}
    />
  )
}

export default Teams