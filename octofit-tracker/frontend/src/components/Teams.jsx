import CollectionPage from './CollectionPage.jsx'

function Teams() {
  return (
    <CollectionPage
      title="Teams"
      subtitle="Find your crew and see what you’re building together."
      resource="teams"
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