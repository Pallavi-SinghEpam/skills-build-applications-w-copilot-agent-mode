import CollectionPage from './CollectionPage.jsx'

function displayName(user) {
  if (!user) return 'Unknown athlete'
  if (typeof user === 'string') return user
  return [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || user._id || 'Unknown athlete'
}

function Leaderboard() {
  return (
    <CollectionPage
      title="Leaderboard"
      subtitle="A little friendly competition goes a long way."
      resource="leaderboard"
      columns={[
        { key: 'rank', label: 'Rank', render: (entry, index) => <span className="rank-value">{entry.rank ?? index + 1}</span> },
        { key: 'athlete', label: 'Athlete', render: (entry) => displayName(entry.user) },
        { key: 'team', label: 'Team', render: (entry) => entry.team?.name || (typeof entry.team === 'string' ? entry.team : 'Independent') },
        { key: 'points', label: 'Points', render: (entry) => <strong className="points-value">{entry.points ?? 0}</strong> },
      ]}
    />
  )
}

export default Leaderboard